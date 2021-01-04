var request = require('request');

const parseRequest = (data, address) => {
  var options = {
    url: 'http://localhost:1337/parse/' + address,
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'X-Parse-Application-Id': 'myAppId',
      'Content-Type': 'application/json'
    }
  }
  request(options, function (error, response) {
    console.log(error, response.body);
    return;
  });
}

module.exports = {
  parseRequest,
}