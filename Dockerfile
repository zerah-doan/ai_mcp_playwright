FROM mcr.microsoft.com/playwright:v1.51.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY playwright.config.ts ./
COPY tsconfig.json ./
COPY .env.example ./.env

# Copy test files
COPY tests/ ./tests/
COPY config/ ./config/

# Install dependencies
RUN npm ci

# Run tests
CMD ["npx", "playwright", "test"]