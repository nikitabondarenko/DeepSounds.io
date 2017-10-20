import sentiment

def analyze():
    lyrArr = []
    with open('lyrics.txt','r', encoding='utf-8') as f:
        for line in f:
            for word in line.split('\n'):
                if ('[' not in word and ']' not in word and 'Verse' not in word and word != ''):
                    lyrArr.append(word)
        # print(lyrArr)
        # print(sentiment.string(lyrArr))
        return (lyrArr, sentiment.rate(lyrArr))
        # We are returning a tuple, the lyrics array and the lyrics array rating.
