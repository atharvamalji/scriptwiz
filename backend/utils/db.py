import sqlite3

# Function to create the database and table if it doesn't exist
def create_database():
    conn = sqlite3.connect('plots.db')  # Connect to (or create) the SQLite database
    c = conn.cursor()

    c.execute('''
        CREATE TABLE IF NOT EXISTS plot_details (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT NOT NULL,
            language TEXT NOT NULL,
            library TEXT NOT NULL,
            html_path TEXT NULL,
            png_path TEXT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()
    conn.close()

# Function to save plot details to the database
def save_plot_details_to_db(user, language, library, html_path, png_path):
    conn = sqlite3.connect('plots.db')  # Connect to the SQLite database
    c = conn.cursor()

    c.execute('''
        INSERT INTO plot_details (user, language, library, html_path, png_path)
        VALUES (?, ?, ?, ?, ?)
    ''', (user, language, library, html_path, png_path))

    conn.commit()
    conn.close()

# Function to fetch all plot details (example query)
def get_plot_details():
    conn = sqlite3.connect('plots.db')
    c = conn.cursor()

    c.execute("SELECT * FROM plot_details")
    rows = c.fetchall()

    conn.close()
    return rows

# Function to fetch plot details for a specific user
def get_plot_details_by_user(user):
    # Connect to the SQLite database
    conn = sqlite3.connect('plots.db')
    c = conn.cursor()

    # Query the database for plots belonging to the specified user
    c.execute("SELECT * FROM plot_details WHERE user = ?", (user,))
    rows = c.fetchall()

    # Close the connection
    conn.close()
    
    # Return the results
    return rows
