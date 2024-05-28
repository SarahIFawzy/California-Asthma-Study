from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine, text


app = Flask(__name__)


# =====================
# getting the data-----Create the database engine
# =====================


db_config = {
    'user': 'postgres',
    'password': 'postgres',
    'host': 'localhost',
    'port': '5432',
    'database': 'database'
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

@app.route('/data')
def get_data():
    try:
    
        with engine.connect() as connection:
            result1 = connection.execute(text("SELECT * FROM survey_2018_data"))
            result2 = connection.execute(text("SELECT * FROM survey_2019_data"))
            result3 = connection.execute(text("SELECT * FROM survey_2022_data"))
            survey_data1 = result1.fetchall()
            survey_data2 = result2.fetchall()
            survey_data3 = result3.fetchall()

        all_asthma_data = {
        "survey_2018": [dict(zip(result1.keys(), row)) for row in survey_data1],
        "survey_2019": [dict(zip(result2.keys(), row)) for row in survey_data2],
        "survey_2022": [dict(zip(result3.keys(), row)) for row in survey_data3]
    }

        # Render the HTML template with survey data
        return jsonify(all_asthma_data)

    except Exception as e:
        print(e)
        return "An error occurred while retrieving survey data."

if __name__ == '__main__':
    app.run(debug=True)
