// // Description: CRUD Book No DB
// // npm install express
// // Run this file with node CRUDBookDB.js
// // Test with Postman
// require("dotenv").config();
// const express = require('express');
// const app = express();

// // parse incoming request
// app.use(express.json());

// // sample data
// let books = [
//     {
//         id: 1,
//         title: 'Book 1',
//         author: 'Author 1'
//     },
//     {
//         id: 2,
//         title: 'Book 2',
//         author: 'Author 2'
//     },
//     {
//         id: 3,
//         title: 'Book 3',
//         author: 'Author 3'
//     },
// ]

// // route to get all books
// app.get('/books', (req, res) => {
//     res.json(books);
// });

// // route to get a book by id
// app.get('/books/:id', (req, res) => {
//     const book = books.find(b => b.id === parseInt(req.params.id));
//     if (!book) res.status(404).send('Book not found');
//     res.json(book);
// });

// // route to create a new book
// app.post('/books', (req, res) => {
//     const book = {
//         id: books.length + 1,
//         title: req.body.title,
//         author: req.body.author
//     };
//     books.push(book);
//     res.send(book);
// });

// // route to update a book
// app.put('/books/:id', (req, res) => {
//     const book = books.find(b => b.id === parseInt(req.params.id));
//     if (!book) res.status(404).send('Book not found');
//     book.title = req.body.title;
//     book.author = req.body.author;
//     res.send(book);
// });

// // route to delete a book
// app.delete('/books/:id', (req, res) => {
//     const book = books.find(b => b.id === parseInt(req.params.id));
//     if (!book) res.status(404).send('Book not found');
//     const index = books.indexOf(book);
//     books.splice(index, 1);
//     res.send(book);
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

// const db = newsqlite3.Database('./Database/Book.sqlite');
const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

//connect to database
const db = new sqlite3.Database('./Database/Book.sqlite');

//parse incoming request
app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY, 
    title TEXT,
    author TEXT
)`);

app.get('/books', (req,res) => {
    db.all('SELECT * FROM books', (err,rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

// route to get all books
app.get('/books/:id', (req,res) => {
    db.get('SELECT * FROM books WHERE i = ?',req.params.id,(err,row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(row);
        }
    });
});

// route to get a book by id
app.post('/books', (req,res) => {
    db.get('SELECT * FROM books Where id = ?',req.params.id, (err,row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if(!row) {
        }else {
            res.json(row);
        }
    }
    });
});

//route to create a new book
app.post('/books',(req,res) => {
    db.run('INSERT INTO books (title, author) VALUES (?,?)',book.title,book.author, function(err){
        if(err) {
            res.status(500).send(err);
        }else {
            book.id = this.lastID;
            res.send(book);
        }
    });
});

//route to update a book
app.put('/book/:id', (req,res) => {
    const book = req.body;
    db.run('UPDATE books SET title = ?, author = ? WHERE id = ?', book.title,book.author,req.params.id, function(err) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.send(book);
        }
    });
});

//route to delete a book
app.delete('/books/:id',(req,res) => {
    db.run('DELETE FROM books WHERE id = ?',req.params.id,function(err) {
        if(err) {
            res.status(500).send(err);
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

