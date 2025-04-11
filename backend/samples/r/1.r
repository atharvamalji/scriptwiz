library(plotly)

# Create a grid of x and y values
x <- seq(-5, 5, length.out = 50)
y <- seq(-5, 5, length.out = 50)

# Create a meshgrid (grid of x, y, and corresponding z values)
z <- outer(x, y, function(x, y) x^2 + y^2)  # Example equation for a 3D plane (x^2 + y^2)

# Create a 3D surface plot
fig <- plot_ly(x = ~x, y = ~y, z = ~z, type = 'surface')