# 📝 Commands Cheat Sheet

**Copy and paste these commands as needed. Replace placeholders with YOUR information!**

---

## 🖥️ On Your Computer

### Git Commands (Save & Upload Code)

```bash
# See what files changed
git status

# Add all changes
git add .

# Save changes with a message
git commit -m "Description of what you changed"

# Upload to GitHub
git push
```

### Build & Test Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Build your website
npm run build

# Test locally
npm start
```
*Then visit: http://localhost:3000*
*Press `Ctrl+C` to stop*

---

## 🔐 Connect to Hostinger

```bash
# Replace with YOUR details from Hostinger SSH settings
ssh u123456789@ssh.hostinger.com -p 65002
```

**Your details:**
- Username: _______________ (example: u123456789)
- Host: _______________ (example: ssh.hostinger.com)
- Port: _______________ (usually 65002)
- Password: Your Hostinger password

---

## 🌐 On Hostinger Server (After SSH Connection)

### Navigate to Your Website

```bash
# Go to your domain folder
cd domains/digital-helper.com/

# See what files are in the folder
ls
```

### First Time Setup

```bash
# Clone from GitHub (if using Git)
git clone https://github.com/YOUR_USERNAME/digital-helper-agency.git .

# Install dependencies
npm install --legacy-peer-deps

# Create environment file
cp .env.example .env

# Edit environment file (add your API key)
nano .env
# Press Ctrl+X, then Y, then Enter to save

# Build the website
npm run build

# Install PM2
npm install -g pm2

# Start the website
pm2 start ecosystem.config.cjs

# Make PM2 auto-start
pm2 startup
# Copy and run the command it outputs

# Save PM2 settings
pm2 save
```

### PM2 Commands (Website Management)

```bash
# Check if website is running
pm2 status

# View website logs
pm2 logs

# View last 50 log lines
pm2 logs --lines 50

# Stop viewing logs
# Press Ctrl+C

# Restart website
pm2 restart digital-helper

# Stop website
pm2 stop digital-helper

# Delete website from PM2
pm2 delete digital-helper

# Start website again (after delete)
pm2 start ecosystem.config.cjs

# Save current PM2 settings
pm2 save

# Monitor resource usage
pm2 monit
```

### Update Website (After Making Changes)

```bash
# Go to website folder
cd domains/digital-helper.com/

# Get latest code from GitHub
git pull

# Rebuild website
npm run build

# Restart website
pm2 restart digital-helper

# Check if it worked
pm2 status
pm2 logs --lines 20
```

### Environment File Commands

```bash
# View your .env file
cat .env

# Edit your .env file
nano .env

# Set correct permissions
chmod 600 .env
```

### Check if Website is Running Locally on Server

```bash
# Test if site responds on port 3000
curl http://localhost:3000
```
*Should show HTML code*

---

## 🔧 Troubleshooting Commands

### Website Not Starting

```bash
# Check PM2 status
pm2 status

# View error logs
pm2 logs --err

# Try restarting
pm2 restart digital-helper

# If still broken, delete and recreate
pm2 delete digital-helper
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

### Check System Resources

```bash
# Check memory and CPU usage
pm2 monit

# Check disk space
df -h

# Check what's using port 3000
lsof -i :3000
```

### Reset Everything

```bash
# Delete PM2 process
pm2 delete digital-helper

# Remove node_modules
rm -rf node_modules

# Reinstall dependencies
npm install --legacy-peer-deps

# Rebuild
npm run build

# Start again
pm2 start ecosystem.config.cjs
pm2 save
```

---

## 📦 File Management Commands

```bash
# List files in current folder
ls

# List files with details
ls -la

# Show current folder path
pwd

# Go to parent folder
cd ..

# Go to home folder
cd ~

# Create new folder
mkdir folder-name

# Delete file
rm filename

# Delete folder and contents
rm -rf folder-name

# Copy file
cp source.txt destination.txt

# Move/rename file
mv oldname.txt newname.txt
```

---

## 🔍 Search & View Commands

```bash
# View file contents
cat filename

# View first 20 lines of file
head -20 filename

# View last 20 lines of file
tail -20 filename

# Search for text in files
grep "search term" filename

# Find file by name
find . -name "filename"
```

---

## 📝 Text Editor (Nano) Commands

**When editing files with `nano .env`:**

- **Save:** `Ctrl+X`, then `Y`, then `Enter`
- **Cancel:** `Ctrl+X`, then `N`
- **Search:** `Ctrl+W`
- **Copy line:** `Alt+6`
- **Cut line:** `Ctrl+K`
- **Paste:** `Ctrl+U`

---

## 🚪 Exit/Disconnect Commands

```bash
# Stop viewing logs
# Press Ctrl+C

# Stop running server
# Press Ctrl+C

# Disconnect from SSH (exit Hostinger)
exit

# Or close the terminal window
```

---

## 🆘 Emergency Commands

### If Website is Down

```bash
ssh u123456789@ssh.hostinger.com -p 65002
cd domains/digital-helper.com/
pm2 restart digital-helper
pm2 logs
```

### If You Need to Start Fresh

```bash
ssh u123456789@ssh.hostinger.com -p 65002
cd domains/digital-helper.com/
pm2 delete digital-helper
git pull
npm install --legacy-peer-deps
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

---

## 📋 Quick Reference URLs

- **Hostinger Panel:** https://hpanel.hostinger.com
- **Your Website:** https://digital-helper.com
- **Gemini API Keys:** https://makersuite.google.com/app/apikey
- **GitHub:** https://github.com
- **Hostinger Support:** https://www.hostinger.com/contact

---

**💡 Tip:** Keep this file open while deploying for quick reference!
