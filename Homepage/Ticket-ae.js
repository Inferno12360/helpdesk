const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  try {
    let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

    const navbar = fs.readFileSync(path.join(__dirname, 'navbar.html'), 'utf8');
    const footer = fs.readFileSync(path.join(__dirname, 'footer.html'), 'utf8');

    html = html.replace("<?php include 'navbar.html'; ?>", navbar);
    html = html.replace("<?php include 'footer.html'; ?>", footer);

    res.send(html);
  } catch (error) {
    console.error('Fehler beim Lesen der Dateien:', error.message);
    res.status(500).send('Interner Serverfehler');
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});