from flask import Flask, jsonify
import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

csv_file = "Map/resources/allworlddata.csv"
wp_df = pd.read_csv(csv_file)

conn1 = create_engine("sqlite:///Map/resources/allworlddata.sqlite")
conn2 = create_engine("sqlite:///Map/resources/population.sqlite")

@app.route('/')
def alldata():
   
    alldata = pd.read_sql('SELECT * FROM allworlddata', conn1)
    return alldata.to_dict(orient='records')

# Brazil route 
@app.route("/api/Brazil")
def brazil():

    brazil = pd.read_sql('SELECT * FROM Brazil', conn2)
    return brazil.to_json(orient='records')


# Bangladesh route 
@app.route("/api/Bangladesh")
def bangladesh():

    bangladesh = pd.read_sql('SELECT * FROM Bangladesh', conn2)
    return bangladesh.to_json(orient='records')


# China route
@app.route("/api/China")
def china():

    china = pd.read_sql('SELECT * FROM China', conn2)
    return china.to_json(orient='records')


# India route
@app.route("/api/India")
def india():

    india = pd.read_sql('SELECT * FROM India', conn2)
    return india.to_json(orient='records')


# Indonesia route
@app.route("/api/Indonesia")
def indonesia():

    indonesia = pd.read_sql('SELECT * FROM Indonesia', conn2)
    return indonesia.to_json(orient='records')


# Mexico route
@app.route("/api/Mexico")
def mexico():

    mexico = pd.read_sql('SELECT * FROM Mexico', conn2)
    return mexico.to_json(orient='records')


# Nigeria route
@app.route("/api/Nigeria")
def nigeria():

    nigeria = pd.read_sql('SELECT * FROM Nigeria', conn2)
    return nigeria.to_json(orient='records')


# Pakistan route
@app.route("/api/Pakistan")
def pakistan():

    pakistan = pd.read_sql('SELECT * FROM Pakistan', conn2)
    return pakistan.to_json(orient='records')


# Russia route
@app.route("/api/Russia")
def russia():

    russia = pd.read_sql('SELECT * FROM Russia', conn2)
    return russia.to_json(orient='records')


# US route
@app.route("/api/US")
def us():

    us = pd.read_sql('SELECT * FROM US', conn2)
    return us.to_json(orient='records')


# Run the Flask app in debug mode when script is executed as the main module
if __name__ == '__main__':
     app.run(debug=True)
