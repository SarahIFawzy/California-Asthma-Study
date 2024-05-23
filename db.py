from sqlalchemy import create_engine
import pandas as pd
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Database connection details
admin_db_config = {
    'dbname': 'postgres',  # Connect to the default postgres database to create the new database
    'user': 'postgres',
    'password': 'postgres',
    'host': 'localhost',
    'port': '5432'
}

# Connect to the default database to create a new database
conn = psycopg2.connect(**admin_db_config)
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cur = conn.cursor()

# Create the new database
cur.execute('CREATE DATABASE "database"')  # Make sure to use double quotes if your database name is case-sensitive

# Close the cursor and connection
cur.close()
conn.close()
File paths
files = ['survey_2018_data.csv', 'survey_2019_data.csv', 'survey_2022_data.csv']

# Database connection details
db_config = {
    'dbname': 'database',
    'user': 'postgres',
    'password': 'postgres',
    'host': 'localhost',
    'port': '5432'
}

# Connect to PostgreSQL database using SQLAlchemy
engine = create_engine(f"postgresql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['dbname']}")
conn = psycopg2.connect(**db_config)
cur = conn.cursor()

# Table creation query template
table_creation_query = '''
CREATE TABLE IF NOT EXISTS survey_{year} (
    "Total Population" INT,  -- Enclose column name in double quotes
    "California County" VARCHAR(255),
    ZIP VARCHAR(10),
    Longitude DOUBLE PRECISION,
    Latitude DOUBLE PRECISION,
    "Ozone Pctl" NUMERIC(5, 2),
    "PM2.5 Pctl" NUMERIC(5, 2),
    "Diesel PM Pctl" NUMERIC(5, 2),
    "Pesticides Pctl" NUMERIC(5, 2),
    "Traffic Pctl" NUMERIC(5, 2),
    "Asthma Pctl" NUMERIC(5, 2),
    "Poverty Pctl" NUMERIC(5, 2),
    "Cardiovascular Disease Pctl" NUMERIC(5, 2)
)
'''

# Create tables for each year
for year in ['2018', '2019', '2022']:
    cur.execute(table_creation_query.format(year=year))

# Load and insert data from CSV files
for file in files:
    year = file.split('_')[1]
    df = pd.read_csv(file)

    # Prepare data for insertion
    data_to_insert = [
        (
            row['Total Population'],
            row['California County'],
            row['ZIP'],
            row['Longitude'],
            row['Latitude'],
            row['Ozone Pctl'],
            row['PM2.5 Pctl'],
            row['Diesel PM Pctl'],
            row['Pesticides Pctl'],
            row['Traffic Pctl'],
            row['Asthma Pctl'],
            row['Poverty Pctl'],
            row['Cardiovascular Disease Pctl']
        )
        for _, row in df.iterrows()
    ]

    # Insert data using executemany for better performance
    insert_query = f'''
   INSERT INTO survey_{year} (
    "Total Population",  -- Enclose column name in double quotes
    "California County",
    ZIP,
    Longitude,
    Latitude,
    "Ozone Pctl",
    "PM2.5 Pctl",
    "Diesel PM Pctl",
    "Pesticides Pctl",
    "Traffic Pctl",
    "Asthma Pctl",
    "Poverty Pctl",
    "Cardiovascular Disease Pctl"
) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
'''
    cur.executemany(insert_query, data_to_insert)

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

