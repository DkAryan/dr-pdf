# Base image Node.js
FROM node:18

# Ghostscript install karne ka command
RUN apt-get update && apt-get install -y ghostscript

# Working directory set karein
WORKDIR /app

# Dependencies install karein
COPY package*.json ./
RUN npm install

# Baaki code copy karein aur build karein
COPY . .
RUN npm run build

# Port expose karein
EXPOSE 3000

# App start karein
CMD ["npm", "start"]