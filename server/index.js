require('dotenv').config();
const path = require('path');
const { createBuild, getBuilds } = require('../database/controllers/controller.js');

const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  getBuilds()
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.log('Error retrieving data from database: ', error);
      res.sendStatus(500);
    })
})

app.post('/', (req, res) => {
  createBuild(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error sending build data to database: ', error);
      res.sendStatus(500);
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost${PORT}`);
});
