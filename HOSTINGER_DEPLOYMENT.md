# 🚀 Hostinger Cloud Startup Deployment Guide

Complete guide to deploy Digital Helper Agency on Hostinger Cloud Startup with Node.js.

---

## 📋 Prerequisites

✅ Hostinger Cloud Startup plan (supports Node.js)
✅ SSH access enabled in Hostinger panel
✅ Domain pointed to Hostinger
✅ Gemini API key from https://makersuite.google.com/app/apikey

---

## 🔧 Step 1: Prepare Your Local Files

### 1.1 Install Dependencies Locally

```bash
# Install new dependencies
npm install express cors

# Verify package.json is updated
cat package.json
```

### 1.2 Test Locally (Optional but Recommended)

```bash
# Build the frontend
npm run build

# Start the server
npm start

# Visit http://localhost:3000
# Test all features (chat, contact form, etc.)
```

---

## 📦 Step 2: Upload to Hostinger

### Option A: Upload via File Manager

1. **Build your site:**
   ```bash
   npm run build
   ```

2. **Create a ZIP file** containing:
   - `dist/` folder (your built frontend)
   - `api/` folder (all 4 API handler files)
   - `server.js`
   - `package.json`
   - `ecosystem.config.cjs`
   - `.env.example`

3. **Upload ZIP to Hostinger:**
   - Go to Hostinger Panel → File Manager
   - Navigate to your domain's folder (usually `/domains/digital-helper.com/`)
   - Upload and extract the ZIP file

### Option B: Upload via Git (Recommended)

1. **Initialize Git repo (if not already):**
   ```bash
   git init
   git add .
   git commit -m "Prepare for Hostinger deployment"
   ```

2. **Push to GitHub:**
   ```bash
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Clone on Hostinger via SSH** (see Step 3)

---

## 🔐 Step 3: SSH into Hostinger

### 3.1 Get SSH Credentials

1. Go to **Hostinger Panel → Advanced → SSH Access**
2. Enable SSH if not already enabled
3. Note your credentials:
   - Host: `ssh.hostinger.com` (or similar)
   - Port: `65002` (check your panel)
   - Username: `u123456789` (example)
   - Password: (your hosting password)

### 3.2 Connect via SSH

**Windows (PowerShell):**
```bash
ssh u123456789@ssh.hostinger.com -p 65002
```

**Mac/Linux:**
```bash
ssh u123456789@ssh.hostinger.com -p 65002
```

Type `yes` when prompted, then enter your password.

---

## 📁 Step 4: Navigate to Your Domain Folder

```bash
# List your domains
ls domains/

# Navigate to your domain
cd domains/digital-helper.com/

# If you uploaded via File Manager, files are here
ls

# If using Git, clone now:
git clone YOUR_GITHUB_REPO_URL .
```

---

## 🔧 Step 5: Install Node.js Dependencies

```bash
# Make sure you're in the project directory
pwd
# Should show: /home/u123456789/domains/digital-helper.com

# Install dependencies
npm install

# This will install express, cors, @google/genai, react, etc.
```

---

## 🔑 Step 6: Set Up Environment Variables

```bash
# Create .env file
cp .env.example .env

# Edit .env file
nano .env
```

**Add your environment variables:**
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3000
NODE_ENV=production
```

**Save and exit:**
- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter` to save

**Verify:**
```bash
cat .env
```

---

## 🏗️ Step 7: Build the Frontend

```bash
# Build the React app
npm run build

# Verify dist folder was created
ls -la dist/
```

---

## 🚀 Step 8: Install and Configure PM2

PM2 keeps your Node.js app running 24/7 and restarts it if it crashes.

### 8.1 Install PM2

```bash
# Install PM2 globally
npm install -g pm2
```

### 8.2 Start Your App with PM2

```bash
# Start using ecosystem config
pm2 start ecosystem.config.cjs

# Check status
pm2 status

# You should see:
# ┌─────┬──────────────────┬─────────┬─────────┬──────────┐
# │ id  │ name             │ status  │ restart │ uptime   │
# ├─────┼──────────────────┼─────────┼─────────┼──────────┤
# │ 0   │ digital-helper   │ online  │ 0       │ 0s       │
# └─────┴──────────────────┴─────────┴─────────┴──────────┘
```

### 8.3 View Logs

```bash
# View all logs
pm2 logs

# View only errors
pm2 logs --err

# Stop viewing logs: Ctrl + C
```

### 8.4 Make PM2 Start on Server Reboot

```bash
# Generate startup script
pm2 startup

# Copy and run the command it outputs (it will look like):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u u123456789 --hp /home/u123456789

# Save current PM2 process list
pm2 save
```

---

## 🌐 Step 9: Configure Domain & Reverse Proxy

Hostinger usually handles this automatically, but if not:

### 9.1 Check if App is Running

```bash
# Test locally on the server
curl http://localhost:3000

