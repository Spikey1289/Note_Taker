const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs').promises;
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

    // //generate new id
    // let newNote = {
    //     id: uuidv4(),
    //     title: req.body.title,
    //     text: req.body.text
    // };


    //retrieve data from json file into array
    fs.readFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((array) => {
            //generate new id
            let newNote = {
                id: uuidv4(),
                title: req.body.title,
                text: req.body.text
            };
            array.push(newNote);
            return array;
        })
        .then((array) => {
            let stringedNote = JSON.stringify(array, null, 4);
            fs.writeFile('./db/db.json', stringedNote);
            console.info('updated notes');

            const response = {
                body: stringedNote
            };
            res.send("response");
        })
    .catch((err) => console.log(err));
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json')
        .then((data) => {
            let noteID = req.params.id;
            let excArray = JSON.parse(data).filter((note) => note.id !== noteID);
            return excArray;
        })
        .then((excArray) => {
            let stringedData = JSON.stringify(excArray, null, 4);
            fs.writeFile('./db/db.json', stringedData);

            const response = {
                body: stringedData
            };
            res.send("response");
        })
        .catch((err) => console.log(err));
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
