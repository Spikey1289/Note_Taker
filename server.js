const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const {v4: uuidv4} = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

//express midware to parse json to objects
app.use(express.json());

//if route is /notes serve notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//express midware to serve static pages
app.use(express.static('public'));

//retrieve all existing notes from server
app.get('/api/notes', (req, res) => res.json(notes));

//POST route for new notes
app.post('/api/note', (req, res) => {
    //retrieve data from json file into array

    //generate new id

    //create new object

    //push onto array

    //save as json file

    //send response
});


//if route dne, serve homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// start web server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
