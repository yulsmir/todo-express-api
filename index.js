const express = require('express');
const app = express();
const PORT = 3000;
const todosRoutes = require('./routes/todosRoutes');

// Middleware
app.use(express.json());

// Define routes
app.use(todosRoutes);

app.listen(PORT, () => {
  console.log(`Listening port on ${PORT}`);
});
