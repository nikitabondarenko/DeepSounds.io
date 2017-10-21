var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var hbs = require('hbs');
var api = require('genius-api');
var request = require('request');
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
    request('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=V4XUQD1Kz4IoKPAuWZ39NveeylCR8NGG&postalCode=94103',
    function (error, resp, body){
      var newBody = JSON.parse(body);
      newBody1 = newBody._embedded.events.map((event) => (event)).splice(10)
      newBody = newBody._embedded.events.map((event) => (event.name)).splice(10)
      // console.log(newBody1);
    res.render('submit', {
        hit: response.hits[0].result,
        annotation: response.hits[0].result.annotation_count,
        // stats : response.song.stats,
        songName: response.hits[0].result.full_title,
        // releaseDate: response.song.release_date,
        // albumName: response.hits[0].result.annotation_count,
        artistPicture: response.hits[0].result.song_art_image_thumbnail_url,
        // youtubeLink: youtubeSplicer(response.song.media[0].url),
        names: newBody1
      });
  })
  })
  .catch(function(err){
    console.log("ERROR", err);
  })
})

function youtubeSplicer(a) {
  var youtube = a.slice(0, 24)
  var addMe = 'embed/'
  var youtube1 = a.slice(32, -1)
  return youtube+addMe+youtube1

};



app.get('/info', function (req, res) {
  console.log("REQ", req.query.id)

  genius.song(parseInt(req.query.id))
  .then(function(response) {
    request('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=V4XUQD1Kz4IoKPAuWZ39NveeylCR8NGG&postalCode=94103',
    function (error, resp, body){
      var newBody = JSON.parse(body);
      newBody1 = newBody._embedded.events.map((event) => (event)).splice(10)
      newBody = newBody._embedded.events.map((event) => (event.name)).splice(10)
      // console.log(newBody1);
      console.log(response.song);

      res.render('submit', {id: req.query.id, annotation: response.song.annotation_count,
        stats : response.song.stats,
        songName: response.song.full_title,
        releaseDate: response.song.release_date,
        albumName: response.song.album.full_title,
        artistPicture: response.song.primary_artist.header_image_url,
        youtubeLink: youtubeSplicer(response.song.media[0].url),
        names: newBody1
      });

    })

  }).catch(function(err){
    console.log("ERROR", err);
  });

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
