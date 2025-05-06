# 💻 Blogify

Blogify is a modern, interactive blogging platform designed to allow users to create, share, and engage with blog posts. With a sleek UI, secure authentication, and AI-powered features, Blogify offers a seamless experience for both readers and writers.

## System Design

## 🌍 Live Demo

If you directly want to view this project:
[Vercel](https://blogify-one-ruby.vercel.app)

## 🌐 Deployment

- Backend deployed on **Render**
- Redis hosted on **Upstash**
- Frontend deployed via **Vercel**
- **AWS S3** for image storage
- **UptimeRobot** for monitoring

## ✨ Features

- **Landing Page**: Utilized Redis caching (Upstash) to efficiently showcase all blogs, accessible to everyone without login.
- **Blog Creation**: Add blogs with a title, content (using TinyMCE Text Editor) and an optional cover image.
- **AI Suggestions**: Powered by Gemini 2.0 Flash model, providing content ideas based on title and current content.
- **Commenting System**: Logged-in users can comment on blogs, guests can only view comments.
- **Authentication**: Supports both JWT and OAuth for secure login and registration.
- **Image Storage**: All images stored in AWS S3 with presigned URLs for uploads.

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, ShadCN, Zod, Redux
- **Backend**: Express, Passport, JWT, Bcrypt, CORS, Sanitize-HTML, AWS SDK
- **Database**: MongoDB Atlas
- **Caching**: Redis (Upstash) with `ioredis`
- **AI Integration**: `@google/generative-ai` (Gemini 2.0 Flash)

## 🧪 Local Development

1. Clone the repository

```
git clone https://github.com/anand-shete/blogify.git
cd blogify
```

2. Install dependencies

```
# Frontend
cd frontend
npm install
# Backend
cd ../backend
npm install
```

3. Set up environment variables: Replace the .env.example file and add your variables in it
   Create a .env file in the `backend` directory with the following:

```
MONGO_URL = mongodb://localhost:27017/blogify
PORT = 3000
JWT_SECRET_KEY = your_JWT_SECRET_KEY
FRONTEND_URL = http://localhost:5173        # for development only
MODE = development                          # for development only

# AWS IAM Keys
ACCESS_KEY = your_ACCESS_KEY
SECRET_ACCESS_KEY = your_SECRET_ACCESS_KEY
REGION = ap-south-1

# Google OAuth Keys
GOOGLE_CLIENT_ID = your_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET = your_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL = your_GOOGLE_CALLBACK_URL

GEMINI_API_KEY = your_GEMINI_API_KEY

REDIS_HOST = your_REDIS_HOST
REDIS_PASSWORD = your_REDIS_PASSWORD
REDIS_PORT = 6379
REDIS_TLS = false                # set `true` for production
```

Create a .env file in the `frontend` directory with these variables:

```
VITE_BASEURL = http://localhost:3000/api/v1         # modify for production deployment
VITE_TINYMCE_API_KEY = your_VITE_TINYMCE_API_KEY
```

5. Start the server

```
# Backend (in backend directory)
npm run dev
```

Inside a new terminal:

```
# Frontend (in frontend directory)
npm run dev
```

## ⚙️ Usage

- **Landing Page**: Visit the root URL to see all blogs. Click any blog to view its content and comments (login required to comment).
- **Login/Register**: Authenticate using JWT or OAuth to access your dashboard.
- **Dashboard**: View your blogs as interactive cards with options to view, edit, or delete.
- **Create/Edit Blogs**: Use the TinyMCE editor, upload an image (optional), and leverage AI suggestions for content.
- **Commenting**: After login, comment on any blog from the Home page.

## 🙋‍♂️ Maintainers

Anand Shete [GitHub](https://github.com/anand-shete)

Contributions welcome — open a PR!

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
