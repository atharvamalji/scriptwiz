import plotly.graph_objects as go
import numpy as np

# Create a meshgrid for x and y values
x = np.linspace(-5, 5, 100)
y = np.linspace(-5, 5, 100)
x, y = np.meshgrid(x, y)

# Define the cost function (f(x, y) = x^2 + y^2)
z = x**2 + y**2

# Create the surface plot using Plotly
fig = go.Figure(data=[go.Surface(z=z, x=x, y=y)])

# Update the layout of the plot for better visualization
fig.update_layout(
    title='3D Surface Plot of a Cost Function (f(x, y) = x^2 + y^2)',
    scene=dict(
        xaxis_title='X Axis',
        yaxis_title='Y Axis',
        zaxis_title='Cost (f(x, y))'
    ),
    autosize=True,
    margin=dict(l=0, r=0, b=0, t=40)
)

# Save the figure as an HTML file
fig.write_html("interactive_3d_plot.html")
