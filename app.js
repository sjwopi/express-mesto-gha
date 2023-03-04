const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')

const { PORT = 3000 } = process.env;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';

const app = express();

mongoose.connect(DATABASE_URL)

app.listen(PORT, () => {
  console.log(`Stsrt on port ${PORT}`);
});

app.use(express.json())
app.use(routes)
