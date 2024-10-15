<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
    include 'Conn.php';

    function GET_Mitarbeiter_ALL(){
		    $handler = new PDO("mysql:host=localhost;dbname=helpdesk", "root", "");
			$stmt = $handler->prepare("SELECT * FROM Mitarbeiter");
			$stmt->execute();
            $mitarbeiter = [];
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $mitarbeiter[] = [
                    'PK_Mitarbeiter' => $row['PK_Mitarbeiter'],
                    'Vorname' => $row['Vorname'],
                    'Nachname' => $row['Nachname'],
                    'Position' => $row['Position'],
                    'Festnetznummer' => $row['Festnetznummer'],
                    'Mobilnummer' => $row['Mobilnummer'],
                    'Email' => $row['Email'],
                ];
            }
            echo json_encode($mitarbeiter);
    }
    function GET_Mitarbeiter_Name(){
            $handler = new PDO("mysql:host=localhost;dbname=helpdesk", "root", "");
			$stmt = $handler->prepare("SELECT * FROM Mitarbeiter");
			$stmt->execute();
            $mitarbeiter = [];
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $mitarbeiter[] = [
                    'PK_Mitarbeiter' => $row['PK_Mitarbeiter'],
                    'Vorname' => $row['Vorname'],
                    'Nachname' => $row['Nachname']
                ];
            }
            echo json_encode($mitarbeiter);
    }
    ?>
</body>
</html>