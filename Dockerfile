# --- Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json* ./

# Install deps
RUN npm install

# Copy the rest of your code
COPY . .

# Build the Vite app
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies if needed (optional)
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copy the built app from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the port vite preview serves on
EXPOSE 4173

# Run with vite preview
CMD ["npx", "vite", "preview", "--port", "4173", "--host"]
