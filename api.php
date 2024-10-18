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

function getAction(string $call): string
{
  return match (true) {
    str_contains($call, 'get') => 'get',
    str_contains($call, 'set') => 'set',
    str_contains($call, 'option') => 'option',
    default => 'unknown',
  };
}

$call = strtolower($_REQUEST['method']);
$action = getAction($call);
if ($action == "unknown") {
  $error = $default['error']['unimplemented_verb'];
  header('Content-Type: application/json');
  errorCaller($error);
  return;
}
$call = str_replace($action, "", $call);

$changed = false;
$path = __DIR__ . "/$action";
$tables = scandir($path);
foreach ($tables as $table) {
  if (str_contains($call, $table)) {
    $changed = true;
    $path .= "/$table";
    $call = str_replace($table, "", $call);
  }
}
if (!$changed) {
  $error = $default['error']['unimplemented_endpoint'];
  header('Content-Type: application/json');
  errorCaller($error);
  return;
}

$changed = false;
$endpoints = scandir($path);
foreach ($endpoints as $endpoint) {
  if (str_replace(".php", "", $endpoint) == $call) {
    $path .= "/$endpoint";
    $changed = true;
  }
}
if (!$changed) {
  $error = $default['error']['unimplemented_endpoint'];
  header('Content-Type: application/json');
  errorCaller($error);
  return;
}

$response = include $path;
outputCaller($response);

