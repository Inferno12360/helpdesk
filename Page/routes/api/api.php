<?php
include "helper.php";

try {
  $reqMethod = $_SERVER['REQUEST_METHOD'];

  if (!isset($_REQUEST['method'])) {
    throwError('default', 'Field method is not set');
  }

  function getAction(string $call): string
  {
    if (function_exists('str_contains')) {
      return match (true) {
        str_contains($call, 'option') => 'option',
        str_contains($call, 'get') => 'get',
        str_contains($call, 'set') => 'set',
        str_contains($call, 'delete') => 'delete',
        str_contains($call, 'update') => 'update',
        default => 'unknown',
      };
    } else {
      return strpos($call, 'get') !== false ? 'get' :
        (strpos($call, 'set') !== false ? 'set' :
          (strpos($call, 'delete') !== false ? 'delete' :
            (strpos($call, 'update') !== false ? 'update' :
              (strpos($call, 'option') !== false ? 'option' : 'unknown'))));
    }
  }

  $call = strtolower($_REQUEST['method']);
  $action = getAction($call);

  if ($action == "unknown") {
    throwError('unimplemented_verb', 'The Endpoint verb used is not implemented');
  }

  $call = str_replace($action, "", $call);
  $call = basename($call);


  $changed = false;
  $path = __DIR__ . "/$action";

  if ($action == "option") {
    
    $action = getAction($call);
  
    if ($action == "unknown") {
      throwError('unimplemented_verb', 'The Endpoint verb used is not implemented');
    }
  
    $call = str_replace($action, "", $call);
    $call = basename($call);
    $path .= "/$action";
  }

  $tables = array_diff(scandir($path), array('.', '..'));

  foreach ($tables as $table) {
    if (str_starts_with($call, $table)) {
      $changed = true;
      $path .= "/$table";
      $call = substr($call, strlen($table));
      break;
    }
  }

  if (!$changed) {
    throwError('unimplemented_endpoint', 'The endpoint could not be found');
  }

  $changed = false;
  $endpoints = array_diff(scandir($path), array('.', '..'));

  foreach ($endpoints as $endpoint) {

    $endpointName = str_replace(".php", "", $endpoint);
    $endpointName = str_replace(".html", "", $endpointName);
    if ($endpointName === $call) {
      $path .= "/$endpoint";
      $changed = true;
      break;
    }
  }

  if (!$changed) {
    throwError('unimplemented_endpoint', 'The endpoint could not be found');
  }


  $response = require $path;
  if(!str_contains($path, ".html")) {
    echo $response;
  }
  $conn = null;
  exit;
} catch (Exception $e) {
  $errorResponse = json_decode($e->getMessage(), true);

  if (json_last_error() === JSON_ERROR_NONE) {
    $response = $errorResponse;
  } else {
    $response = [
      'status' => 'error',
      'msg' => 'An unexpected error occurred',
      'data' => '' . $e[0]->line,
      'code' => 500
    ];
  }

  http_response_code($e->getCode() ?: 500);
  header('Content-Type: application/json');
  echo json_encode($response);
  exit;
}
