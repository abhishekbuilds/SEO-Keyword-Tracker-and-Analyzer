# Backend Text Analysis Services

This document outlines the usage and functionality of the backend services developed for pattern matching and word frequency analysis. These services are designed to facilitate text analysis by applying various algorithms to detect patterns and compute word frequencies in scraped web content.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Python 3.8 or higher
- Flask
- Requests
- BeautifulSoup4

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/abhishekbuilds/SEO-Keyword-Tracker-and-Analyzer
   ```
2. Navigate to the project directory:
   ```
   cd SEO-Keyword-Tracker-and-Analyzer/seo-backend
   ```
3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

### Running the Application

Run the application with Flask:
```
python app.py
```
The services will be available at `http://127.0.0.1:5000`.

## Usage

### Pattern Matching API

- **Endpoint**: `POST /find-patterns`

#### Request Parameters

- **url (string)**: The URL of the webpage to scrape and analyze.
- **patterns (array of strings)**: A list of string patterns to search within the scraped webpage content.
- **algorithms (array of strings)**: A list of algorithm identifiers to use for pattern matching. Supported values include naiveStringMatching, kmpAlgorithm, rabinKarp, suffixArray, and suffixTree.
- **Body**:
  ```json
    {
        "url": "http://fullerton.edu/",
        "patterns": ["csu", "fullerton"],
        "algorithms": ["NaiveStringMatching", "KmpAlgorithm"]
    }
  ```

#### Response

- **patterns (object)**: An object where each key is a algorithm and its value is an object of patterns names and their corresponding count of occurrences.
- **timeTaken (object)**: An object where each key is an algorithm name and its value is the time taken to complete the search in seconds.
- **Response**:
  ```json
    {
        "patterns": {
            "KMP": {
                "csu": 14,
                "fullerton": 5
            },
            "NaiveString": {
                "csu": 14,
                "fullerton": 5
            }
        },
        "timeTaken": {
            "KMP": 0.0015659999999999563,
            "NaiveString": 0.0009350000000001302
        }
    }
  ```


### Word Frequency API

- **Endpoint**: `POST /word-frequency`

#### Request Parameters

- **url (string)**: The URL of the webpage to scrape and analyze.
- **algorithms (array of strings)**: A list of algorithm identifiers to use for computing word frequencies. Supported values are the same as for the Pattern Matching Service.
- **Body**:
  ```json
    {
        "url": "http://fullerton.edu",
        "algorithms": ["NaiveStringMatching", "KMPAlgo", "RabinKarpAlgo", "SuffixArray", "SuffixTree"]
    }
  ```

#### Response

- **wordFrequencies (object)**: An object where each key is an unique keyword and its value is the corresponding frequencies.
- **processingTimes (object)**: An object where each key is an algorithm name and its value is the time taken to complete the frequency analysis in seconds.
- **Response**:
  ```json
    {
        "processingTimes": {
            "KMPAlgo": 0.19846796989440918,
            "NaiveStringMatching": 0.08391499519348145,
            "RabinKarpAlgo": 0.18356609344482422,
            "SuffixArray": 0.36394810676574707,
            "SuffixTree": 1.5378899574279785
        },
        "wordFrequencies": {
            "academic": 7,
            "academics": 2,
            "accessibility": 2,
            "accreditation": 1,
            "achieve": 1,
            "acrobat": 2,
            "actors": 1,
            "youtube": 1,
            ...
        }
    }
  ```