import scraper
import time
from algorithms import KMPAlgo, NaiveStringMatching, RabinKarpAlgo, SuffixArray, SuffixTree
from controllers import wordFrequencies


def handleWordFrequency(data):
    url = data.get('url')
    algorithm_names = data.get('algorithms')
    scraped_data = scraper.scrapeWebpage(url)

    algorithms = {
        "KMPAlgo": KMPAlgo,
        "NaiveStringMatching": NaiveStringMatching,
        "RabinKarpAlgo": RabinKarpAlgo,
        "SuffixArray": SuffixArray,
        "SuffixTree": SuffixTree
    }

    valid_algorithms = {name: algorithms[name] for name in algorithm_names if name in algorithms}


    if not scraped_data:
        return {"error": "Failed to scrape the webpage or no content found."}, 400

    words_set = set(scraped_data.split())

    first_algo_name, first_algo_class = next(iter(valid_algorithms.items()))
    word_counts = {word: wordFrequencies.countOccurrences(scraped_data, word, first_algo_class) for word in words_set}

    processing_times = {}

    start_time = time.time()
    for word in words_set:
        _ = wordFrequencies.countOccurrences(scraped_data, word, first_algo_class)
    end_time = time.time()
    processing_times[first_algo_name] = end_time - start_time

    for algo_name, algo_class in valid_algorithms.items():
        if algo_name == first_algo_name:
            continue

        start_time = time.time()
        for word in words_set:
            _ = wordFrequencies.countOccurrences(scraped_data, word, algo_class)
        end_time = time.time()
        processing_times[algo_name] = end_time - start_time

    return {
        "wordFrequencies": word_counts,
        "processingTimes": processing_times
    }, 200