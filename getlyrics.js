var api = require('genius-api');
var fs = require('fs');
var genius = new api(process.env.GENIUS_CLIENT_ACCESS_TOKEN);
const BASE_URI = "https://api.genius.com";
if (! process.env.GENIUS_CLIENT_ACCESS_TOKEN) {
  throw new Error("GENIUS_CLIENT_ACCESS_TOKEN is not in the environmental variables. Try running 'source env.sh'");
}
const Lyricist = require('lyricist/node6');
const lyricist = new Lyricist(process.env.GENIUS_CLIENT_ACCESS_TOKEN);

//song title
//lyricist.song(714198).then(song => console.log(song.title));

lyricist.song(514133, { fetchLyrics: true }).then(song =>
  fs.writeFile('lyrics.txt', song.lyrics, function (err) {
    console.log(song.lyrics)
    if (err) {
      return console.log(err);
    }
    //console.log('Hello World > helloworld.txt');
})
)

//lyrics
//const song = await lyricist.song(714198, { fetchLyrics: true });
//console.log(song.lyrics);
