import matplotlib.pyplot as plt
import numpy as np

# Generate a large dataset
months = np.array(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
sales = np.random.randint(50, 100, size=12)  # Random sales data
expenses = np.random.randint(30, 60, size=12)  # Random expenses data
profits = sales - expenses  # Profits = Sales - Expenses

# Create a figure and axis
plt.figure(figsize=(10, 6))

# Plotting each data series
plt.plot(months, sales, label="Sales", marker='o', linestyle='-', color='blue', linewidth=2)
plt.plot(months, expenses, label="Expenses", marker='s', linestyle='--', color='red', linewidth=2)
plt.plot(months, profits, label="Profits", marker='^', linestyle='-.', color='green', linewidth=2)

# Adding titles and labels
plt.title("Company Performance: Sales, Expenses, and Profits Over Time", fontsize=16)
plt.xlabel("Months", fontsize=12)
plt.ylabel("Amount in $", fontsize=12)

# Adding a grid for better readability
plt.grid(True, which='both', linestyle='--', linewidth=0.5)

# Annotating a point (for example, highest sales in June)
max_sales_idx = np.argmax(sales)
plt.annotate(f"Highest Sales: {sales[max_sales_idx]}", 
             xy=(months[max_sales_idx], sales[max_sales_idx]), 
             xytext=(months[max_sales_idx], sales[max_sales_idx] + 5),
             arrowprops=dict(facecolor='black', arrowstyle="->"), fontsize=10)

# Add a legend
plt.legend(title="Categories", fontsize=10)

# Display the chart
plt.tight_layout()
plt.show()
