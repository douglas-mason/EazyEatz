const path = require('path');
const express = require('express');
const cors = require('cors');

const {startDb, stopDb} = require('../db')

const app = express();
const port = 8000;

app
  .use(cors())
  .use(express.text())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// Routes

startDb()

app.listen(port, () => {
  startDb()
  console.log(`Example app listening on port ${port}`);
});