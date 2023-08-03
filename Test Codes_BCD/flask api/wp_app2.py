from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

csv_file = "Test Codes_BCD\flask api\resources\allworlddata.csvpython"
allworld_df = pd.read_csv(csv_file)

import sqlite3

conn = sqlite3.connect("allworlddata.db")

allworld_df.to_sql('users', conn, if_exists='replace', index=False)

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = sqlite3.connect("allworlddata.db")
    wp_df = pd.read_sql_query('SELECT * FROM users', conn)
    conn.close()
    return jsonify(wp_df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
