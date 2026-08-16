# CodeAlphaIntern URL Shortener API

A production-ready URL Shortener REST API built with **Node.js, Express.js, Prisma, and PostgreSQL**.

The application allows users to create shortened URLs, retrieve URL information, track clicks, view URL statistics, update URLs, delete URLs, and redirect users through their generated short codes.

## Live API

**Production URL:**

https://codealphainternurlshortener-production.up.railway.app

## Features

* Create shortened URLs
* Generate unique short codes
* Redirect shortened URLs to their original destination
* Track URL click counts
* Track the last accessed time
* Retrieve all shortened URLs
* Retrieve URL details by short code
* Retrieve URL statistics
* Update existing URLs
* Delete shortened URLs
* Request validation
* Centralized error handling
* Rate limiting
* HTTP security headers with Helmet
* CORS support
* PostgreSQL database
* Prisma ORM
* Docker support
* Automated production deployment with Railway
* Automated API testing with Vitest and Supertest

## Tech Stack

### Backend

* Node.js
* Express.js
* JavaScript (ES Modules)

### Database

* PostgreSQL
* Neon PostgreSQL
* Prisma ORM

### Testing

* Vitest
* Supertest

### Security & Middleware

* Helmet
* CORS
* Express Rate Limit
* Custom request validation
* Centralized error handling

### DevOps

* Docker
* Docker Compose
* Railway
* Git
* GitHub

## Project Structure

```text
CodeAlphaIntern_URLShortener/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   └── prisma.js
│   │
│   ├── controllers/
│   │
│   ├── errors/
│   │   ├── app.error.js
│   │   ├── conflict.error.js
│   │   ├── database.error.js
│   │   ├── not-found.error.js
│   │   └── validation.error.js
│   │
│   ├── middlewares/
│   │
│   ├── repositories/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── utils/
│   │   └── database-operation.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│
├── .dockerignore
├── .env
├── .env.test
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── prisma.config.ts
└── vitest.config.js
```

> The `generated/prisma` directory is generated automatically by Prisma and should not be committed to the repository.

## Installation

Clone the repository:

```bash
git clone https://github.com/alfinmuzakkiiman/CodeAlphaIntern_Backend.git
cd CodeAlphaIntern_Backend
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_postgresql_connection_string"
PORT=3000
```

For testing, configure the test database in `.env.test`.

> Never commit `.env` or database credentials to GitHub.

## Database

This project uses **PostgreSQL** with **Prisma ORM**.

The main database model is:

```text
Url
├── id
├── originalUrl
├── shortCode
├── clickCount
├── lastAccessedAt
├── createdAt
└── updatedAt
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

## Running Locally

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The API will run on:

```text
http://localhost:3000
```

## Docker

Build the Docker image:

```bash
docker build -t url-shortener-api .
```

Run the container:

```bash
docker run -p 3000:3000 --env-file .env url-shortener-api
```

Or use Docker Compose:

```bash
docker compose up -d
```

The Docker build generates the Prisma Client during the image build process:

```dockerfile
RUN npx prisma generate
```

This ensures the generated Prisma Client is available inside the production container.

## API Documentation

Base URL:

```text
/api/v1
```

### 1. Create Short URL

**POST**

```text
/api/v1/urls
```

Request:

```json
{
  "url": "https://www.google.com"
}
```

Response:

```json
{
  "success": true,
  "message": "URL created successfully",
  "data": {
    "id": "cmsvbqxq500000drxjm5trow8",
    "originalUrl": "https://www.google.com",
    "shortCode": "p833FNEe",
    "clickCount": 0,
    "lastAccessedAt": null
  }
}
```

### 2. Get All URLs

**GET**

```text
/api/v1/urls
```

Returns all shortened URLs ordered by creation date.

### 3. Get URL by Short Code

**GET**

```text
/api/v1/urls/:shortCode
```

Example:

```text
/api/v1/urls/GwtTJBTM
```

### 4. Redirect URL

**GET**

```text
/api/v1/:shortCode
```

Example:

```text
/api/v1/GwtTJBTM
```

The server redirects the request to the original URL.

Each successful redirect also increments:

```text
clickCount
```

and updates:

```text
lastAccessedAt
```

### 5. Get URL Statistics

**GET**

```text
/api/v1/urls/:shortCode/stats
```

Example response:

```json
{
  "success": true,
  "data": {
    "shortCode": "GwtTJBTM",
    "originalUrl": "https://www.github.com",
    "clickCount": 1,
    "lastAccessedAt": "2026-08-16T06:32:02.403Z"
  }
}
```

### 6. Update URL

**PATCH**

```text
/api/v1/urls/:shortCode
```

Request:

```json
{
  "url": "https://youtube.com"
}
```

### 7. Delete URL

**DELETE**

```text
/api/v1/urls/:shortCode
```

Deletes the shortened URL from the database.

## Testing

Run the test suite:

```bash
npm test
```

The project uses:

* Vitest
* Supertest

Tests cover API behavior, validation, errors, and URL operations.

##  Validation & Error Handling

The API validates incoming URLs before processing them.

Supported protocols:

```text
http:
https:
```

Examples of validation errors:

```json
{
  "success": false,
  "message": "URL is required"
}
```

```json
{
  "success": false,
  "message": "URL must be a string"
}
```

```json
{
  "success": false,
  "message": "Invalid URL"
}
```

The application also uses centralized error handling for validation, database, conflict, and not-found errors.

## Security

The API uses several security-related middleware components:

* Helmet for HTTP security headers
* CORS for cross-origin request handling
* Express Rate Limit for request throttling
* Input validation for URL payloads
* Centralized error handling

## Architecture

The application separates responsibilities into multiple layers:

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma
   ↓
PostgreSQL
```

This structure keeps HTTP handling, business logic, database operations, and error handling separated.

## ☁️ Deployment

The API is deployed using **Railway**.

Production architecture:

```text
Client
  ↓
Railway
  ↓
Node.js + Express
  ↓
Prisma ORM
  ↓
Neon PostgreSQL
```

Docker is used to build the production application image.

The Prisma Client is generated during the Docker build process:

```text
RUN npx prisma generate
```

##  Production Endpoint

Production API:

```text
https://codealphainternurlshortener-production.up.railway.app
```

Health check:

```text
GET /
```

Expected response:

```json
{
  "success": true,
  "message": "API is running"
}
```

## Author

**Alfin Muzakki Iman**

Backend Developer

Built as part of the **CodeAlpha Internship** program.
