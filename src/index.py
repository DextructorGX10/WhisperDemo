from flask import Flask, request, jsonify

app = Flask(__name__)

# failing.....
@app.route('/path/to/server/script', methods=['POST'])
def receive_text_data():
    data = request.get_json()
    text_data = data.get('textData')

    # Process the text_data here, for example:
    # print the received text data
    print("Received text data:", text_data)

    # You can return a response if needed
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run()
