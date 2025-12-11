# 🚀 Deployment Guide

## Quick Deploy to Contabo

### 1. Upload Files

```bash
# From your local machine
scp -r * user@your-server:/var/www/testimony-app/
```

### 2. Install Node.js (if not installed)

```bash
# SSH into server
ssh user@your-server

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v
```

### 3. Install Dependencies

```bash
cd /var/www/testimony-app
npm install --production
```

### 4. Test the App

```bash
npm start
```

Visit `http://your-server-ip:3000` to test.

### 5. Run with PM2 (Production)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the app
pm2 start server.js --name testimony-app

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command it gives you

# Check status
pm2 status
pm2 logs testimony-app
```

### 6. Configure Nginx

Create `/etc/nginx/sites-available/testimony`:

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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/testimony /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Add SSL (Optional but Recommended)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d testimony.thisisemmanuel.pro
```

## Done! 🎉

Your app is now live at `https://testimony.thisisemmanuel.pro`

## Useful Commands

```bash
# View logs
pm2 logs testimony-app

# Restart app
pm2 restart testimony-app

# Stop app
pm2 stop testimony-app

# Update app after changes
cd /var/www/testimony-app
git pull  # if using git
pm2 restart testimony-app
```
