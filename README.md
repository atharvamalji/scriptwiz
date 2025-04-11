Sure! Here’s an updated version of the README with emojis to make it more engaging and fun:

---

# **Scriptwiz - README** 🚀

**Scriptwiz** is an innovative web application that enables users to write, execute, and visualize their code directly from the browser. With an intuitive user interface and seamless backend architecture, Scriptwiz supports both Python and R code execution inside isolated Docker containers to generate static or dynamic visualizations.

## **Table of Contents** 📚

- [Project Overview](#project-overview)
- [Frontend](#frontend)
- [Backend](#backend)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## **Project Overview** 🖥️

Scriptwiz provides a Visual Studio Code-style IDE where users can write their code in Python or R, select the desired library, and submit the code to be executed in a secure, isolated environment. The generated visualization (whether static or dynamic) is then sent back to the frontend for the user to view directly in the web application.

The application uses a clean separation of frontend and backend services, and code execution is performed inside Docker containers to ensure security and environment consistency.

## **Frontend** 🎨

The frontend of Scriptwiz is built using **React** and **Next.js**, providing an interactive and responsive user interface. It allows users to:

- Write code inside an editor that mimics **Visual Studio Code**.
- Select the programming language (Python or R) and corresponding library for data visualization.
- Submit the code for execution and view the generated output directly in the web app.

### Key Features ✨:
- **IDE-style Editor**: Users can write and edit code in a familiar environment with syntax highlighting and support for Python and R.  
- **Visualization Display**: Once the code is executed, the generated static or dynamic visualization is displayed right in the web app.  
- **Dynamic Interaction**: Real-time updates and interaction with the generated visualizations.  

## **Backend** ⚙️

The backend is powered by **Flask** and is responsible for orchestrating the execution of user-submitted code inside isolated Docker containers. The backend services include:

- **Dockerized Execution**: Python and R code execution happens inside two separate Docker containers to ensure security and environment isolation.  
- **Code Handling**: When users submit their code, the backend adds the necessary lines to save the generated visualization (e.g., `plt` for Python's Matplotlib) and then runs the code inside the appropriate Docker container.  
- **Result Retrieval**: The backend retrieves the generated output (visualization) and sends it back to the frontend for display.  

### Key Features ⚡:
- **Docker Containers**: Two isolated Docker containers are used — one for Python and one for R code execution.  
- **Safe Execution**: User code is executed in a controlled environment, ensuring that the backend remains secure.  
- **Result Handling**: The backend ensures that the output of the code (e.g., plots or graphs) is properly captured and returned to the frontend.

## **How It Works** 🔄

1. **Code Submission**: The user writes their code in the frontend editor, selects the language (Python or R), and submits the code.  
2. **Code Adjustment**: The backend receives the code, appends a line to save the plot (e.g., for Python's Matplotlib, the plot must be named `plt`), and prepares the code for execution.  
3. **Execution in Docker**: The code is executed inside the appropriate Docker container (Python or R) to maintain isolation.  
4. **Output Capture**: Once the code has finished running, the generated visualization is captured and sent back to the frontend.  
5. **Visualization Display**: The frontend displays the visualization to the user, whether it's a static image or an interactive plot.

### Example Code Adjustment ✏️:
For Python's Matplotlib, users are prompted to ensure the plot is named `plt` in the code. The backend automatically appends a line to save the plot to an image file.

## **Getting Started** 🏁

To run Scriptwiz locally, follow these steps:

### Prerequisites 📥:
- Docker 🐋
- Node.js (for frontend) ⚛️
- Python 3.8+ (for backend) 🐍

### Steps 🛠️:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/scriptwiz.git
   cd scriptwiz
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Start Docker Containers**:
   ```bash
   docker-compose up --build
   ```

5. **Access the Application** 🌐:
   - Frontend: [http://localhost:3000](http://localhost:3000)  
   - Backend: [http://localhost:5000](http://localhost:5000)  

## **Technologies Used** 🛠️

### **Frontend**:
- React ⚛️
- Next.js 📦
- Docker (for frontend containerization) 🐋

### **Backend**:
- Python (Flask) 🐍
- Docker (for isolated execution of code) 🐋
- Matplotlib (for Python visualizations) 📊
- R (for R visualizations) 📉

### **Other**:
- Docker Compose (for managing multiple containers) 🔄

## **Contributing** 🤝

We welcome contributions from the community! To contribute:

1. Fork the repository 🍴
2. Create a feature branch (`git checkout -b feature/your-feature`) 🌱
3. Commit your changes (`git commit -am 'Add new feature'`) ✏️
4. Push to the branch (`git push origin feature/your-feature`) 🚀
5. Create a new Pull Request 🔃

Please ensure your code adheres to the project's style guide and passes all tests before submitting a pull request.

## **License** 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
