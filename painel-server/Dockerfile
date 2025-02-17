# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/main

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copiar apenas os esquemas do Prisma antes da geração
COPY prisma ./prisma

# Gerar os arquivos do Prisma Client
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]