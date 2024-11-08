<?php
include "helper.php";

error_reporting(E_ALL);
ini_set('display_errors', 1);

$reqMethod = $_SERVER['REQUEST_METHOD'];

/*if ($reqMethod != 'POST') {
  $error = $default["error"]["custom"];
  $error['data'] = "Request Method $reqMethod is not supported";
  errorCaller($error);
  return;
}*/

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

// Step 1: Try to match exact table names or starting matches
foreach ($tables as $table) {
  if (str_starts_with($call, $table)) {  // Match table if $call starts with $table
    $changed = true;
    $path .= "/$table";
    $call = substr($call, strlen($table));  // Remove the matched part from $call
    break;
  }
}

if (!$changed) {
  $error = $default['error']['unimplemented_endpoint'];
  header('Content-Type: application/json');
  errorCaller($error);
  return;
}

// Step 2: Match the endpoint by remaining $call
$changed = false;
$endpoints = scandir($path);
foreach ($endpoints as $endpoint) {
  $endpointName = str_replace(".php", "", $endpoint);
  if ($endpointName === $call) {  // Exact match for remaining $call
    $path .= "/$endpoint";
    $changed = true;
    break;
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

