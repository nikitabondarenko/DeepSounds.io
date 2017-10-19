
lyrArr = []
with open('lyrics.txt','r', encoding='utf-8') as f:
    for line in f:
        for word in line.split():
            if ('[' not in word and ']' not in word and 'Verse' not in word):
                lyrArr.append(word)     