const express = require('express');
const fs = require('node:fs');
const app = express();
// const todosRoutes = require('./routes/todos');
const PORT = 3000;

let todos = [];

app.route('/todos').get((req, res) => {
  fs.readFile('./todos.json', 'utf-8', (err, data) => {
    if (err) throw err;
    todos = JSON.parse(data);
    res.json({ todos });
    console.log(todos);
  });
  // res.status(200).json({ todos });
});
// POST todo item
// .post((req, res) => {
//   const newId = todos.length + 1;
//   const todo = { id: newId, title: `Title ${newId}`, completed: false };
//   todos.push(todo);
//   res.json({ todos });
// });

app
  .route('/todos/:id')
  // GET todo item by id
  .get((req, res) => {
    const searchId = parseInt(req.params.id);
    const todo = todos.filter((item) => item.id === searchId);
    // console.log(searchId);
    res.json({ todo });
  });

//   // PUT todo item
//   .put((req, res) => {
//     const searchId = parseInt(req.params.id);
//     const searchIndex = todos.findIndex((item) => item.id === searchId);
//     const searchItem = todos.at(searchIndex);

//     searchItem.title === 'Title'
//       ? (searchItem.title = 'Title edited')
//       : (searchItem.title = 'Title edited again');

//     searchItem.completed === false ? (searchItem.completed = true) : (searchItem.completed = false);
//     res.json({ todo: searchItem });
//   })

//   // DELETE todo item
//   .delete((req, res) => {
//     res.send(`Deleted a todo item with id:${req.params.id}`);
//   });

app.listen(PORT, () => {
  console.log(`Listening port on ${PORT}`);
});
