# real-time-chat-nosql
A real-time chat application utilizing Redis for instant messaging and MongoDB for persistent storage, demonstrating the integration of NoSQL databases in scalable communication systems.

## Setup and Running the Application

### Prerequisites

- Docker
- Docker Compose

### Steps to Run

1. Clone the repository:
   ```
   git clone https://github.com/Louis-Chang/real-time-chat-nosql.git
   cd real-time-chat-nosql
   ```

2. Build and start the Docker containers:
   ```
   docker-compose up --build
   ```

   This command will:
   - Build the Docker images for the backend, frontend, MongoDB, and Redis
   - Start all the services defined in the docker-compose.yml file

3. Access the application:
   - Frontend: Open your browser and navigate to `http://localhost:3000`
   - Backend API: Available at `http://localhost:8080`

4. To stop the application:
   ```
   docker-compose down
   ```

### Development

For development purposes, you can run the frontend and backend separately:

1. Frontend:
   ```
   cd src/frontend/chat-app
   npm install
   npm start
   ```

2. Backend:
   ```
   cd src/backend
   npm install
   npm run dev
   ```

Make sure you have MongoDB and Redis running locally or update the connection strings in the backend configuration.

