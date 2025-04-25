FROM mcr.microsoft.com/playwright:v1.51.1-noble

# Set working directory
WORKDIR /app

# Copy package files and configs
COPY package*.json ./
COPY playwright.config.ts ./
COPY tsconfig.json ./
COPY .env.example ./.env

# Copy source and test files
COPY pages/ ./pages/
COPY utils/ ./utils/
COPY tests/ ./tests/
COPY config/ ./config/

# Install dependencies
RUN npm ci

# Run tests
CMD ["npx", "playwright", "test"]