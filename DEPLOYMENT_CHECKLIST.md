# ✅ Hostinger Deployment Checklist

Use this checklist to ensure you complete all steps correctly.

---

## 📦 Before You Start

- [ ] You have Hostinger Cloud Startup plan
- [ ] SSH is enabled in Hostinger panel
- [ ] You have your Gemini API key ready
- [ ] Domain DNS is pointed to Hostinger (can take 24-48 hours to propagate)

---

## 🚀 Pre-Deployment (On Your Computer)

### Test Locally First

**Open your terminal/command prompt in the project folder and run these commands:**

- [ ] Install dependencies (copy and paste this command):
  ```bash
  npm install --legacy-peer-deps
  ```

- [ ] Build the frontend (copy and paste this command):
  ```bash
  npm run build
  ```

- [ ] Create `.env` file:
  - **Windows:** Right-click in folder → New → Text Document → Name it `.env` (delete `.txt`)
  - **Mac:** Use TextEdit or run: `touch .env`
  - Open `.env` and add this line (replace with your actual key):
  ```
  GEMINI_API_KEY=your_actual_api_key_here
  ```

- [ ] Start the server (copy and paste this command):
  ```bash
  npm start
  ```

- [ ] Open your browser and visit `http://localhost:3000` - test everything:
  - [ ] All pages load
  - [ ] Chat widget works
  - [ ] Contact form AI draft works
  - [ ] Website audit works

- [ ] Press `Ctrl+C` in terminal to stop the server

### Save Your Changes to GitHub (Optional but Recommended)

**If you want to use Git to upload (easier for updates later):**

- [ ] Check what files changed (copy and paste this command):
  ```bash
  git status
  ```

- [ ] Add all files to Git (copy and paste this command):
  ```bash
  git add .
  ```

- [ ] Commit the changes (copy and paste this command):
  ```bash
  git commit -m "Prepare for Hostinger deployment"
  ```

- [ ] Create a GitHub repository:
  1. Go to https://github.com/new
  2. Name it `digital-helper-agency`
  3. Click "Create repository"
  4. **Don't** check any boxes (no README, no .gitignore)

- [ ] Copy the repository URL (looks like: `https://github.com/YOUR_USERNAME/digital-helper-agency.git`)

