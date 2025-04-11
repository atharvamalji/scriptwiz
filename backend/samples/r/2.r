# Load the ggplot2 library
library(ggplot2)

# Create a simple scatter plot using the mtcars dataset
plot <- ggplot(mtcars, aes(x = mpg, y = hp)) +
  geom_point() +  # Add points to the plot
  labs(title = "Scatter Plot of MPG vs Horsepower",  # Add title
       x = "Miles per Gallon",  # Label for x-axis
       y = "Horsepower") +  # Label for y-axis
  theme_minimal()