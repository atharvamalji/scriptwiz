import os
import subprocess
import tempfile
import shutil
import time
import uuid
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import shutil

app = Flask(__name__)
CORS(app, origins=["*"])


from utils.db import save_plot_details_to_db, create_database, get_plot_details_by_user

# Define directories to store output files
OUTPUT_DIR = os.path.join(app.root_path, 'output')
NEXTJS_DIR = os.path.join('../frontend/public/visualizations')
os.makedirs(OUTPUT_DIR, exist_ok=True)

create_database()

@app.route('/generate_matplotlib_plot', methods=['POST'])
def generate_matplotlib_plot():
    try:
        code = request.json.get('code', '')
        user = request.json.get('user', '')
        language = request.json.get('language', '')
        library = request.json.get('library', '')
    
        if not code:
            return jsonify({"error": "No Python code provided"}), 400
        
        # Define the output image file path inside the container
        output_filename = str(uuid.uuid4()) + '.png'
        output_image = os.path.join(OUTPUT_DIR, output_filename)
        nextjs_image = os.path.join(NEXTJS_DIR, output_filename)

        # Append code to save the plot
        save_plot_code = f"\nplt.savefig('/output/{output_filename}')"
        complete_code = code + save_plot_code

        # Create a temporary file to store the Python code in the Docker container
        temp_code_file = tempfile.NamedTemporaryFile(delete=False, suffix='.py')
        temp_code_file.write(complete_code.encode())
        temp_code_file.close()

        # Run the Python code inside the Docker container
        command = [
            "docker", "run", "--rm",
            "-v", f"{OUTPUT_DIR}:/output",  # Mount the output folder to the container
            "-v", f"{temp_code_file.name}:/app/code.py",  # Mount the Python code file
            "python-visualization",  # Use Python 3.9 base image
            "python", "/app/code.py"  # Run the Python code inside the container
        ]

        try:
            subprocess.run(command, check=True)
        except subprocess.CalledProcessError as e:
            return jsonify({"error": f"Command failed with error: {e.stdout}"}), 500
        except Exception as e:
             return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
            
        # Copy the file
        try:
            shutil.copy(output_image, nextjs_image)
            print(f"File copied successfully from {output_image} to {nextjs_image}")
        except FileNotFoundError:
            print(f"Source file {output_image} not found")
        except PermissionError:
            print(f"Permission denied for copying the file to {nextjs_image}")
        except Exception as e:
            print(f"Error occurred: {e}")

        save_plot_details_to_db(user, language, library, None, f"/visualizations/{output_filename}")
        return jsonify({"message": "Plot generated successfully", "path": f"/visualizations/{output_filename}", "type": "img"}), 200
        

    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Error executing code: {str(e)}"}), 500
    finally:
        # Clean up the temporary code file
        os.remove(temp_code_file.name)

@app.route('/generate_plotly_plot', methods=['POST'])
def generate_plotly_plot():
    try:
        code = request.json.get('code', '')
        user = request.json.get('user', '')
        language = request.json.get('language', '')
        library = request.json.get('library', '')

        if not code:
            return jsonify({"error": "No Python code provided"}), 400
        
        # Define the output HTML file path inside the container
        output_filename = str(uuid.uuid4()) + '.html'
        output_html = os.path.join(OUTPUT_DIR, output_filename)
        nextjs_html = os.path.join(NEXTJS_DIR, output_filename)

        # Append code to save the plot as an HTML file using Plotly or Matplotlib
        save_html_code = f"\nimport plotly.io as pio\npio.write_html(fig, '/output/{output_filename}')"
        complete_code = code + save_html_code

        # Create a temporary file to store the Python code in the Docker container
        temp_code_file = tempfile.NamedTemporaryFile(delete=False, suffix='.py')
        temp_code_file.write(complete_code.encode())
        temp_code_file.close()

        # Run the Python code inside the Docker container
        command = [
            "docker", "run", "--rm",
            "-v", f"{OUTPUT_DIR}:/output",  # Mount the output folder to the container
            "-v", f"{temp_code_file.name}:/app/code.py",  # Mount the Python code file
            "python-visualization",  # Use Python 3.9 base image
            "python", "/app/code.py"  # Run the Python code inside the container
        ]

        try:
            subprocess.run(command, check=True)
        except subprocess.CalledProcessError as e:
            return jsonify({"error": f"Command failed with error: {e.stderr}"}), 500
        except Exception as e:
            return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
            
        # Copy the file to Next.js directory
        try:
            shutil.copy(output_html, nextjs_html)
            print(f"File copied successfully from {output_html} to {nextjs_html}")
        except FileNotFoundError:
            print(f"Source file {output_html} not found")
        except PermissionError:
            print(f"Permission denied for copying the file to {nextjs_html}")
        except Exception as e:
            print(f"Error occurred: {e}")
        
        save_plot_details_to_db(user, language, library, None, f"/visualizations/{output_filename}")
        return jsonify({"message": "Plot generated successfully", "path": f"/visualizations/{output_filename}", "type": "html"}), 200

    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Error executing code: {str(e)}"}), 500
    finally:
        # Clean up the temporary code file
        os.remove(temp_code_file.name)

