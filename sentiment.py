import indicoio
import os

indicoio.config.api_key = os.environ["INDICOIO_API_KEY"]

print(indicoio.emotion("I do not like green eggs and ham!")
