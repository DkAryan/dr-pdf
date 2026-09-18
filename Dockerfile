# Base image ko Node 20 par update karein
FROM node:20-alpine

# Ghostscript install karein (Alpine Linux ke liye apk use hota hai)
RUN apk update && apk add --no-cache ghostscript

# Working directory set karein
WORKDIR /app

# Dependencies install karne ke liye package files copy karein
COPY package*.json ./
RUN npm install

# Baaki saara code copy karein aur build karein
COPY . .
RUN npm run build

# Port expose karein
EXPOSE 3000

# App start karein
CMD ["npm", "start"]