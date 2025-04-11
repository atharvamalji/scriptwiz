# Use the official R base image (Debian-based)
FROM rocker/r-ver:4.2.2

# Set the working directory in the container
WORKDIR /app

# Install necessary system dependencies, including Pandoc
RUN apt-get update && apt-get install -y \
    build-essential \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    pandoc \
    && rm -rf /var/lib/apt/lists/*

# Install R packages
RUN R -e "install.packages('plotly')"
RUN R -e "install.packages('ggplot2')"
RUN R -e "install.packages('htmlwidgets')"

# Set the default command to run R when the container starts
CMD ["R"]