- [ ] Connect your local code to GitHub (copy and paste, replace YOUR_USERNAME):
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/digital-helper-agency.git
  ```

- [ ] Push code to GitHub (copy and paste this command):
  ```bash
  git push -u origin master
  ```

- [ ] If it asks for username/password:
  - Username: Your GitHub username
  - Password: Use a Personal Access Token (not your GitHub password)
  - Get token here: https://github.com/settings/tokens (create new token, select "repo" scope)

---

## 📤 Upload to Hostinger

### Choose One Method:

#### Method A: File Manager Upload (Simpler, No Git Required)

- [ ] Build your site first (copy and paste this command):
  ```bash
  npm run build
  ```

- [ ] Create a ZIP file of your project:

  **Windows:**
  1. Select these files/folders in File Explorer:
     - `dist` folder
     - `api` folder
     - `server.js`
     - `package.json`
     - `ecosystem.config.cjs`
     - `.env.example`
     - `node_modules` folder (optional, can install later)
  2. Right-click → Send to → Compressed (zipped) folder
  3. Name it `digital-helper.zip`

  **Mac:**
  1. Select the same files/folders in Finder
  2. Right-click → Compress Items
  3. Rename to `digital-helper.zip`

- [ ] Log into Hostinger dashboard: https://hpanel.hostinger.com

- [ ] Go to: Files → File Manager

- [ ] Navigate to: `domains/digital-helper.com/`

- [ ] Click "Upload" button (top right)

- [ ] Select your `digital-helper.zip` file

- [ ] Wait for upload to complete

- [ ] Right-click the ZIP file → Extract

- [ ] Choose extract location: `/domains/digital-helper.com/`

- [ ] Delete the ZIP file after extraction

#### Method B: Git Clone (Recommended - Easier for Updates)

**You must complete the GitHub steps above first!**

- [ ] Log into Hostinger dashboard: https://hpanel.hostinger.com

- [ ] Go to: Advanced → SSH Access

- [ ] Make sure SSH is **Enabled**

- [ ] Note down these details:
  - **Server:** (something like `ssh.hostinger.com`)
  - **Port:** (usually `65002`)
  - **Username:** (something like `u123456789`)
  - **Password:** (your Hostinger password)

- [ ] Open terminal/command prompt on your computer

- [ ] Connect to Hostinger (copy and paste, replace with YOUR details):
  ```bash
  ssh u123456789@ssh.hostinger.com -p 65002
  ```
  - Type `yes` when asked about fingerprint
  - Enter your Hostinger password (won't show as you type - that's normal!)

- [ ] You're now inside Hostinger server! Navigate to your domain folder:
  ```bash
  cd domains/digital-helper.com/
  ```

- [ ] Check if folder is empty:
  ```bash
  ls
  ```

- [ ] Clone your GitHub repository (replace YOUR_USERNAME with your GitHub username):
  ```bash
  git clone https://github.com/YOUR_USERNAME/digital-helper-agency.git .
  ```
  - The `.` at the end means "clone into current folder"
  - If it asks for username/password, use your GitHub credentials

---

## 🔧 On Hostinger Server (via SSH)

**NOTE:** If you used Method A (File Manager Upload), you still need to do these steps via SSH!

### Connect to Server (if not already connected)

- [ ] Open terminal/command prompt

- [ ] Connect to Hostinger (copy and paste, replace with YOUR credentials):
  ```bash
  ssh u123456789@ssh.hostinger.com -p 65002
  ```
  - Enter your password when prompted
  - You should see something like: `u123456789@server-name:~$`

### Initial Setup

- [ ] Navigate to your domain folder (copy and paste this command):
  ```bash
  cd domains/digital-helper.com/
  ```

- [ ] Check if files are there (copy and paste this command):
  ```bash
  ls -la
  ```
  - You should see: `api/`, `dist/`, `server.js`, `package.json`, etc.

- [ ] Install Node.js dependencies (copy and paste - this takes a few minutes):
  ```bash
  npm install --legacy-peer-deps
  ```
  - Wait for it to finish (might take 2-5 minutes)

- [ ] Create environment file (copy and paste this command):
  ```bash
  cp .env.example .env
  ```

- [ ] Edit the environment file (copy and paste this command):
  ```bash
  nano .env
  ```
  - You'll see a text editor open
  - Replace `your_gemini_api_key_here` with your actual API key
  - **Save and exit:**
    1. Press `Ctrl+X`
    2. Press `Y` (to confirm save)
    3. Press `Enter` (to confirm filename)

- [ ] Build the frontend (copy and paste this command):
  ```bash
  npm run build
  ```
  - This creates the `dist/` folder with your website files

- [ ] Verify the build worked (copy and paste this command):
  ```bash
  ls -la dist/
  ```
  - You should see files like `index.html`, `assets/`, etc.

### Install PM2 (Process Manager)

**PM2 keeps your website running 24/7**

- [ ] Install PM2 globally (copy and paste this command):
  ```bash
  npm install -g pm2
  ```

- [ ] Start your website (copy and paste this command):
  ```bash
  pm2 start ecosystem.config.cjs
  ```
  - Should say: "Process successfully started"

- [ ] Check if it's running (copy and paste this command):
  ```bash
  pm2 status
  ```
  - Should show: `digital-helper │ online`
  - If it says "errored", run: `pm2 logs` to see what's wrong

- [ ] View the logs to make sure no errors (copy and paste this command):
  ```bash
  pm2 logs
  ```
  - Should show: "Digital Helper server running on port 3000"
  - Press `Ctrl+C` to stop viewing logs

- [ ] Make PM2 start automatically on server reboot (copy and paste this command):
  ```bash
  pm2 startup
  ```
  - It will output another command - **copy that entire command and paste it, then press Enter**
  - Example output: `sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u u123456789 --hp /home/u123456789`

- [ ] Save the PM2 process list (copy and paste this command):
  ```bash
  pm2 save
  ```
  - Should say: "Successfully saved"

---

## 🌐 Configure Domain

### Verify Server is Running

**Make sure you're still connected via SSH**

- [ ] Test if your site is running (copy and paste this command):
  ```bash
  curl http://localhost:3000
  ```
  - Should show HTML code (looks messy - that's normal!)
  - If you see HTML, it's working! 🎉

### Enable SSL (HTTPS) in Hostinger Panel

**Open a new browser tab - keep your SSH session open**

- [ ] Go to Hostinger dashboard: https://hpanel.hostinger.com

- [ ] Click on your website: `digital-helper.com`

- [ ] On the left menu, find and click: **SSL**

- [ ] Find `digital-helper.com` in the list

- [ ] Click the toggle to **Enable SSL**

- [ ] Wait 5-10 minutes for SSL to activate
  - You can continue to the testing section while you wait
  - SSL activation is automatic

### Domain Configuration (Usually Auto-Configured)

- [ ] Most Hostinger Cloud plans automatically configure the web server
- [ ] Your site should be accessible once SSL is active
- [ ] If your site doesn't load after 15 minutes, contact Hostinger support

---

## ✅ Testing & Verification

### Test Your Live Site

- [ ] Visit `http://digital-helper.com` (should redirect to HTTPS)
- [ ] Visit `https://digital-helper.com` (should load your site)

