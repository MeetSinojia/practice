from flask import Flask, request, jsonify

app = Flask(__name__)

# Dummy database to store data
database = []

# Route to handle PUT request
@app.route('/endpoint', methods=['PUT'])
def handle_put_request():
    name = request.headers.get('name')
    college = request.headers.get('college')
    registration_number = request.headers.get('registration-number')
    code_data = request.data

    # Store data in database (in this example, we'll just append it to a list)
    database.append({
        'name': name,
        'college': college,
        'registration_number': registration_number,
        'code_data': code_data
    })

    return jsonify({'message': 'Data received successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
