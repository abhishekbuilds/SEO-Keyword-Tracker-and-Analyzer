from flask import Flask, request, jsonify
from services import patternService
from services import wordFrequencyService
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/find-patterns', methods=['POST'])
def findPatterns():
    data = request.get_json()
    response, status = patternService.handleFindPatterns(data)
    return jsonify(response), status

@app.route('/word-frequency', methods=['POST'])
def wordFrequency():
    data = request.get_json()
    response, status = wordFrequencyService.handleWordFrequency(data)
    return jsonify(response), status

if __name__ == '__main__':
    app.run(debug=True)    