const express = require('express');
const fs = require('node:fs');
const app = express();
const PORT = 3000;

let todos = [];

// const searchedItem = todos?.[searchId - 1];
// const firstItemId = todos[0]?.id;
// const lastItemId = todos?.length;
// const currentId = lastItemId + 1;

fs.readFile('./todos.json', (err, data) => {
  if (err) throw err;
  todos = JSON.parse(data);
  console.log(todos);
});

// GET
const getAllTodos = (req, res) => {
  res.json({ todos });
};

// GET todo item by id
app.get(`/todos/:id`, (req, res) => {
  // const searchIndex = todos?.findIndex((item) => item.id === searchId);
  const searchId = parseInt(req.params.id);
  const todo = todos.filter((item) => item.id === searchId);
  console.log(searchId);
  res.json({ todo });
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

app.use('/todos', getAllTodos);
app.use('/', getAllTodos);

app.listen(PORT, () => {
  console.log(`Listening port on ${PORT}`);
});
