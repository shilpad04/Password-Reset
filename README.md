# 🚀 Password Reset System

A complete MERN-based password reset system with secure Gmail API OAuth2 email delivery (works on Render free tier without SMTP).
Frontend is deployed on Netlify, backend on Render.

This project allows users to:
- Register
- Login
- Request password reset link by email
- Reset password securely using token

---

## ✨ Features

🔐 Secure authentication (bcrypt hashed passwords)
📩 Password reset via Gmail API OAuth2 (no SMTP)
🕒 Token expiration (10-minute validity)

## 📂 Project Structure

```
Password-Reset/
│
│
├── backend/
│   ├── server.js
│   ├── package.json             
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── authLogin.js
│   │   ├── authRegister.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── utils/
│   │   └── sendEmail.js   
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│       └── errorHandler.js
│
├── frontend/
│   ├── package.json
│   │
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   └── src/
│       ├── api.js
│       │
│       ├── components/
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── ForgotPassword.js
│       │   ├── ResetPassword.js
│       │   ├── Dashboard.js
│       │
│       ├── App.js
│       ├── index.js
│       └── styles.css 
│
└── README.md
```

---

## 🔧 Backend Setup

### 1. Clone repo
```
git clone https://github.com/shilpad04/Password-Reset.git
cd Password-Reset/backend
npm install
```

#### 2. Backend .env file
Create `/backend/.env:`

```
PORT=5004
MONGO_URL=your_mongodb_connection_string

FRONTEND_URL=https://your-frontend.netlify.app

# Gmail API OAuth2 Credentials
GMAIL_USER=yourgmail@gmail.com
GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxx
GOOGLE_REFRESH_TOKEN=xxxxxxxxxxxxxxxxxxxx
GOOGLE_REDIRECT_URI=https://developers.google.com/oauthplayground

EMAIL_FROM_NAME=Password Reset App
JWT_SECRET=your_jwt_secret
```

#### 3. Start backend locally
`npm start`

Backend runs at:
`http://localhost:5004`

---

## 🎯 Deploy Backend on Render

1. Go to https://render.com
2. Create Web Service
3. Connect GitHub repo
4. Root directory for backend: backend/
5. Build command:
  `npm install`
6. Start command:
   `node start`
7. Add environment variables inside Render dashboard (same as .env)

---

## 🖥 Frontend Setup 

#### 1. Move into frontend folder

```
cd Password-Reset/frontend
npm install
npm start
```

App now runs at:
`http://localhost:3000`

#### 2. Frontend .env file

Create `/frontend/.env`:

`REACT_APP_BACKEND_URL=https://your-backend.onrender.com`

---

## 🌐 Deploy Frontend on Netlify

#### Step 1 — Add netlify.toml in repo root

```
[build]
  base = "frontend"
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"
```

#### Step 2 — Create site

1. Go to https://netlify.com
2. Add New Site → Import from Git
3. Select your repo: Password-Reset
4. Set:
```
| Setting           | Value           |
| ----------------- | --------------- |
| Base directory    | `frontend`      |
| Build command     | `npm run build` |
| Publish directory | `build`         |
| Branch            | main            |
```
5. Add environment variable:
   `REACT_APP_BACKEND_URL = https://your-backend.onrender.com`

#### Step 3 — Deploy
Click:

Deploy site → Clear cache & deploy

---

## 📡 API Endpoints

Frontend URL: `https://resetthepassword.netlify.app/`

Base URL: `https://password-reset-9jib.onrender.com/`

##### POST `/api/auth/register`

```
{
  "email": "user@example.com",
  "password": "123456"
}
```

##### POST `/api/auth/login`

```
{
  "email": "user@example.com",
  "password": "123456"
}
```

Response:

```
{
  "token": "jwt-token"
}
```

---

##### POST `/api/auth/forgot-password`

Body:

```
{
  "email": "user@example.com"
}
```

Sends email with reset link.

##### POST `/api/auth/reset-password/:token`

Body:

```
{
  "password": "newpassword"
}
```

---

## 📧 Gmail OAuth2 Email Flow
This project uses Gmail API (NOT SMTP) to work on Render free tier.

# Requirements:

Google OAuth2 Consent Screen
Client ID & Secret
Refresh token (generated via OAuth Playground)

---

## 🧪 Testing Flow

1. Register a test user
2. Click "Forgot password"
3. Check email (Gmail)
4. Click reset link
5. Enter new password
6. Login → success

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express
- MongoDB (Atlas)
- Gmail API OAuth2
- Bcrypt
- Crypto

### Frontend

- React
- Axios
- Netlify hosting

### Deployment

- Render (backend)
- Netlify (frontend)



