const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

db.query("CREATE TABLE IF NOT EXISTS books (name VARCHAR(255), author VARCHAR(255), mark FLOAT, status VARCHAR(255), finished DATE)", (err) => {
    if (err) {
        console.error('Error creating the table:', err);
        return;
    }
    console.log('Table created');
});



app.get('/books', (req, res) => {
    const sql = 'SELECT name, author, mark, status, finished FROM books ORDER BY author';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}); 


app.post('/add-book', (req, res)=>{
    let { name, author, mark, status, finished } = req.body;
    const sql = 'INSERT INTO books (name, author, mark, status, finished) VALUES (?,?,?,?,?)';

    if (mark < 0 || mark > 10){
        res.status(400).send('Invalid mark');
        return;
    }
    if (author == ""){
        res.status(400).send('A book should have an author');
        return;
    }

    mark = mark === "" ? null : mark;
    finished = finished === "" ? null : finished;


    db.query (sql  ,[name, author, mark ,status, finished], (err) => {
        if (err){
            console.log(err);
            res.status(500).send('Error adding book: ' + name);
            return;
        }
        res.status(200).send("Book added successfully");
    });
});

app.post ('/delete-book', (req, res) => {
    const {name} = req.body;
    const sql = 'DELETE FROM books WHERE name = ?';
    db.query(sql, [name], (err)=>{
        if(err){
            console.log(err);
            res.status(500).send('Error deleting book');
            return;
        } 
        res.status(200).send("Book deleted succesfully");
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



