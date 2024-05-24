# from flask import Flask, render_template, jsonify
# from sqlalchemy import create_engine, text, inspect
# from sqlalchemy.ext.automap import automap_base
# import psycopg2

# app = Flask(__name__)
# # engine=create_engine('sqlite:///database.db', echo=True)
# engine=create_engine('postgresql://postgres:postgres@localhost:5432/database')


# # Reflect an existing database into a new model
# Base = automap_base()
# # Reflect the tables
# # Base.prepare(engine, reflect=True)
# Base.prepare(engine)

# # Base.prepare(engine, autoload_with=engine)


# @app.route("/")
# def home():
#     # https://flask.palletsprojects.com/en/3.0.x/quickstart/#rendering-templates
#     return render_template('index.html')

# @app.route('/data')
# def get_data(): 
#     query=text('''
#                SELECT * 
#                FROM survey_2018
#                ''')
#     conn=engine.connect()
#     results=conn.execute(query)
#     conn.close()
#     results=[tuple(row[1:]) for row in results]
#     return jsonify(results)
# @app.route('/data2')
# def get_data2(): 
#     query=text('''
#             SELECT * 
#             FROM survey_2019
#             ''')
#     conn=engine.connect()
#     results=conn.execute(query)
#     conn.close()
#     results=[tuple(row[1:]) for row in results]
#     return jsonify(results)

# @app.route('/data3')
# def get_data3(): 
#     query=text('''
#             SELECT * 
#             FROM survey_2022
#             ''')
#     conn=engine.connect()
#     results=conn.execute(query)
#     conn.close()
#     results=[tuple(row[1:]) for row in results]
#     return jsonify(results)

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine
from config import db_config

app = Flask(__name__)


# =====================
# getting the data-----Create the database engine
# =====================


db_config = {
    'user': 'postgres',
    'password': 'postgres',
    'host': 'localhost',
    'port': '5432',
    'database': 'asthma_db'
}


engine = create_engine(f"postgresql+psycopg2://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}")


# =====================
# route
# =====================

@app.route('/')
def survey_default():
    try:
        # write all the code here for the chart
        return render_template('index.html')

    except Exception as e:
        print(e)
        return "An error occurred while retrieving survey data."

@app.route('/survey_data')
def get_data():
    try:
        with engine.connect() as connection:
            result1 = connection.execute("SELECT * FROM survey_2018_data") 
            result2 = connection.execute("SELECT * FROM survey_2019_data") 
            result3 = connection.execute("SELECT * FROM survey_2022_data") 
            survey_data1 = result1.fetchall()
            survey_data2 = result2.fetchall()
            survey_data3 = result3.fetchall()

        # Combine all survey data into a single list
        all_asthma_data = [survey_data1, survey_data2, survey_data3]

        # Render the HTML template with survey data
        return jsonify(all_asthma_data)

    except Exception as e:
        print(e)
        return "An error occurred while retrieving survey data."

if __name__ == '__main__':
    app.run(debug=True)
