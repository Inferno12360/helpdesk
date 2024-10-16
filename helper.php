<?php
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