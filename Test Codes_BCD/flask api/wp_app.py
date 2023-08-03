from flask import Flask, jsonify
import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#csv_file = "Test Codes_BCD/flask api/resources/allworlddata.csv"
#wp_df = pd.read_csv(csv_file)

#import sqlite3

#conn = sqlite3.connect("allworlddata.sqlite")
conn = create_engine("sqlite:///allworlddata.sqlite")
#wp_df.to_sql('allworlddata', conn, if_exists='replace', index=False)

@app.route('/')
def get_users():
    #conn = sqlite3.connect("wp_database.db")
    wp_df = pd.read_sql('SELECT * FROM allworlddata', conn)
    print(wp_df.head())
    #conn.close()
    return jsonify(wp_df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
