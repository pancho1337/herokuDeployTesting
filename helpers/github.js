const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return axios(options)
    .then(data => {
      console.log('GITHUB.data', data.data)
      return data.data; // extracting the actual github profile
    })

}

module.exports.getReposByUsername = getReposByUsername;