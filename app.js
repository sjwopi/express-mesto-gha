const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const routes = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
