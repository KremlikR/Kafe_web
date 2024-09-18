from flask import Flask, render_template, request, redirect, url_for, jsonify
import json

app = Flask(__name__)

DATA_FILE = 'data.json'

def load_data():
    try:
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        person = request.form.get('person')
        drinks = {
            'milk': int(request.form.get('milk', 0)),
            'espresso': int(request.form.get('espresso', 0)),
            'coffee': int(request.form.get('coffee', 0)),
            'long': int(request.form.get('long', 0)),
            'doppio': int(request.form.get('doppio', 0))
        }
        
        # Save the data
        data = load_data()
        data.append({'person': person, 'drinks': drinks})
        save_data(data)
        
        return redirect(url_for('index'))

    data = load_data()
    totals = calculate_totals(data)
    return render_template('index.html', data=data, totals=totals)

def calculate_totals(data):
    totals = {}
    for entry in data:
        person = entry['person']
        if person not in totals:
            totals[person] = {'milk': 0, 'espresso': 0, 'coffee': 0, 'long': 0, 'doppio': 0}
        
        for key in totals[person]:
            totals[person][key] += entry['drinks'][key]
    return totals

if __name__ == '__main__':
    app.run(debug=True)
