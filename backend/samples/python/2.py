import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Generate grid data
x = np.linspace(-5, 5, 100)
y = np.linspace(-5, 5, 100)
x, y = np.meshgrid(x, y)

# Define a simple cost function f(x, y) = x^2 + y^2
z = x**2 + y**2  # This is our "cost function" (a simple paraboloid)

# Create the 3D plot
fig = plt.figure(figsize=(10, 6))
ax = fig.add_subplot(111, projection='3d')

# Plot the surface
ax.plot_surface(x, y, z, cmap='viridis', edgecolor='none')

# Add labels and title
ax.set_title('3D Surface Plot of a Cost Function (f(x, y) = x^2 + y^2)')
ax.set_xlabel('X-axis')
ax.set_ylabel('Y-axis')
ax.set_zlabel('Z-axis (Cost)')

# Display the plot
plt.show()