<?php
$default = array(
  "error" => [
    "unimplemented_verb" => [
      "status" => "error",
      "data" => "Used Verb that is not implemented"
    ],
    "unimplemented_endpoint" => [
      "status" => "error",
      "data" => "This Endpoint is not implemented"
    ],
    "custom" => [
      "status" => "error",
      "data" => ""
    ],
  ],
);

function errorCaller($field)
{
  header('Content-Type: application/json');
  echo json_encode($field);
}

function outputCaller($jsonData)
{
  header('Content-Type: application/json');
  echo $jsonData;
}

$reqMethod = $_SERVER['REQUEST_METHOD'];

if ($reqMethod != 'POST') {
  $error = $default["error"]["custom"];
  $error['data'] = "$reqMethod is not supported";
  errorCaller($error);
  return;
}

if (!isset($_REQUEST['method'])) {
  $error = $default["error"]["custom"];
  $error['data'] = "Field method is not set";
  header('Content-Type: application/json');
  errorCaller($error);
  return;
}

$method = strtolower($_REQUEST['method']);
if (str_contains($method, 'get')) {
  $method = substr($method, 3);
  $dir = getcwd() . "/get";
  $methods = scandir($dir);
  if (!in_array($method, haystack: $methods)) {
    $error = $default['error']['unimplemented_endpoint'];
    header('Content-Type: application/json');
    errorCaller($error);
    return;
  }
  ob_start();
  include "$dir/$method/api.php";
  $response = ob_get_clean() || "Nothing";
  echo $response;
  outputCaller($response);

} else if (str_contains($method, 'post')) {

} else {
  $error = $default['error']['unimplemented_verb'];
  header('Content-Type: application/json');
  errorCaller($error);
  return;
}


