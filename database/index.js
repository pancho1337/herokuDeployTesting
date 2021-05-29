const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`we're connected to mongoDB!`)
});

  let repoSchema = new mongoose.Schema({
    owner: {
      login: String,
      avatar_url: String,
      url: String,
      repos_url: String
    },
    repoName: String,
    description: String,
    html_url: String,
    created_at: String,
    forks_count: Number
  });

  repoSchema.methods.testConnection = function () {
    console.log(`succesfully saved ${this.repoName} as a name in repoSchema!`);
  }

  module.exports.Repo = mongoose.model('Repo', repoSchema);

  module.exports.save = (username, gitHubProfile) => {
    // console.log('these are the args for save: ', username, 'profile: ', gitHubProfile)
    let userRepo = new module.exports.Repo(gitHubProfile);
    userRepo.save((err, username) => {
      if (err) {
        console.log(`error saving ${username}, error: `, err);
      } else {
        userRepo.testConnection();
      }
    })
  }



// module.exports.save = save;

/*

"name": "git-consortium",
owner: {
  "login": "octocat",
  "avatar_url": "https://avatars0.githubusercontent.com/u/583231?v=3",
  "url": "https://api.github.com/users/octocat",
  "repos_url": "https://api.github.com/users/octocat/repos",
},
"description": "This repo is for demonstration purposes only.",
"html_url": "https://github.com/octocat/git-consortium",
"created_at": "2014-03-28T17:55:38Z",
"updated_at": "2016-12-06T13:06:37Z",
"forks_count": 24,
*/