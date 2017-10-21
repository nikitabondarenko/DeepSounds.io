var printObjects = require('./getSongInfo.js')
var request = require('request');

// console.log("Hi");
// console.log(printObjects)
function getLyricsData(){
  request('https://arcane-oasis-93825.herokuapp.com/lyrics', function (error, response, body) {
    printObjects.printObj(JSON.parse(body));
    // return body;
    return;
  });
}

getLyricsData()

// The scared bridge between Python and Javascript via Flask.
