# Hostinger Cloud Hosting Deployment Guide

## Prerequisites

- Hostinger Cloud Hosting account
- SSH access enabled
- Domain: digital-helper.com pointed to Hostinger
- Gemini API key

## Deployment Steps

### 1. Prepare Your Application

**Create production environment file:**
```bash
# On Hostinger server (we'll do this via SSH)
GEMINI_API_KEY=your_actual_api_key_here
NODE_ENV=production
PORT=3000
```

### 2. Connect to Hostinger via SSH

1. Log into Hostinger dashboard
2. Go to your Cloud Hosting panel
3. Find SSH access details:
   - Hostname (usually: your-server-name.hostinger.com)
   - Port (usually 65002)
   - Username
   - Password or SSH key

**Connect:**
```bash
ssh -p 65002 u123456789@your-server.hostinger.com
```

### 3. Install Node.js (if not already installed)

```bash
# Check if Node.js is installed
node --version

# If not installed or version is old, install via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

### 4. Set Up Your Application

```bash
# Navigate to your web root (usually ~/domains/digital-helper.com/public_html)
cd ~/domains/digital-helper.com

# Create application directory
mkdir -p app
cd app

# Initialize git if needed
git init

# Add your repository
git remote add origin YOUR_GITHUB_REPO_URL
git pull origin master
```

### 5. Install Dependencies

```bash
npm install
```

### 6. Create Environment File

```bash
nano .env.local
```

Add:
```
GEMINI_API_KEY=your_api_key_here
NODE_ENV=production
PORT=3000
```

Save: `Ctrl+X`, then `Y`, then `Enter`

### 7. Build the Application

```bash
npm run build
```

This creates optimized production files in the `dist/` folder.

### 8. Set Up PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Create a simple server file (see server.js below)
# Then start the app
pm2 start server.js --name "digital-helper"

# Enable PM2 to start on server reboot
pm2 startup
pm2 save
```

### 9. Configure Domain & SSL

**In Hostinger Panel:**
1. Go to Domains → digital-helper.com
2. Point to your application directory
3. Enable SSL certificate (free via Hostinger)
4. Set up redirect: www.digital-helper.com → digital-helper.com

**Configure reverse proxy (if needed):**
- Hostinger usually handles this automatically
- Your app runs on port 3000
- Hostinger's web server proxies requests to it

### 10. Verify Deployment

Visit: https://digital-helper.com

Check:
- ✅ Site loads correctly
- ✅ SSL certificate is active (green padlock)
- ✅ Chat widget works (Gemini API)
- ✅ All pages navigate properly
- ✅ Contact form sends emails

## Server Configuration Files

### ecosystem.config.cjs
PM2 configuration for process management (created automatically)

### server.js
Express server to serve the built files (created automatically)

## Deployment Workflow (Future Updates)

### Option 1: Manual Deployment (Simple)
```bash
# SSH into server
ssh -p 65002 u123456789@your-server.hostinger.com

# Navigate to app
cd ~/domains/digital-helper.com/app

# Pull latest changes
git pull origin master

# Rebuild
npm install
npm run build

# Restart app
pm2 restart digital-helper
```

### Option 2: Automated Deployment (Advanced)
Set up GitHub Actions to automatically deploy on push to master.

## Troubleshooting

### App not starting
```bash
pm2 logs digital-helper
pm2 status
```

### Port already in use
```bash
pm2 delete digital-helper
pm2 start server.js --name "digital-helper"
```

### Environment variables not working
```bash
# Verify .env.local exists
cat .env.local

# Restart PM2
pm2 restart digital-helper --update-env
```

### SSL certificate issues
- Verify in Hostinger panel that SSL is enabled
- May take 10-15 minutes for certificate to activate
- Use Hostinger's SSL checker tool

## Performance Optimization

1. **Enable Gzip compression** (usually enabled by default)
2. **CDN** - Consider Cloudflare (free tier) for additional performance
3. **Caching** - Browser caching is set in server.js
4. **Monitor** - Use `pm2 monit` to watch resource usage

## Security Checklist

- ✅ SSL certificate enabled
- ✅ Environment variables not in git
- ✅ API keys secured in .env.local
- ✅ File permissions correct (chmod 644 for files, 755 for directories)
- ✅ PM2 running as non-root user
- ✅ Regular security updates: `npm audit fix`

## Cost Comparison

**Hostinger Cloud Hosting:**
- $9.99-$29.99/month (depending on plan)
- Includes domain, SSL, email
- Full control

**Vercel Free Tier:**
- Free for personal projects
- Great for static sites
- May have bandwidth limits

**Recommendation:** Since you already have Hostinger and want a professional setup, use Hostinger hosting with your domain.

## Support

- Hostinger support: 24/7 chat in dashboard
- Check PM2 logs: `pm2 logs digital-helper`
- Application logs in the console
