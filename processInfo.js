var graph = require('./getSongInfo.js')
var request = require('request');

// console.log("Hi");
// console.log(printObjects)
function getLyricsData(){
  request('https://arcane-oasis-93825.herokuapp.com/lyrics', function (error, response, body) {
    body = JSON.parse(body);
    // graph.timeSeries(body);
    graph.barGraph(body);
    // return body;
    return;
  });
}

getLyricsData()

// The scared bridge between Python and Javascript via Flask.
