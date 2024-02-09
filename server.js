const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

//express midware to parse json to objects
app.use(express.json());

//if route is /notes serve notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//POST route for new notes
app.post('/api/notes', (req, res) => {
    //generate new id
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };
    console.log(newNote);

    //retrieve data from json file into array
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            //parsed notes array
            const parsedNote = JSON.parse(data);

            //push onto array
            parsedNote.push(newNote);

            //save as json file
            fs.writeFile(
                './db/db.json', 
                JSON.stringify(parsedNote, null, 4),
                (writeErr) => writeErr ? console.error(writeErr) : console.info('updated notes')
            );
        }
    })

    //send response
    const response = {
        status: 'success',
        body: newNote,
    };

    res.json(response);
});

//retrieve all existing notes from server
app.get('/api/notes', (req, res) => res.json(notes));

//express midware to serve static pages
app.use(express.static('public'));

//if route dne, serve homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// start web server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
