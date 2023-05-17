'use strict';

const handleFileReadError = (err, res) => {
  console.error(err);
  res.status(500).json({ error: 'Failed to read todos file.' });
};

const handleFileWriteError = (err, res) => {
  console.error(err);
  res.status(500).json({ error: 'Failed to write todos file.' });
};

module.exports = {
  handleFileReadError,
  handleFileWriteError,
};
