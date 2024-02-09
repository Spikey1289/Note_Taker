const express = require('express');
const path = require('path');
const db = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

//express midware to serve static pages
app.use(express.static('./public'));

//if route is /notes serve notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});









//if route dne, serve homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// start web server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
