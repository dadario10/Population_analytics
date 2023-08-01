import numpy as np

import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:Ottawa123@localhost/Population_test")

# reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(autoload_with=engine)

# # Save reference to the table
# china_pop = Base.classes.China

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


@app.route("/")
def names():
    # # Create our session (link) from Python to the DB
    # session = Session(engine)

    # """Return a list of all passenger names"""
    # # Query all passengers
    # results = session.query(china_pop.Year).all()
    # print(results)
    # session.close()

    # # Convert list of tuples into normal list
    # all_names = list(np.ravel(results))

    # return jsonify(all_names)

    # follow this link to know how to get query from the database
# https://docs.sqlalchemy.org/en/20/tutorial/dbapi_transactions.html#fetching-rows
    with engine.connect() as conn:
        result = conn.execute('SELECT * FROM "China"')
        for row in result:
            print(f"{row}")
    return("the code is working")

if __name__ == '__main__':
    app.run(debug=True)