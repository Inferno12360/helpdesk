const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

let connection;

async function connectToDatabase() {
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'leon_maurice',
      charset: 'utf8mb4'
    });
    console.log('Verbunden mit der Datenbank.');
  } catch (err) {
    console.error('Verbindung fehlgeschlagen: ' + err.stack);
  }
}

connectToDatabase();

app.get('/mitarbeiter', async (req, res) => {
  const mitarbeiter_id = req.query.id;

  try {
    if (mitarbeiter_id) {
      const [results] = await connection.execute(
        `SELECT Vorname, Nachname, Position, Festnetznummer, Mobilnummer, Email FROM mitarbeiter WHERE PK_Mitarbeiter = ?`,
        [mitarbeiter_id]
      );

      if (results.length === 0) {
        res.json({ error: 'Mitarbeiter nicht gefunden.' });
      } else {
        res.json(results[0]);
      }
    } else {
      const [results] = await connection.execute(
        `SELECT Vorname, Nachname, Position, Festnetznummer AS Telefonnummer, Email FROM mitarbeiter`
      );
      res.json(results);
    }
  } catch (error) {
    res.json({ error: 'Verbindung fehlgeschlagen: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});