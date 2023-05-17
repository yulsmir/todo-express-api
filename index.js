const express = require('express');
const fs = require('node:fs');
const app = express();
const PORT = 3000;
const todosFilePath = './todos.json';

app.use(express.json());

// GET all todos
app.get(todosFilePath, (req, res) => {
  fs.readFile('./todos.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(err.status.code).json({ error: 'Failed load todos' });
    }
    try {
      const todos = JSON.parse(data);
      res.json(todos);
    } catch (error) {
      console.error(error);
      res.status(err.status.code).json({ error: 'Failed to read todos file.' });
    }
  });
});

// GET todo by id
app.get('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  fs.readFile(todosFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve todos.' });
    }

    try {
      const todos = JSON.parse(data);
      const todo = todos.find((item) => item.id === todoId);

      if (!todo) {
        return res.status(404).json({ error: 'Todo item is not found.' });
      }

      res.json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Cannot find todos data.' });
    }
  });
});

// POST todo item
// .post((req, res) => {
//   const newId = todos.length + 1;
//   const todo = { id: newId, title: `Title ${newId}`, completed: false };
//   todos.push(todo);
//   res.json({ todos });
// });

// app
//   .route('/todos/:id')
//   // GET todo item by id
//   .get((req, res) => {
//     const searchId = parseInt(req.params.id);
//     const todo = todos.filter((item) => item.id === searchId);
//     console.log(todo);
//     res.json({ todo });
//   })

//   // PUT todo item
//   .put((req, res) => {
//     const searchId = parseInt(req.params.id);
//     const todo = todos.filter((item) => item.id === searchId);

//     todo.title === 'Title ' ? (todo.title = 'Title edited') : (todo.title = 'Title edited again');

//     todo.completed === false ? (todo.completed = true) : (todo.completed = false);
//     res.json({ todo });
//   });

//   // DELETE todo item
//   .delete((req, res) => {
//     res.send(`Deleted a todo item with id:${req.params.id}`);
//   });

app.listen(PORT, () => {
  console.log(`Listening port on ${PORT}`);
});
