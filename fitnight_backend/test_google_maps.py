
from decouple import config
import openrouteservice

# Load API key from .env file
api_key = config('OPENROUTESERVICE_API_KEY')
client = openrouteservice.Client(key=api_key)

# Test with a sample request
geocode_result = client.pelias_search('New York')
print(geocode_result)
