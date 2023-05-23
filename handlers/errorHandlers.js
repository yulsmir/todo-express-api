'use strict';

const handleFileReadError = (err, res) => {
  res.status(500).json({ error: 'Failed to read todos file.' });
};

const handleFileWriteError = (err, res) => {
  res.status(500).json({ error: 'Failed to write todos file.' });
};

module.exports = {
  handleFileReadError,
  handleFileWriteError,
};
