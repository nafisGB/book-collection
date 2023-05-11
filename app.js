// Require the Express.js and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');

// Create a new Express.js app instance
const app = express();
// Set the port for the app to listen on
const PORT = 3000;

// Initialize an empty array to store the book collection
let books = [];

// Use body-parser middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Set up a route for the root URL that serves the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Set up a route for the /books URL that returns a JSON array of the book collection
app.get('/books', (req, res) => {
  res.json(books);
});

// Set up a route for the /books URL that allows a user to add a book to the collection
app.post('/books', (req, res) => {
    // Create a new book object with a unique ID, title, author, and publishedDate
  const book = {
    id: Date.now().toString(),
    title: req.body.title,
    author: req.body.author,
    publishedDate: req.body.publishedDate || ''
  };
  // Add the book to the collection
  books.push(book);
  // Return the book object in the response
  res.json(book);
});

// Set up a route for the /books/:id URL that allows a user to delete a book from the collection
app.delete('/books/:id', (req, res) => {
    // Get the book ID from the URL parameter
  const bookId = req.params.id;
  // Remove the book from the collection using the filter method
  books = books.filter(book => book.id !== bookId);
  // Return a success message in the response
  res.json({ message: 'Book deleted successfully' });
});

// Start the app and listen for requests on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
