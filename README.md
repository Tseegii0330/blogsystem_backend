# blogsystem_backend

A Node.js backend for a blog system using Express, PostgreSQL, and ES modules.

## Features

- User registration and login
- User listing
- JWT authentication
- Input validation
- PostgreSQL database

## Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL

## Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd blogsystem_backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory with the following:

   ```env
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_HOST=localhost
   DB_NAME=your_db_name
   DB_PORT=5432
   TOKEN_KEY=your_jwt_secret
   ```

4. **Start the server:**
   ```bash
   npm run dev
   # or
   npm start
   ```
   The server will run on [http://localhost:3001](http://localhost:3001) by default.

## API Endpoints

All endpoints are prefixed with `/api`.

### Register a User

- **POST** `/api/signup`
- **Body:**
  ```json
  {
    "name": "Your Name",
    "email": "your@email.com",
    "password": "yourpassword",
    "role": "reader"
  }
  ```

### Login

- **POST** `/api/login`
- **Body:**
  ```json
  {
    "email": "your@email.com",
    "password": "yourpassword"
  }
  ```

### List Users

- **GET** `/api/users`

## Development

- Use `npm run dev` to start the server with nodemon for auto-reloading.
- All code uses ES module syntax (`import`/`export`).

## License

ISC