### Test All Features

- [ ] Homepage loads
- [ ] Navigate to `/seo` - loads correctly
- [ ] Navigate to `/web-design` - loads correctly
- [ ] Navigate to `/ai-agency` - loads correctly
- [ ] Navigate to `/case-studies` - loads correctly
- [ ] Navigate to `/pricing` - loads correctly
- [ ] Navigate to `/features` - loads correctly
- [ ] Chat widget appears and responds
- [ ] Contact form "AI Auto-Draft" button works
- [ ] Website Audit section works
- [ ] No errors in browser console (F12 → Console)
- [ ] Google Map shows in Contact section

### Test API Endpoints

From your local computer:

```bash
curl -X POST https://digital-helper.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "test", "history": []}'
```

- [ ] Returns JSON with chat response (not an error)

### Verify PM2 on Server

SSH back in and check:

- [ ] `pm2 status` shows "online"
- [ ] `pm2 logs` shows no errors
- [ ] `pm2 monit` shows reasonable CPU/memory usage

---

## 🔍 SEO Verification

- [ ] Visit Google Search Console: https://search.google.com/search-console
- [ ] Add property for `digital-helper.com`
- [ ] Submit sitemap: `https://digital-helper.com/sitemap.xml`
- [ ] Test schema markup: https://search.google.com/test/rich-results
  - [ ] Paste your homepage URL
  - [ ] Should show LocalBusiness schema

---

## 📊 Performance Check

- [ ] Test site speed: https://pagespeed.web.dev/
  - [ ] Enter `https://digital-helper.com`
  - [ ] Should score 90+ on Performance (Mobile & Desktop)
- [ ] Test all pages load in under 3 seconds

---

## 🔐 Security Check

- [ ] Verify `.env` file exists on server: `cat .env`
- [ ] Verify `.env` has correct permissions: `chmod 600 .env`
- [ ] Verify `.env` is in `.gitignore` (locally)
- [ ] Verify HTTPS works (green padlock in browser)
- [ ] Test API endpoints return proper error messages (not stack traces)

---

## 🎯 Post-Deployment

### Monitor for 24 Hours

