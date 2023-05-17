'use strict';

const fs = require('fs');

const readTodosFile = (todosFilePath, callback) => {
  fs.readFile(todosFilePath, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }

    try {
      const todos = JSON.parse(data);
      callback(null, todos);
    } catch (error) {
      callback(error, null);
    }
  });
};

const writeTodosFile = (todosFilePath, todos, res, successMessage) => {
  fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2), (err) => {
    if (err) {
      handleFileWriteError(err, res);
      return;
    }

    res.json(successMessage);
  });
};

module.exports = {
  readTodosFile,
  writeTodosFile,
};
