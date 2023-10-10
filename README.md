[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# PeerPrep Setup Guide

This guide will walk you through the steps to set up the application on your local machine.

## Prerequisites
Before you begin, make sure you have the following installed on your system:
- Node.js (https://nodejs.org/)
- Npm (Node Package Manager)

## Frontend Setup
1. Navigate to the **/frontend** folder in the project directory.
2. Run the following commands to install the required dependencies and start the application:
```
npm install
npm start
```
This will start the frontend server, and you can access the application in your web browser at http://localhost:3000

## Backend Setup

### Question Service
1. Navigate to the **/backend/question-service** folder
2. Create a **'.env'** file in this directory with the following key-value pairs:
```
MONGODB_URL=""
JWT_SECRET_KEY=""
```
You can find the necessary values in the private folder submitted on canvas, titled **questionService.env**.

3. Run the following commands to install the required dependencies and start the Question Service:
```
npm install
npm run start-dev
```

### User Service
1. Navigate to the **/backend/user-service** folder
2. Create a **'.env'** file in this directory with the following key-value pairs:
```
DB="CS3219"
DB_USERNAME="your_local_db_username"
DB_PASSWORD="your_db_password"
DB_DIALECT="postgres"
JWT_SECRET_KEY=""
```
Create a database called **CS3219** and replace **your_local_db_username** with your own database username, and **your_db_password** with your own database password. The JWT_SECRET_KEY can be found in the private folder submitted on canvas, titled **userService.env**

3. Run the following commands to install the required dependencies and start the User Service
```
npm install
npm run start-dev
```

### Collaboration Service and Matching Service
1. For both the **/backend/collaboration-service** and **/backend/matching-service** folders, follow the same steps as described in the "User service" section above, create a **'.env'** file with the exact same .env file as user service, and starting the respective services.

## Alternative setup with Docker
This alternative setup utilizes Docker to simplify the deployment process of PeerPrep application. Before you begin, ensure that you have the following prerequisites installed on your system:
- Node.js (https://nodejs.org/)
- Npm (Node Package Manager)
- Docker (https://www.docker.com/)

### Using Docker Compose
Every service, including the frontend, has a Dockerfile that defines how a container is built. At the root of the project folder, you will find a **docker-compose.yml** file that can be used to build and run all containers, and stop them together.

To use Docker Compose for setup:
1. Navigate to the root folder of the project where the **docker-compose.yml** file is located.
2. Run the following command to build and start all containers
```
docker-compose up
```
This command will create and start containers for the frontend, matching service, question service, user service, and collaboration service. The application will be accessible in your web browser at http://localhost:3000.

3. To stop all containers and services, use the following command:
```
docker-compose down
```

This alternative setup simplifies the deployment process by using Docker and Docker Compose to manage containers for each service. It provides an efficient way to run the PeerPrep application locally.
