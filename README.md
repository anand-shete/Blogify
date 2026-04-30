# Blogify

Blogify is a modern, interactive blogging platform designed to allow users to create, share, and engage with blog posts. With a sleek UI, secure authentication, and AI-powered features, Blogify offers a seamless experience for both readers and writers.

## System Design

Blogify's **current production architecture** uses Amazon Web Services for a full fledged deployment.<br><br>
![Blogify archirecture](./aws.png)

## Live Demo

If you directly want to view this project:
<a href="https://blogify.anandshete.dev" target="_blank">Blogify</a>

## Features

- **Fast Content Delivery**: Optimized blog loading using Redis caching and AWS Cloudfront to reduce response times.
- **AI-Assisted Blog Writing**: Create blogs with a rich text editor enhanced by Gemini Flash for AI-powered writing suggestions.
- **Multiple Authentication**: Supports both Email-based authentication and Google OAuth 2.0 for login.
- **Scalable Image Storage**: Blog images stored on AWS S3 using presigned upload URLs for efficient file handling.
- **API Protection**: Implemented Rate limiting to prevent abuse, prevent excessive requests, and improve backend stability.

## Tech Stack

- **Frontend**: React, Redux, Tailwind, ShadCN
- **Backend**: Express, JWT, Bcrypt, CORS, Sanitize-HTML, AWS SDK
- **Database**: MongoDB Atlas
- **Caching**: Redis
- **AI Integration**: `@google/genai`

## Local Development

### Pre-requisite

- Node.js (v20+ recommended)
- MongoDB setup locally
- AWS account (configured IAM and S3 services)
- Redis installed locally
- Google Geimini API key
- Google OAuth credentials
- TinyMCE API key

#### Follow the below steps to run project locally

1. Clone the repository

```bash
git clone https://github.com/anand-shete/blogify.git
cd blogify
```

2. Install dependencies

```bash
cd frontend
npm install
cd ../backend
npm install
```

3. Set up environment variables

Create a `.env` file in the `backend` directory and add following variables

```bash
MONGO_URI=your_MONGO_URI
PORT=3000
NODE_ENV=development
JWT_SECRET_KEY=your_JWT_SECRET_KEY
REDIS_URI=your_REDIS_URI
FRONTEND_URL=your_FRONTEND_URL
COOKIE_DOMAIN=your_COOKIE_DOMAIN

ACCESS_KEY=your_ACCESS_KEY
SECRET_ACCESS_KEY=your_SECRET_ACCESS_KEY
BUCKET_NAME=your_BUCKET_NAME

GOOGLE_CLIENT_ID=your_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=your_GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URI=your_GOOGLE_REDIRECT_URI
SESSION_KEY=your_SESSION_KEY

GEMINI_API_KEY=your_GEMINI_API_KEY
```

Create a .env file in the `frontend` directory with following variables

```bash
VITE_BASEURL=http://localhost:3000/api/v1
VITE_TINYMCE_API_KEY=your_TINYMCE_API_KEY
```

4. Start the server

In the `backend` directory, run script

```bash
npm run dev
```

In a new terminal, navigate to `frontend` directory

```bash
npm run dev
```

5. Verify

If you followed all the above steps properly, you should see

```bash
Redis connected successfully
MongoDB connected
🚀 Server started on http://localhost:3000
```

## Containerize backend with Docker

1. Copy contens of `.env` into `.env.docker`

```bash
cd ./backend
cp .env .env.docker
```

2. Replace the `REDIS_URI` inside `.env.docker` with following value

```bash
REDIS_URI=redis://redis:6379
```

3. Spin up the stack using Docker Compose

```dockerfile
docker compose up --build
```

4. Verify

Visit `http://localhost:3000/api/v1/health`. You should see

```json
{ "message": "Blogify API Health check passed 🚀" }
```

---

End of README
