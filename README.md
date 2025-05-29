# blogsystem_backend

Энэхүү систем нь Node.js, Express, PostgreSQL, and ES modules ашиглан хийсэн жижиг влог систем юм.

## Features

- Хэрэглэгч нэвтрэх, бүртгүүлэх болон нууц үг сэргээх
- Хэрэглэгчийн мэдээллүүд
- JWT authentication
- Input validation
- PostgreSQL database

## Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Tseegii0330/blogsystem_backend.git
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
   npm run dev -- хөгжүүлэлтийн орчинд nodemon ашиглан асаана
   # or
   npm start
   ```
   local орчинд асаавал [http://localhost:3001](http://localhost:3001) тус утгатай асна. .

## API Endpoints

Бүх endpoint-ууд урдаа `/api` гэсэн бичиглэл авана.

### Register a User

- **POST** `/api/signup`
- **Body:**
  ```json
  Хэрэглэгч шинээр бүртгүүлэхэд хэрэглэгчийн role нь default утга нь reader байна.
  {
    "name": "Your Name",
    "email": "your@email.com",
    "password": "yourpassword",
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
