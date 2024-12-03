<?php
session_start();
session_unset();
session_destroy();

if (isset($_COOKIE['sessionid'])) {
  setcookie('sessionid', '', -1, "/");
}


header("Location: ../index.html");
exit;
?>