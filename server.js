const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
app.use(express.static('public'));

let logs = []; // Här sparar vi alla fusk-försök

// 1. Ta emot loggar från FiveM
app.post('/report-cheat', (req, res) => {
    const report = {
        time: new Date().toLocaleString(),
        player: req.body.playerName,
        reason: req.body.reason,
        details: req.body.details,
        id: req.body.playerId
    };
    logs.unshift(report); // Lägg till högst upp i listan
    console.log(`[VARNING] ${report.player} flaggad för ${report.reason}`);
    res.sendStatus(200);
});

// 2. Skicka loggar till din panel
app.get('/get-logs', (req, res) => {
    res.json(logs);
});

app.listen(3000, () => console.log("Owner Panel körs på port 3000"));