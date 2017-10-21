import sentiment

from flask import Flask, request
from flask_restful import Resource, Api
# from sqlalchemy import create_engine
from json import dumps

#Create a engine for connecting to SQLite3.
#Assuming salaries.db is in your app root folder

# e = create_engine('sqlite:///salaries.db')

app = Flask(__name__)
api = Api(app)

class analyze(Resource):
    def get(self):
        lyrArr = []
        with open('lyrics.txt','r', encoding='utf-8') as f:
            for line in f:
                for word in line.split('\n'):
                    if ('[' not in word and ']' not in word and 'Verse' not in word and word != ''):
                        lyrArr.append(word)
            # print(lyrArr)
            # print(sentiment.string(lyrArr))
        return { 'lyricsLine': lyrArr, 'lineRating': sentiment.rate(lyrArr) }
            # We are returning a tuple, the lyrics array and the lyrics array rating.

api.add_resource(analyze, '/lyrics')

if __name__ == '__main__':
     app.run()
