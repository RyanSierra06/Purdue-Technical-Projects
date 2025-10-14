# Development Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

---

## 📋 Initial Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd "Purdue USB Purdue Technical Projects Website"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/` directory:
```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/Technical-Projects?retryWrites=true&w=majority

PORT=3001
NODE_ENV=development

API_BASE_URL=http://localhost:3001/api

# Frontend URL for CORS (development)
FRONTEND_URL=http://localhost:5173
```

**IMPORTANT:** Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your MongoDB Atlas credentials.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

The `.env` file should already exist with these values:
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_BACKEND_URL=http://localhost:3001
VITE_PORT=5173
VITE_NODE_ENV=development
```

---

## 🏃 Running the Application

### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
You should see:
```
💚 MongoDB Connected: cluster.mongodb.net
📂 Using database: Technical-Projects
Server running on port 3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Option 2: Using Concurrent Processes
```bash
# From the root directory
npm run dev  # (if you have a root package.json with concurrently)
```

---

## 🔍 Verification

### Test Backend Connection

1. **Health Check:**
```bash
curl http://localhost:3001/api/health
```
Should return:
```json
{
  "status": "OK",
  "timestamp": "2025-10-14T...",
  "environment": "development"
}
```

2. **Get Projects:**
```bash
curl http://localhost:3001/api/projects
```

3. **Test from Frontend:**
Open browser to `http://localhost:5173` and check:
- Homepage loads
- Projects page loads
- Submit form works
- Check browser console for errors

---

## 🔧 Environment Variables Reference

### Frontend (`frontend/.env`)
| Variable | Purpose | Development Value |
|----------|---------|-------------------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:3001/api` |
| `VITE_BACKEND_URL` | Backend base URL (for images) | `http://localhost:3001` |
| `VITE_PORT` | Frontend dev server port | `5173` |
| `VITE_NODE_ENV` | Environment mode | `development` |

### Backend (`backend/.env`)
| Variable | Purpose | Development Value |
|----------|---------|-------------------|
| `MONGO_URI` | MongoDB connection string | Your MongoDB Atlas URI |
| `PORT` | Backend server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | CORS allowed origin | `http://localhost:5173` |

---

## 📁 Project Structure

```
Purdue USB Purdue Technical Projects Website/
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── App.jsx
│   ├── .env             # Development environment (local only)
│   ├── .env.production  # Production environment (committed)
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/ # Request handlers
    │   ├── models/      # Database models
    │   ├── routes/      # API routes
    │   └── config/      # Configuration
    ├── .env             # Backend secrets (local only)
    └── package.json
```

---

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend

**Problem:** `Network Error` or `Failed to fetch`

**Solutions:**
1. Verify backend is running on port 3001
2. Check `frontend/.env` has correct `VITE_API_BASE_URL`
3. Check browser console for CORS errors
4. Verify `backend/.env` has `FRONTEND_URL=http://localhost:5173`

### Database Connection Issues

**Problem:** `MongoNetworkError` or `Authentication failed`

**Solutions:**
1. Verify MongoDB Atlas credentials in `backend/.env`
2. Check IP whitelist in MongoDB Atlas (allow your IP or use `0.0.0.0/0` for development)
3. Ensure database name is correct in the connection string
4. Test connection string in MongoDB Compass

### Images Not Loading

**Problem:** Project images show broken image icons

**Solutions:**
1. Check `VITE_BACKEND_URL` in `frontend/.env`
2. Verify backend is serving images at `/api/projects/:id/image`
3. Check browser Network tab for 404 errors

### Port Already in Use

**Problem:** `EADDRINUSE: address already in use :::3001`

**Solutions:**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill

# Or use a different port in backend/.env
PORT=3002
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Backend health endpoint responds
- [ ] Frontend loads at localhost:5173
- [ ] Projects page displays projects from database
- [ ] Submit form accepts new projects
- [ ] Images load correctly
- [ ] Search and filter work on Projects page
- [ ] Navigation works between pages

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create new project |
| GET | `/api/projects/:id/image` | Get project image |

---

## 📚 Common Development Tasks

### Add a New Page
1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Add navigation link in `frontend/src/components/NavBar.jsx`

### Add a New API Endpoint
1. Create controller in `backend/src/controllers/`
2. Add route in `backend/src/routes/`
3. Import route in `backend/src/app.js`

### Update Database Schema
1. Modify schema in `backend/src/models/`
2. Restart backend server
3. Test with new/existing data

---

## 🔄 Git Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

### Files to NEVER Commit
- `backend/.env` (contains database passwords)
- `frontend/.env` (local development settings)
- `node_modules/` (dependencies)
- `dist/` (build output)

### Files That ARE Committed
- `frontend/.env.production` (production config)
- Source code files (`.js`, `.jsx`, `.json`, etc.)

---

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