# You should see HTML output
```

### 9.2 Configure Nginx (if needed)

Most Hostinger Cloud plans auto-configure this, but if you need manual setup:

```bash
# Edit nginx config (path may vary)
nano /etc/nginx/sites-available/digital-helper.com.conf
```

**Add this configuration:**
```nginx
server {
    listen 80;
    server_name digital-helper.com www.digital-helper.com;

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

**Restart Nginx:**
```bash
sudo systemctl reload nginx
```

### 9.3 Enable SSL (HTTPS)

Most Hostinger plans include free SSL via Let's Encrypt:

1. Go to **Hostinger Panel → SSL**
2. Enable SSL for `digital-helper.com`
3. Wait 5-10 minutes for activation

Or via command line:
```bash
# Usually handled by Hostinger panel automatically
# If manual setup needed, contact Hostinger support
```

---

## ✅ Step 10: Verify Deployment

### 10.1 Check PM2 Status

```bash
pm2 status
# Should show "online"

pm2 logs --lines 20
# Should show no errors
```

### 10.2 Test Your Website

Open browser and visit:
- `http://digital-helper.com` → Should redirect to HTTPS
- `https://digital-helper.com` → Should load your site

**Test all features:**
- ✅ Navigation works (all routes)
- ✅ Chat widget works
- ✅ Contact form AI email draft works
- ✅ Website audit with Google Maps works
- ✅ No console errors (F12 → Console)

### 10.3 Test API Endpoints Directly

```bash
# From your local machine, test API:
curl -X POST https://digital-helper.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "history": []}'

# Should return JSON with text response
```

---

## 🔄 Updating Your Site (Future Changes)

### Update Process:

```bash
# 1. SSH into server
ssh u123456789@ssh.hostinger.com -p 65002

# 2. Navigate to project
cd domains/digital-helper.com/

# 3. Pull latest changes (if using Git)
git pull origin main

# Or upload new files via File Manager

# 4. Install any new dependencies
npm install

# 5. Rebuild frontend
npm run build

# 6. Restart PM2
pm2 restart digital-helper

# 7. Check logs
pm2 logs --lines 50
```

---

## 🛠️ Common PM2 Commands

```bash
# View status
pm2 status

# View logs
pm2 logs
pm2 logs digital-helper

# Restart app
pm2 restart digital-helper

# Stop app
pm2 stop digital-helper

# Delete app from PM2
pm2 delete digital-helper

# Monitor resources
pm2 monit

# Save current process list
pm2 save

# View detailed info
pm2 show digital-helper
```

---

## 🚨 Troubleshooting

### Issue: PM2 shows "errored" status

```bash
# Check logs
pm2 logs digital-helper --err

# Common issues:
# 1. Missing .env file → Create it with GEMINI_API_KEY
# 2. Missing dependencies → Run: npm install
# 3. Port already in use → Change PORT in .env
```

### Issue: Site shows 502 Bad Gateway

```bash
# Check if app is running
pm2 status

# Check if port 3000 is accessible
curl http://localhost:3000

# Restart app
pm2 restart digital-helper

# Check nginx config
sudo nginx -t
```

### Issue: API calls fail with CORS errors

**Solution:** The server already has CORS enabled. If still failing:

```bash
# Edit server.js
nano server.js

# Ensure CORS is configured (already done):
# app.use(cors());
```

### Issue: Environment variables not loading

```bash
# Verify .env file exists
cat .env

# Restart PM2 to pick up changes
pm2 restart digital-helper

# Or delete and recreate
pm2 delete digital-helper
pm2 start ecosystem.config.cjs
```

### Issue: Out of memory

```bash
# Check memory usage
pm2 monit

# Increase max memory in ecosystem.config.cjs:
nano ecosystem.config.cjs
# Change: max_memory_restart: '1G'

# Restart
pm2 restart digital-helper
```

---

## 📊 Performance Monitoring

### Check Server Resources

```bash
# CPU and Memory
top

# Disk usage
df -h

# PM2 monitoring
pm2 monit
```

### Check Application Performance

```bash
# View PM2 logs with timestamps
pm2 logs --timestamp

# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://digital-helper.com
```

---

## 🔐 Security Best Practices

1. **Keep .env file secure:**
   ```bash
   chmod 600 .env
   ```

2. **Never commit .env to Git:**
   ```bash
   # .gitignore already includes:
   .env
   .env.local
   ```

3. **Keep dependencies updated:**
   ```bash
   npm audit
   npm update
   ```

4. **Monitor logs regularly:**
   ```bash
   pm2 logs --lines 100
   ```

---

## 📞 Need Help?

- **Hostinger Support:** https://www.hostinger.com/contact
- **PM2 Documentation:** https://pm2.keymetrics.io/docs/usage/quick-start/
- **Node.js Issues:** Check logs with `pm2 logs`

---

## ✅ Deployment Checklist

Before going live:

- [ ] All dependencies installed (`npm install`)
- [ ] Frontend built (`npm run build`)
- [ ] .env file created with `GEMINI_API_KEY`
- [ ] PM2 running (`pm2 status` shows "online")
- [ ] Domain pointing to Hostinger
- [ ] SSL certificate active (HTTPS works)
- [ ] All pages load correctly
- [ ] Chat widget works
- [ ] Contact form works
- [ ] API endpoints respond correctly
- [ ] No errors in browser console
- [ ] No errors in PM2 logs (`pm2 logs`)
- [ ] PM2 configured to start on reboot (`pm2 startup` + `pm2 save`)

---

**🎉 Congratulations!** Your site is now live on Hostinger!

Visit: **https://digital-helper.com**
