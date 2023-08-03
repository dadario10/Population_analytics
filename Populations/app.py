# Import dependencies 
import pandas as pd
from flask import Flask #, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine #, func
# import numpy as np
# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///clean_data/population.sqlite")

#################################################
# Flask Routes
#################################################

# Brazil route 
@app.route("/api/Brazil")
def brazil():

    brazil = pd.read_sql('SELECT * FROM Brazil', con=engine.raw_connection())
    return brazil.to_json(orient='records')


# Bangladesh route, accepts either capital or lowercase 
@app.route("/api/Bangladesh")

def bangladesh():

    bangladesh = pd.read_sql('SELECT * FROM Bangladesh', con=engine.raw_connection())
    return bangladesh.to_json(orient='records')


# China route
@app.route("/api/China")
def china():

    china = pd.read_sql('SELECT * FROM China', con=engine.raw_connection())
    return china.to_json(orient='records')


# India route
@app.route("/api/India")
def india():

    india = pd.read_sql('SELECT * FROM India', con=engine.raw_connection())
    return india.to_json(orient='records')


# Indonesia route
@app.route("/api/Indonesia")
def indonesia():

    indonesia = pd.read_sql('SELECT * FROM Indonesia', con=engine.raw_connection())
    return indonesia.to_json(orient='records')


# Mexico route
@app.route("/api/Mexico")
def mexico():

    mexico = pd.read_sql('SELECT * FROM Mexico', con=engine.raw_connection())
    return mexico.to_json(orient='records')


# Nigeria route
@app.route("/api/Nigeria")
def nigeria():

    nigeria = pd.read_sql('SELECT * FROM Nigeria', con=engine.raw_connection())
    return nigeria.to_json(orient='records')


# Pakistan route
@app.route("/api/Pakistan")
def pakistan():

    pakistan = pd.read_sql('SELECT * FROM Pakistan', con=engine.raw_connection())
    return pakistan.to_json(orient='records')


# Russia route
@app.route("/api/Russia")
def russia():

    russia = pd.read_sql('SELECT * FROM Russia', con=engine.raw_connection())
    return russia.to_json(orient='records')


# US route
@app.route("/api/US")
def us():

    us = pd.read_sql('SELECT * FROM US', con=engine.raw_connection())
    return us.to_json(orient='records')


# Run the Flask app in debug mode when script is executed as the main module
if __name__ == '__main__':
     app.run(debug=True)


# reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(autoload_with=engine)
# print(Base.classes.keys())
# Save reference to the table
# Brazil = Base.classes.Brazil


# Query all years in Brazil table


# @app.route("/api/brazil")
# def brazil():
#     session = Session(engine)
    
#     results = session.query(Brazil.Year).all()
#     print(results)
#     session.close()

#     #convert list of tuples into normal list
#     data = list(np.ravel(results))

#     return jsonify(data)








