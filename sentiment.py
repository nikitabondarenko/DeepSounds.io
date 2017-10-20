import indicoio
import os

indicoio.config.api_key = os.environ["INDICOIO_API_KEY"]

def rate(lyrics):
    if((type(lyrics) is str)):
        lyrics = lyrics.split('\n')
    # print(lyrics)
    lyricsEmotion = []
    for line in lyrics:
        lyricsEmotion.append(indicoio.emotion(line))
    return lyricsEmotion


# print(string("I do not like this. \nBecause I said so."))