- [ ] Check PM2 status periodically: `pm2 status`
- [ ] Review logs for errors: `pm2 logs --lines 100`
- [ ] Test from different devices (mobile, desktop)
- [ ] Ask friends to test the site

### Set Up Monitoring (Optional)

- [ ] Sign up for UptimeRobot: https://uptimerobot.com/
- [ ] Add monitor for `https://digital-helper.com`
- [ ] Get email alerts if site goes down

### Backups

- [ ] Enable automatic backups in Hostinger panel
- [ ] Download a manual backup of your files
- [ ] Keep a copy of `.env` file somewhere safe

---

## 🔄 Future Updates

**When you want to update your live website with new changes:**

### On Your Computer

- [ ] Make your code changes

- [ ] Test locally (copy and paste these commands):
  ```bash
  npm run build
  npm start
  ```
  - Visit http://localhost:3000 to test
  - Press `Ctrl+C` to stop the server when done testing

### If Using Git (Method B):

- [ ] Add all changes to Git (copy and paste this command):
  ```bash
  git add .
  ```

- [ ] Commit the changes (copy and paste this command):
  ```bash
  git commit -m "Update website"
  ```
  - You can change "Update website" to describe your changes

- [ ] Push to GitHub (copy and paste this command):
  ```bash
  git push
  ```

### If Using File Manager (Method A):

- [ ] Build your changes (copy and paste this command):
  ```bash
  npm run build
  ```

- [ ] Create a new ZIP file (same as before)

- [ ] Upload to Hostinger File Manager

- [ ] Extract and replace old files

### On Hostinger Server (Both Methods)

- [ ] Connect via SSH (copy and paste, replace with YOUR credentials):
  ```bash
  ssh u123456789@ssh.hostinger.com -p 65002
  ```

- [ ] Navigate to your site (copy and paste this command):
  ```bash
  cd domains/digital-helper.com/
  ```

- [ ] **If using Git**, pull the latest changes (copy and paste this command):
  ```bash
  git pull
  ```

- [ ] **If package.json changed**, reinstall dependencies (copy and paste this command):
  ```bash
  npm install --legacy-peer-deps
  ```

- [ ] Rebuild the frontend (copy and paste this command):
  ```bash
  npm run build
  ```

- [ ] Restart your website (copy and paste this command):
  ```bash
  pm2 restart digital-helper
  ```

- [ ] Check if it restarted successfully (copy and paste this command):
  ```bash
  pm2 status
  ```
  - Should show: `digital-helper │ online`

- [ ] Check the logs for errors (copy and paste this command):
  ```bash
  pm2 logs --lines 20
  ```
  - Press `Ctrl+C` to stop viewing logs

- [ ] Test your live website: https://digital-helper.com

---

## 🆘 Troubleshooting

If something goes wrong:

1. **Check PM2 logs:**
   ```bash
   pm2 logs digital-helper --lines 50
   ```

2. **Restart the app:**
   ```bash
   pm2 restart digital-helper
   ```

3. **Check if process is running:**
   ```bash
   pm2 status
   ```

4. **If totally stuck, rebuild:**
   ```bash
   pm2 delete digital-helper
   npm run build
   pm2 start ecosystem.config.cjs
   pm2 save
   ```

5. **Contact Hostinger Support:**
   - https://www.hostinger.com/contact
   - Have your domain and error logs ready

---

## ✅ Deployment Complete!

When all items are checked:

🎉 **Congratulations!** Your site is live at **https://digital-helper.com**

---

## 📝 Important Files Reference

- `HOSTINGER_DEPLOYMENT.md` - Full deployment guide
- `MIGRATION_SUMMARY.md` - What changed from Vercel
- `ecosystem.config.cjs` - PM2 configuration
- `.env.example` - Environment variables template
- `server.js` - Express server code

---

**Need help?** See `HOSTINGER_DEPLOYMENT.md` for detailed instructions!
