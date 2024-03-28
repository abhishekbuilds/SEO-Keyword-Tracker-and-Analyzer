import requests
import re
import unicodedata
from bs4 import BeautifulSoup
from stopWords import stopwords_list
import ssl

def cleanUp(data):
    data = unicodedata.normalize('NFKD', data).encode('ascii', 'ignore').decode('utf-8', 'ignore')
    data = data.lower()
    data = re.sub(r"[^\w\s'-]", "", data)
    data = re.sub(r"_", " ", data)
    data = re.sub(r"\s+", " ", data).strip()
    return data

def scrapeWebpage(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        if 'html' in response.headers['Content-Type'].lower():
            soup = BeautifulSoup(response.text, "html.parser")
            text = cleanUp(soup.get_text())
            words = text.split()
            filtered_words = [
                word for word in words 
                if word.lower() not in stopwords_list 
                and not re.match(r'^[a-z]$', word) 
                and not re.match(r'^\d', word)
            ]
            filtered_text = " ".join(filtered_words)
            return filtered_text
        else:
            print("The URL did not point to an HTML content. Content-Type:", response.headers['Content-Type'])
            return ""
    except requests.HTTPError as e:
        print("Failed to retrieve the web page. HTTP Error:", e)
    except Exception as e:
        print("An error occurred:", e)
    return ""