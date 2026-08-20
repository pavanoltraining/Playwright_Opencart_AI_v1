# =============================================================================
# Dockerfile — Playwright + TypeScript Automation Framework
# =============================================================================
# Base image with Playwright v1.62.0, Node.js, and system dependencies
FROM mcr.microsoft.com/playwright:v1.62.0-noble

# Set working directory
WORKDIR /app

# Copy dependency manifests first (leverages Docker layer caching)
COPY package*.json ./

# Install project dependencies (clean install — respects package-lock.json)
RUN npm ci

# Copy the rest of the project source
COPY . .

# Create output directories for reports and test artifacts
RUN mkdir -p /app/reports /app/custom-report /app/allure-results /app/allure-report /app/test-results

# Enable CI mode — Playwright config uses this to adjust retries, workers, headless
ENV CI=true

# Point to the Playwright browsers bundled in the base image
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Make the entrypoint script executable
RUN chmod +x /app/docker-entrypoint.sh

# Use the entrypoint so the suite name argument is handled automatically
ENTRYPOINT ["/app/docker-entrypoint.sh"]

# Default: run all tests
CMD ["all"]