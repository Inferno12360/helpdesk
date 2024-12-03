<?php
include_once __DIR__ . '/../../conn.php';
include_once __DIR__ . '/../../helper.php';

$params = array(
    "Ticketbeschreibung" => [
        "value" => null,
        "type" => "string",
    ],
    "Ratenzahlung" => [
        "value" => null,
        "type" => "integer",
    ],
    "FK_Bezahlungsart" => [
        "value" => null,
        "type" => "integer",
    ],
    "Rechnungsnr" => [
        "value" => null,
        "type" => "integer",
    ],
);

foreach ($params as $param => $arr) {
    if ((!isset($_REQUEST[$param]))) {
        print_r($_REQUEST);
        throwError('bad_param', "", "Field {$param} is not set");
    } else {
        try {
            $params[$param]["value"] = castValue($_REQUEST[$param], $arr['type']);
        } catch (Exception $e) {
            throwError("bad_casting_type", data: $e->getMessage());
        }
    }
}

try {
    $conn->beginTransaction();
    $stmt = $conn->prepare("UPDATE rechnung 
        SET Ticketbeschreibung = :Ticketbeschreibung,
            Ratenzahlung = :Ratenzahlung, 
            FK_Bezahlungsart = :FK_Bezahlungsart
        WHERE Rechnungsnr = :Rechnungsnr");
    foreach ($params as $param => $arr) {
        if (gettype($arr['value']) != $arr["type"]) {
            throwError("bad_param_type", data: "The Field {$param} is the expected type {$arr['type']}");
        }
        $stmt->bindValue(":" . $param, $arr["value"]);
    }
    $stmt->execute();
    $conn->commit();
    return sendSuccesful('default');
} catch (PDOException $e) {
    $conn->rollBack();
    throwError('dberror', data: $e->getMessage());
}
