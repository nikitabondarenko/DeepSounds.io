function getLyricsData(){
  var request = require('request');
  request('https://arcane-oasis-93825.herokuapp.com/lyrics', function (error, response, body) {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body);
    return body;
  });
}

// The scared bridge between Python and Javascript via Flask. 
