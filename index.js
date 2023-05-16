const express = require('express');
const fs = require('node:fs');
const app = express();
const PORT = 3000;

let todos = [];

fs.readFile('./todos.json', (err, data) => {
  if (err) throw err;
  todos = JSON.parse(data);
  console.log(todos);
});

// GET
app.get('/', (req, res) => {
  res.json({ todos });
});

app.get('/todos', (req, res) => {
  res.json({ todos });
});

// GET todo item by id
app.get(`/todos/:todoId`, (req, res) => {
  res.json(req.params);
});

// POST todo item
// app.post(`/todos/:${id}`, (req, res) => {
//   res.send(`Post todo item with id:${id}`);
// });

// PUT todo item
// app.put(`/todos/:${id}`, (req, res) => {
//   res.send(`Put a todo item with id:${id}`);
// });

// DELETE todo item
// app.delete(`/todos/:${id}`, (req, res) => {
//   res.send(`Deleted a todo item with id:${id}`);
// });

app.listen(PORT, () => {
  console.log(`Listening port on ${PORT}`);
});
