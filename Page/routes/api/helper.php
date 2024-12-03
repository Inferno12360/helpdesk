<?php

$default = array(
  "error" => [
    "unimplemented_verb" => [
      "status" => "error",
      "msg" => "Used Verb that is not implemented",
      "data" => "",
      "code" => 400,
    ],
    "unimplemented_endpoint" => [
      "status" => "error",
      "msg" => "This Endpoint is not implemented",
      "data" => "",
      "code" => 400,
    ],
    "bad_param" => [
      "status" => "error",
      "msg" => "A param has caused an Error",
      "data" => "",
      "code" => 400,
    ],
    "bad_param_type" => [
      "status" => "error",
      "msg" => "A param has caused an Error",
      "data" => "",
      "code" => 400,
    ],
    "bad_casting_type" => [
      "status" => "error",
      "msg" => "An Error occured with the Endpoints set casting types",
      "data" => "",
      "code" => 500,
    ],
    "dberror" => [
      "status" => "error",
      "msg" => "An Error occured with the Database",
      "data" => "",
      "code" => 500,
    ],
    "default" => [
      "status" => "error",
      "msg" => "An unexpected error occured",
      "data" => "",
      "code" => 500,
    ],
    "file_not_found" => [
      "status" => "error",
      "msg" => "The HTML File hasn't been found",
      "data" => "",
      "code" => 500,
    ]
  ],
  "success" => [
    "default" => [
      "status" => "success",
      "msg" => "The Request was successful",
      "data" => [],
      "code" => 200
    ],
    "Created" => [
      "status" => "success",
      "msg" => "The Resource was successfully created",
      "data" => [],
      "code" => 201,
    ]
  ]
);

function errorHandler($errno, $errstr, $errfile, $errline)
{
  $errorResponse = [
    'status' => 'error',
    'msg' => $errstr,
    'data' => 'Error on line ' + $errline,
    'code' => $errno
  ];

  if ($errno === E_NOTICE || $errno === E_WARNING) {
    http_response_code(400);
  } else {
    http_response_code(500);
  }

  header('Content-Type: application/json');
  echo json_encode($errorResponse);
  exit;
}


function exceptionHandler($exception)
{
  $errorResponse = [
    'status' => 'exception',
    'msg' => $exception->getMessage(),
    'data' => '',
    'code' => $exception->getCode() ?: 500
  ];

  //error_log($exception->getMessage());

  http_response_code($errorResponse['code']);
  header('Content-Type: application/json');
  echo json_encode($errorResponse);
  exit;
}


function shutdownHandler()
{
  $error = error_get_last();

  if ($error) {
    $errorResponse = [
      'status' => 'shutdown',
      'msg' => 'Fatal error: ' . $error['message'],
      'data' => '',
      'code' => 500
    ];

    // Log the fatal error if needed (optional)
    // error_log($error['message']);

    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode($errorResponse);
    exit;
  }
}

set_error_handler('errorHandler');
set_exception_handler('exceptionHandler');
register_shutdown_function('shutdownHandler');

function throwError(string $errorType, string $message = "", string $data = "")
{
  global $default;
  if (!isset($default['error'][$errorType])) {
    throw new Exception('Unknown error type: ' . $errorType, 500);
  }
  $error = $default['error'][$errorType];
  if (!empty($message))
    $error['msg'] = $message;
  if (!empty($data))
    $error['data'] = $data;
  http_response_code($error['code']);
  throw new Exception(json_encode($error), $error['code']);
}

function sendSuccesful(string $successType, string $message = '', $data = '')
{
  global $default;
  if (!isset($default['success'][$successType])) {
    throw new Exception('Unknown success type: ' . $successType, 500);
  }
  if (is_array($data) && count($data) == 1) {
    $data = $data[0];
  }

  $success = $default['success'][$successType];
  if (!empty($message))
    $success['message'] = $message;
  if (!empty($data))
    $success['data'] = $data;
  http_response_code($success['code']);
  header('Content-Type: application/json');

  return json_encode($success);
}

function castValue($value, $type)
{
  switch ($type) {
    case 'integer':
      return (int) $value;
    case 'float':
      return (float) $value;
    case 'string':
      return (string) $value;
    case 'boolean':
      return (bool) $value;
    case 'double':
      return (float) $value;
    case 'object':
    case 'array':
      return $value;
    default:
      throw new Exception("Unsupported type '{$type}'");
  }
}
