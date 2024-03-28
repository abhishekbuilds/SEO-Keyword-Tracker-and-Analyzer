import scraper
from controllers import patternMatching

def handleFindPatterns(data):
    url = data.get('url')
    patterns = data.get('patterns')
    algorithms = data.get('algorithms')
    scraped_data = scraper.scrapeWebpage(url)

    if not scraped_data:
        return {"error": "Failed to scrape the webpage or no content found."}, 400

    pattern_frequencies, process_time = patternMatching.findPatterns(scraped_data, patterns, algorithms)

    return {
        "patterns": pattern_frequencies,
        "timeTaken": process_time
    }, 200