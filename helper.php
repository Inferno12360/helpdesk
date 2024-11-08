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