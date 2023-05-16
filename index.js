const express = require('express');
const app = express();
const port = 3000;

// GET
app.get('/', (req, res) => {
  res.send('Get all todos');
});

app.get('/todos', (req, res) => {
  res.send('Get all todos');
});

// GET todo item by id
let id = 1;
app.get(`/todos/:${id}`, (req, res) => {
  res.send(`Get todo item with id:${id}`);
});

// POST todo item
app.post(`/todos/:${id}`, (req, res) => {
  res.send(`Post todo item with id:${id}`);
});

// PUT todo item
app.put(`/todos/:${id}`, (req, res) => {
  res.send(`Put a todo item with id:${id}`);
});

// DELETE todo item
app.delete(`/todos/:${id}`, (req, res) => {
  res.send(`Deleted a todo item with id:${id}`);
});

app.listen(port, () => {
  console.log(`Listening port on ${port}`);
});
