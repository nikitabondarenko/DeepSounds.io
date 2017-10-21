var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var hbs = require('hbs');
var api = require('genius-api');
var genius = new api(process.env.GENIUS_CLIENT_ACCESS_TOKEN);
const BASE_URI = "https://api.genius.com";
if (! process.env.GENIUS_CLIENT_ACCESS_TOKEN) {
  throw new Error("GENIUS_CLIENT_ACCESS_TOKEN is not in the environmental variables. Try running 'source env.sh'");
}
//const Lyricist = require('lyricist/node6');
//const lyricist = new Lyricist(process.env.GENIUS_CLIENT_ACCESS_TOKEN);
//lyricist.song(714198).then(song => console.log(song.title));


console.log("DIR NAME", __dirname);
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'hbs');
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/views/index.html');
});

app.get('/about', function (req, res) {
  res.sendFile(__dirname+'/views/about.html');
});

app.get('/search', function (req, res) {
  console.log(req.query.artist);
  genius.search(req.query.artist + ' ' + req.query.song).then(function(response) {
    console.log(response.hits[0].result);
    res.render('submit', {hit: response.hits[0].result});
  })
  .catch(function(err){
    console.log("ERROR", err);
  })
})

app.get('/info', function (req, res) {
  console.log("REQ", req.query.id)
  //lyricist.song(req.query.id).then(song => console.log(song.title));
  //var song = lyricist.song(req.query.id, {fetchLyrics: true}).then(song => console.log(song.title, song.lyrics));
  //const song = await lyricist.song(req.query.id, { fetchLyrics: true });
  //console.log(song)
  //console.log(song.title)
  //get annotation
  // genius.annotation(parseInt(req.query.id)).then(function(response) {
  //   console.log(response.annotation);
  //   res.render('submit', {id: req.query.id, annotation: response.annotation});
  // })
  // .catch(function(err){
  //   console.log("ERROR", err);
  // })

  //get song and data using Genius API
  //get song lyrics using lyricist npm package
  genius.song(parseInt(req.query.id)).then(function(response) {
    console.log(response.song);
    //console.log(response.song.description_annotation)
    console.log(response.song.description_annotation)
    console.log(response.song.stats)
    //console.log("REQPNOSE", response.song.description_annotation.annotations[0].body.dom.children[0].children);
    res.render('submit', {id: req.query.id, annotation: response.song.description_annotation.annotations[0],
      stats : response.song.stats//, lyrics: song.lyrics

      //render data that does not need python

      //render data that needs python
    });
  }).catch(function(err){
    console.log("ERROR", err);
  })

});

app.get('/songlyrics', function(req, res){
  lyricist.song(parseInt(req.query.id)).then(function(response){
    console.log(response.song.title)
    console.log(response.song.lyris)
    res.render('lyrics', {id: req.query.id, title: response.song.title, lyrics: response.song.lyrics})
  }).catch(function(err){
    console.log("ERROR", err);
  })
})

app.get('/*', function (req, res) {
  res.redirect('/');
});

app.listen(5001, function(){
  console.log("app.js listening on port 5001")
})
