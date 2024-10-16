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

include "helper.php";

error_reporting(E_ALL);
ini_set('display_errors', 1);

$reqMethod = $_SERVER['REQUEST_METHOD'];

if ($reqMethod != 'POST') {
  $error = $default["error"]["custom"];
  $error['data'] = "Request Method $reqMethod is not supported";
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
  $path = "$dir/$method/api.php";
  $response = include $path;
  outputCaller($response);
} else if (str_contains($method, 'set')) {

} else {
  $error = $default['error']['unimplemented_verb'];
  header('Content-Type: application/json');
  errorCaller($error);
  return;
}


