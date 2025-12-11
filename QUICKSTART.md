# ⚡ Quick Start

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start server
npm start

# 3. Open browser
# http://localhost:3000
```

## Deploy to Server

```bash
# 1. Upload to server
scp -r * user@server:/var/www/testimony-app/

# 2. SSH and install
ssh user@server
cd /var/www/testimony-app
npm install --production

# 3. Run with PM2
npm install -g pm2
pm2 start server.js --name testimony-app
pm2 save
pm2 startup

# 4. Configure Nginx (see DEPLOY.md)
```

## Pages

- `/` - Congregation (public)
- `/media` - Admin (password: Christmas2026)
- `/projection` - Projector (password: Christmas2026)

## That's it! 🎄
