var plotly = require('plotly')(process.env.PLOTLY_USERNAME, process.env.PLOTLY_API_KEY);

module.exports = {
  printObj: function(body){
    var lineNumber = [];
    for(var i = 1; i <= body.lyricsLine.length; i++){
      lineNumber.push(i);
    }
    var angerArray = [];
    var joyArray = [];
    var fearArray = [];
    var surpriseArray = [];
    var sadnessArray = []
    for(var i = 0; i < body.lineRating.length; i++){
      angerArray.push(body.lineRating[i].anger);
      joyArray.push(body.lineRating[i].joy);
      fearArray.push(body.lineRating[i].fear);
      surpriseArray.push(body.lineRating[i].surprise);
      sadnessArray.push(body.lineRating[i].sadness);
    }
    // console.log(joyArray)
    var anger = {x: lineNumber,
      y: angerArray,
      type: 'scatter',
      name: 'anger',
      // mode: 'line+markers',
      text: body.lyricsLine,
      line: {color: 'red'},
    }
    var joy = {x: lineNumber,
      y: joyArray,
      type: 'scatter',
      name: 'joy',
      // mode: 'line+markers',
      text: body.lyricsLine,
      line: {color: 'green'},
    }
    var fear = {x: lineNumber,
      y: fearArray,
      type: 'scatter',
      name: 'fear',
      // mode: 'line+markers',
      text: body.lyricsLine,
      line: {color: 'purple'},
    }
    var surprise = {x: lineNumber,
      y: surpriseArray,
      type: 'scatter',
      name: 'surprise',
      // mode: 'line+markers',
      text: body.lyricsLine,
      line: {color: 'orange'},
    }
    var sadness = {x: lineNumber,
      y: sadnessArray,
      type: 'scatter',
      name: 'sadness',
      // mode: 'line+markers',
      text: body.lyricsLine,
      line: {color: 'cyan'},
    }
    var layout = {fileopt : "overwrite", filename : "test"};
    var data = [anger, joy, fear, surprise, sadness];

    plotly.plot(data, layout, function (err, msg) {
    	if (err) return console.log(err);
    	console.log(msg);
    });

  }
}

// console.log(process.env.PLOTLY_USERNAME)
