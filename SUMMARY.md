# 📦 Christmas Testimony App - Node.js Version

## ✅ What You Have

A **clean, production-ready Node.js application** with:

- ✨ Express.js backend
- 🗄️ File-based JSON storage (no database needed)
- 🎨 Beautiful Christmas-themed UI
- 🔒 Password-protected admin pages
- 🔄 Real-time synchronization
- 📱 Responsive design

## 📁 File Structure

```
testimony-app/
├── server.js              # Express server (4.5 KB)
├── package.json           # Dependencies
├── .gitignore            # Git ignore rules
├── README.md             # Full documentation
├── DEPLOY.md             # Deployment guide
├── QUICKSTART.md         # Quick start guide
└── public/               # Static files
    ├── index.html        # Congregation page (31.8 KB)
    ├── media.html        # Admin dashboard (31.8 KB)
    ├── projection.html   # Projector display (31.8 KB)
    └── 404.html          # Error page (6.9 KB)
```

## 🚀 To Run Locally

```bash
npm install
npm start
```

Visit: `http://localhost:3000`

## 🌐 To Deploy

See `DEPLOY.md` for complete deployment instructions.

Quick version:
```bash
# Upload files
scp -r * user@server:/var/www/testimony-app/

# Install and run
ssh user@server
cd /var/www/testimony-app
npm install --production
pm2 start server.js --name testimony-app
```

## 🔐 Default Password

**Christmas2026**

Change it in all three HTML files in the `public/` folder.

## 📊 Data Storage

Data is automatically stored in:
- `data/testimonies.json` - All testimonies
- `data/active.json` - Currently active testimony

These files are auto-created on first run.

## 🎯 Features

1. **Congregation Page** (`/`)
   - Public access
   - Submit testimonies
   - Christmas-themed form

2. **Admin Dashboard** (`/media`)
   - Password protected
   - View all testimonies
   - Select testimony to display
   - Delete testimonies

3. **Projector Display** (`/projection`)
   - Password protected
   - Full-screen display
   - Smooth slide animations
   - Auto-updates every 2 seconds

## 🔧 API Endpoints

- `GET /api/testimonies` - Get all
- `POST /api/testimonies` - Add new
- `DELETE /api/testimonies/:id` - Delete
- `GET /api/active` - Get active
- `POST /api/active` - Set active

## 📝 Notes

- No database required
- Works on any Node.js hosting
- Minimal dependencies (just Express)
- Easy to backup (just copy `data/` folder)
- Production-ready

## 🎄 Ready for Christmas Service!

Your app is clean, documented, and ready to deploy!
