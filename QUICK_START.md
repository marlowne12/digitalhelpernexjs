# 🚀 Quick Start - Deploy to Hostinger in 15 Minutes

**This guide assumes ZERO technical knowledge. Just copy and paste the commands!**

---

## What You Need

✅ Hostinger Cloud Hosting account
✅ Your Gemini API key (from https://makersuite.google.com/app/apikey)
✅ Your domain pointed to Hostinger (`digital-helper.com`)

---

## Step 1: Test Locally (On Your Computer)

**Open terminal/command prompt in your project folder**

### Windows:
- Open File Explorer to your project folder
- Click in the address bar, type `cmd`, press Enter

### Mac:
- Open Finder to your project folder
- Right-click folder → Services → New Terminal at Folder

### Copy and paste these commands (one at a time):

```bash
npm install --legacy-peer-deps
```
*Wait for it to finish (2-3 minutes)*

```bash
npm run build
```
*Creates your website files*

```bash
npm start
```
*Starts test server*

**Open browser:** http://localhost:3000

**Test everything works, then press `Ctrl+C` to stop the server**

---

## Step 2: Get Your Hostinger SSH Details

1. Go to: https://hpanel.hostinger.com
2. Click: **Advanced** → **SSH Access**
3. Make sure it's **Enabled**
4. Write down:
   - **Host:** (example: `ssh.hostinger.com`)
   - **Port:** (example: `65002`)
   - **Username:** (example: `u123456789`)
   - **Password:** (your Hostinger password)

---

## Step 3: Upload Files to Hostinger

### OPTION A: File Manager (Easier, No Git)

1. Create ZIP file of these folders/files:
   - `dist` folder
   - `api` folder
   - `server.js`
   - `package.json`
   - `ecosystem.config.cjs`
   - `.env.example`

2. Go to: https://hpanel.hostinger.com → **Files** → **File Manager**

3. Navigate to: `domains/digital-helper.com/`

4. Click **Upload**, select your ZIP file

5. After upload, right-click ZIP → **Extract**

6. Delete the ZIP file

**Skip to Step 4**

### OPTION B: Git (Recommended for Updates)

**In your terminal on your computer:**

```bash
git add .
```

```bash
git commit -m "Prepare for deployment"
```

```bash
git remote add origin https://github.com/YOUR_USERNAME/digital-helper-agency.git
```
*Replace `YOUR_USERNAME` with your GitHub username*

```bash
git push -u origin master
```
*Enter your GitHub username and password/token*

**Now continue to Step 4**

---

## Step 4: Connect to Hostinger via SSH

**In your terminal, copy and paste this (replace with YOUR details):**

```bash
ssh u123456789@ssh.hostinger.com -p 65002
```

- Type `yes` when asked about fingerprint
- Enter your Hostinger password (you won't see it typing - that's normal!)
- You're now connected! You'll see: `u123456789@server-name:~$`

---

## Step 5: Set Up Your Website on Hostinger

**Copy and paste these commands ONE AT A TIME:**

### Navigate to your domain folder
```bash
cd domains/digital-helper.com/
```

### If you used Git (Option B), clone your repository
```bash
git clone https://github.com/YOUR_USERNAME/digital-helper-agency.git .
```
*Replace `YOUR_USERNAME` - don't forget the `.` at the end!*

### Install dependencies (takes 2-5 minutes)
```bash
npm install --legacy-peer-deps
```

### Create environment file
```bash
cp .env.example .env
```

### Edit environment file
```bash
nano .env
```

**You'll see a text editor:**
1. Replace `your_gemini_api_key_here` with your actual API key
2. Press `Ctrl+X`
3. Press `Y`
4. Press `Enter`

### Build your website
```bash
npm run build
```

### Install PM2 (keeps your site running 24/7)
```bash
npm install -g pm2
```

### Start your website
```bash
pm2 start ecosystem.config.cjs
```

### Check if it's running
```bash
pm2 status
```
**Should show:** `digital-helper │ online` ✅

### Make PM2 auto-start on reboot
```bash
pm2 startup
```
**It will show another command - COPY IT and paste it, then press Enter**

### Save PM2 settings
```bash
pm2 save
```

### Test if your site works
```bash
curl http://localhost:3000
```
**Should show HTML code (looks messy but that's good!)**

---

## Step 6: Enable SSL (HTTPS)

**Open browser, go to:** https://hpanel.hostinger.com

1. Click on your website: `digital-helper.com`
2. Left menu → **SSL**
3. Find `digital-helper.com`
4. Toggle to **Enable**
5. Wait 5-10 minutes

---

## Step 7: Test Your Live Website!

**Open browser:** https://digital-helper.com

### Test these features:
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Chat widget responds
- ✅ Contact form works
- ✅ All pages load (SEO, Web Design, AI Agency, etc.)

---

## 🎉 Done! Your Website is Live!

Your website is now running at: **https://digital-helper.com**

---

## 🔄 How to Update Your Website Later

**When you make changes to your code:**

### On your computer:
```bash
git add .
git commit -m "My updates"
git push
```

### On Hostinger (via SSH):
```bash
ssh u123456789@ssh.hostinger.com -p 65002
cd domains/digital-helper.com/
git pull
npm run build
pm2 restart digital-helper
```

**Done!** Your updates are live.

---

## 🆘 Something Wrong?

### Website not loading?
```bash
# Check if it's running
pm2 status

# Restart it
pm2 restart digital-helper

# Check logs for errors
pm2 logs
```

### "Port already in use" error?
```bash
pm2 delete digital-helper
pm2 start ecosystem.config.cjs
pm2 save
```

### Still stuck?
- Check full guide: `DEPLOYMENT_CHECKLIST.md`
- Contact Hostinger support: https://www.hostinger.com/contact

---

## 📋 Important Commands Cheat Sheet

```bash
# Connect to server
ssh u123456789@ssh.hostinger.com -p 65002

# Go to your website folder
cd domains/digital-helper.com/

# Check PM2 status
pm2 status

# View logs
pm2 logs

# Restart website
pm2 restart digital-helper

# Rebuild website
npm run build

# Update from Git
git pull
```

---

**That's it! You're now hosting on Hostinger! 🚀**
