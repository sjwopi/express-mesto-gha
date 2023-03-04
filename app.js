const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(routes);
app.use((req, res, next) => {
  req.user = {
    _id: '64037d4152b1b85b61db8ca7',
  };
  next();
});
mongoose.connect('mongodb://localhost:27017/mestodb');
app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
