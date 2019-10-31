require('dotenv').config()
const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');
app.use(express.json());

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;

massive(CONNECTION_STRING).then(db => {
    console.log("database connected");
    // resetting entire db on server restart
    db.init().then(() => {
        app.set('db', db)
    });
    // no resetting entire db on server restart
    // app.set("db", db)
});

app.get('/api/test', (req, res, next) => {
    const db = req.app.get('db');
    db.query('SELECT * FROM users').then(users => {
        res.status(200).send(users);
    });
});

let port = SERVER_PORT || 4000
app.listen(port, () => console.log(`server listening on port ${port}`));