const express = require('express');
let app = express();
const getReposByUsername = require('../helpers/github.js');
const mongoose = require('../database/index.js');
require('dotenv').config()

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  console.log('confirming body content: ', req.body)
  return getReposByUsername.getReposByUsername(req.body.username)
    .then(data => {
      data.forEach(userRepo => {
        mongoose.save(req.body.username, userRepo)
      })
    })
    .then(sucess => {
      res.status(200).send();
    })
    .catch(err => {
      console.log('error in the github API -> mongoose save process: ', err);
      res.status(404).send();
    })
});

app.get('/repos', function (req, res) {
  mongoose.Repo.find().sort({ '_id': -1, 'forks_count': -1  }).limit(25)
    .then(repos => {
      console.log('found these repos from the get request: ', repos);
      res.status(200).send(repos);
    })
    .catch(err => {
      console.log('failed to find repos from get: ', err);
      res.status(404).send(err);
    })
});

// let port = 1128;
let port = process.env.PORT;
if (port === null || port == '') {
  port = 3000;
}


app.listen(3001, function() {
  console.log(`listening on port ${port}`);
});

//