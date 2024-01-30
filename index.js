const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

//connect to database
const db = newsqlite3.Database('./Database/Book.sqlite');

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