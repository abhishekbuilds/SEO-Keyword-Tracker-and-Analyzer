from algorithms import KMPAlgo, NaiveStringMatching, RabinKarpAlgo, SuffixArray, SuffixTree
import time

def runAlgorithmForPatterns(scraped_data, algorithm, patterns):
    patternCount = {pattern: 0 for pattern in patterns}

    start = time.process_time()
    for pattern in patterns:
        count = algorithm.search_pattern(scraped_data, pattern)
        patternCount[pattern] = count
    end = time.process_time()

    return patternCount, end - start

def findPatterns(scraped_data, patterns, algorithmselected):
    process_time = {}
    pattern_frequencies = {}

    algorithm_map = {
        "NaiveStringMatching": (NaiveStringMatching, "NaiveString"),
        "KmpAlgorithm": (KMPAlgo, "KMP"),
        "RabinKarp": (RabinKarpAlgo, "RabinKarb"),
        "SuffixArray": (SuffixArray, "SuffixArray"),
        "SuffixTree": (SuffixTree, "SuffixTree")
    }

    for key, (algo_class, algo_name) in algorithm_map.items():
        if key in algorithmselected:
            patternCount, time_taken = runAlgorithmForPatterns(scraped_data, algo_class, patterns)
            process_time[algo_name] = time_taken
            pattern_frequencies[algo_name] = patternCount
            
            print(f"Time to run {algo_name}: {time_taken:.6f} secs for patterns: {patternCount}")

    return pattern_frequencies, process_time