@app.route('/generate_r_plot', methods=['POST'])
def generate_r_plot():
    try:
        # Get the R code from the request
        code = request.json.get('code', '')
        user = request.json.get('user', '')
        language = request.json.get('language', '')
        library = request.json.get('library', '')

        if not code:
            return jsonify({"error": "No R code provided"}), 400
        
        # Define the output HTML file path inside the container
        output_filename = str(uuid.uuid4()) + '.html'
        output_html = os.path.join(OUTPUT_DIR, output_filename)
        nextjs_html = os.path.join(NEXTJS_DIR, output_filename)

        # Append code to save the plot as an HTML file using plotly or ggplot2
        save_html_code = f"\nlibrary(plotly)\nlibrary(htmlwidgets)\nhtmlwidgets::saveWidget(fig, '/output/{output_filename}')"
        complete_code = code + save_html_code

        # Create a temporary file to store the R code in the Docker container
        temp_code_file = tempfile.NamedTemporaryFile(delete=False, suffix='.R')
        temp_code_file.write(complete_code.encode())
        temp_code_file.close()

        # Run the R code inside the Docker container
        command = [
            "docker", "run", "--rm",
            "-v", f"{OUTPUT_DIR}:/output",  # Mount the output folder to the container
            "-v", f"{temp_code_file.name}:/app/code.R",  # Mount the R code file
            "r-visualization",  # Use the custom R visualization image
            "Rscript", "/app/code.R"  # Run the R script inside the container
        ]

        try:
            subprocess.run(command, check=True)
        except subprocess.CalledProcessError as e:
            return jsonify({"error": f"Command failed with error: {e.stderr}"}), 500
        except Exception as e:
            return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
        
        # Copy the file to Next.js directory
        try:
            shutil.copy(output_html, nextjs_html)
            print(f"File copied successfully from {output_html} to {nextjs_html}")
        except FileNotFoundError:
            print(f"Source file {output_html} not found")
        except PermissionError:
            print(f"Permission denied for copying the file to {nextjs_html}")
        except Exception as e:
            print(f"Error occurred: {e}")
        
        save_plot_details_to_db(user, language, library, None, f"/visualizations/{output_filename}")

        return jsonify({"message": "Plot generated successfully", "path": f"/visualizations/{output_filename}", "type": "html"}), 200

    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Error executing R code: {str(e)}"}), 500
    finally:
        # Clean up the temporary code file
        os.remove(temp_code_file.name)

@app.route('/generate_r_ggplot', methods=['POST'])
def generate_r_ggplot():
    try:
        # Get the R code from the request
        code = request.json.get('code', '')
        user = request.json.get('user', '')
        language = request.json.get('language', '')
        library = request.json.get('library', '')
    
        if not code:
            return jsonify({"error": "No R code provided"}), 400
                
        output_filename_png = str(uuid.uuid4()) + '.png'
        output_png = os.path.join(OUTPUT_DIR, output_filename_png)
        nextjs_png = os.path.join(NEXTJS_DIR, output_filename_png)
        
        # Append the ggsave() line to save the plot as a PNG
        save_png_code = f"\nggsave('/output/{output_filename_png}', plot = plot, width = 8, height = 6, dpi = 300)"
        
        # Combine the original code with the saving instructions
        complete_code = code + save_png_code

        # Create a temporary file to store the R code in the Docker container
        temp_code_file = tempfile.NamedTemporaryFile(delete=False, suffix='.R')
        temp_code_file.write(complete_code.encode())
        temp_code_file.close()

        # Run the R code inside the Docker container
        command = [
            "docker", "run", "--rm",
            "-v", f"{OUTPUT_DIR}:/output",  # Mount the output folder to the container
            "-v", f"{temp_code_file.name}:/app/code.R",  # Mount the R code file
            "r-visualization",  # Use the custom R visualization image
            "Rscript", "/app/code.R"  # Run the R script inside the container
        ]

        try:
            subprocess.run(command, check=True)
        except subprocess.CalledProcessError as e:
            return jsonify({"error": f"Command failed with error: {e.stderr}"}), 500
        except Exception as e:
            return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
        
        # Copy the generated files to the Next.js directory
        try:
            shutil.copy(output_png, nextjs_png)
            print(f"Files copied successfully: {output_png} to {nextjs_png}")
        except FileNotFoundError:
            print(f"Source file(s) not found")
        except PermissionError:
            print(f"Permission denied for copying the files")
        except Exception as e:
            print(f"Error occurred: {e}")

        save_plot_details_to_db(user, language, library, None, f"/visualizations/{output_filename_png}")
        
        return jsonify({
            "message": "Plot generated successfully",
            "path": f"/visualizations/{output_filename_png}",
            "type": "img"
        }), 200
    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Error executing R code: {str(e)}"}), 500
    finally:
        # Clean up the temporary code file
        os.remove(temp_code_file.name)

@app.route('/get_visualizations', methods=['GET'])
def get_visualizations():
    # Get the user from the query parameter
    user = request.args.get('user', None)
    
    # Check if the user parameter is provided
    if not user:
        return jsonify({"error": "User parameter is required"}), 400

    # Fetch plot details for the user from the database
    plot_details = get_plot_details_by_user(user)
    
    # Check if any plot details are found for the user
    if not plot_details:
        return jsonify({"message": f"No visualizations found for user {user}"}), 200

    # Columns based on the Visualization schema
    columns = [
        "id", "user", "language", "library", "html_path", "png_path", "timestamp"
    ]

    # Convert the result into a list of dictionaries (key-value pairs)
    plot_details_dict = [
        {column: record[idx] for idx, column in enumerate(columns)} 
        for record in plot_details
    ]

    # Return the plot details in JSON format with the visualizations as key-value pairs
    return jsonify({
        "message": f"Visualizations for user {user}",
        "visualizations": plot_details_dict
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
