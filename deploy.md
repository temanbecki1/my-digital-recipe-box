# Railway Deployment Guide

## 🚀 Complete Deployment Steps

### Step 1: Set Up PostgreSQL Database
1. Create new Railway project
2. Add PostgreSQL service
3. Database will auto-provision with connection variables

### Step 2: Deploy Backend API
1. **Add service** → "GitHub Repo"
2. **Select your repository**
3. **Configure backend service:**
   - **Service name**: `recipe-backend`
   - **Root directory**: `backend`
   - **Build command**: `npm install`
   - **Start command**: `npm start`
4. **Environment variables**: Auto-injected by Railway
5. **Domain**: Railway generates automatically

### Step 3: Deploy Frontend React App
1. **Add service** → "GitHub Repo"  
2. **Select same repository**
3. **Configure frontend service:**
   - **Service name**: `recipe-frontend`
   - **Root directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Start command**: `npm run serve`
4. **Environment variables:**
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.railway.app`

### Step 4: Test Deployment
1. Access frontend URL
2. Test all CRUD operations
3. Verify database connectivity

## 🔧 Important Settings

### Frontend Service Settings:
- **Root Directory**: `frontend` (CRITICAL!)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run serve`

### Backend Service Settings:
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

## 🐛 Common Issues

### "react-scripts: not found"
- **Cause**: Root directory not set to `frontend`
- **Fix**: Set root directory to `frontend` in service settings

### "ECONNREFUSED ::1:5432"
- **Cause**: Database service not connected
- **Fix**: Connect PostgreSQL service to backend

### CORS Errors
- **Cause**: Wrong API URL in frontend
- **Fix**: Update `REACT_APP_API_URL` environment variable 