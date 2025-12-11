# 🎄 Christmas Testimony App

A beautiful, real-time testimony sharing system for church Christmas services.

## Features

- ✨ Christmas-themed glassmorphism UI
- 🔄 Real-time synchronization across devices
- 🔒 Password-protected admin and projector pages
- 📱 Responsive design
- 🎨 Smooth slide animations
- ❄️ Festive snowflake effects

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

The app will run on `http://localhost:3000`

### 3. Access the Pages

- **Congregation**: `http://localhost:3000/` (public)
- **Admin Dashboard**: `http://localhost:3000/media` (password: Christmas2026)
- **Projector Display**: `http://localhost:3000/projection` (password: Christmas2026)

## Development

Run with auto-reload:

```bash
npm run dev
```

## Deployment

### Deploy to Contabo (or any VPS)

1. **Upload files to server**:
```bash
scp -r * user@your-server:/path/to/app/
```

2. **SSH into server and install dependencies**:
```bash
ssh user@your-server
cd /path/to/app
npm install --production
```

3. **Run with PM2** (recommended for production):
```bash
npm install -g pm2
pm2 start server.js --name testimony-app
pm2 save
pm2 startup
```

4. **Configure Nginx as reverse proxy**:

```nginx
server {
    listen 80;
    server_name testimony.thisisemmanuel.pro;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **Reload Nginx**:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Configuration

### Change Password

Edit `public/index.html`, `public/media.html`, and `public/projection.html`:

```javascript
const PASSWORD = 'YourNewPassword';
```

### Change Port

Set environment variable:
```bash
PORT=8080 npm start
```

Or edit `server.js`:
```javascript
const PORT = process.env.PORT || 3000;
```

## File Structure

```
christmas-testimony-app/
├── server.js           # Node.js Express server
├── package.json        # Dependencies
├── public/             # Static files
│   ├── index.html      # Congregation page
│   ├── media.html      # Admin dashboard
│   ├── projection.html # Projector display
│   └── 404.html        # Error page
├── data/               # Auto-created data storage
│   ├── testimonies.json
│   └── active.json
└── README.md
```

## API Endpoints

- `GET /api/testimonies` - Get all testimonies
- `POST /api/testimonies` - Add new testimony
- `DELETE /api/testimonies/:id` - Delete testimony
- `GET /api/active` - Get active testimony
- `POST /api/active` - Set active testimony

## Troubleshooting

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000
# Kill it
kill -9 <PID>
```

### Permission denied on data folder
```bash
chmod 755 data/
chmod 666 data/*.json
```

## License

MIT

## Support

For issues or questions, check the server logs:
```bash
pm2 logs testimony-app
```
# Testi
