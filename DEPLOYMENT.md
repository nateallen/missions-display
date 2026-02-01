# Deployment Guide - AWS EC2

This guide will help you deploy the Missions Display application to an AWS EC2 instance with automated CI/CD using GitHub Actions.

## Prerequisites

1. AWS Account with EC2 access
2. GitHub repository (already set up: https://github.com/nateallen/missions-display)
3. SSH key pair for EC2 instance

## Step 1: Launch EC2 Instance

1. **Log into AWS Console** and navigate to EC2

2. **Launch a new instance:**
   - **AMI**: Ubuntu Server 22.04 LTS
   - **Instance Type**: t2.small or larger (t2.micro may be too small for Next.js builds)
   - **Key Pair**: Create or select an existing key pair (download the .pem file)
   - **Security Group**: Configure to allow:
     - SSH (port 22) - from your IP
     - HTTP (port 80) - from anywhere
     - HTTPS (port 443) - from anywhere (if using SSL)

3. **Launch the instance** and note the public IP address

## Step 2: Configure EC2 Instance

1. **Connect to your EC2 instance:**
   ```bash
   chmod 400 your-key.pem
   ssh -i your-key.pem ubuntu@YOUR_EC2_IP
   ```

2. **Copy the setup script to EC2:**
   ```bash
   # On your local machine
   scp -i your-key.pem scripts/setup-ec2.sh ubuntu@YOUR_EC2_IP:~/
   ```

3. **Run the setup script on EC2:**
   ```bash
   # On the EC2 instance
   chmod +x setup-ec2.sh
   ./setup-ec2.sh
   ```

   This script will:
   - Install Node.js 20.x
   - Install PM2 (process manager)
   - Install and configure Nginx
   - Clone your repository
   - Build and start the application

## Step 3: Configure GitHub Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

1. **EC2_HOST**
   - Value: Your EC2 instance's public IP or domain name
   - Example: `54.123.456.789`

2. **EC2_USER**
   - Value: `ubuntu` (for Ubuntu instances)

3. **EC2_SSH_KEY**
   - Value: Contents of your private key (.pem file)
   - To get the contents:
     ```bash
     cat your-key.pem
     ```
   - Copy the entire output including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`

## Step 4: Test Deployment

1. **Manual test:**
   - Go to your GitHub repository
   - Navigate to Actions tab
   - Click "Deploy to EC2" workflow
   - Click "Run workflow" → "Run workflow"

2. **Automatic deployment:**
   - Any push to the `main` branch will trigger automatic deployment

## Step 5: Access Your Application

Visit `http://YOUR_EC2_IP` in your browser to see your deployed application!

## Optional: Set Up Custom Domain with SSL

### Add Custom Domain

1. **In your domain registrar**, create an A record pointing to your EC2 IP
2. **Update Nginx configuration** to use your domain name

### Add SSL Certificate (Let's Encrypt)

```bash
# On EC2 instance
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will automatically configure SSL and set up auto-renewal.

## Environment Variables

If your application needs environment variables:

1. **On EC2**, create `.env.local` file:
   ```bash
   cd /home/ubuntu/missions-display
   nano .env.local
   ```

2. **Add your environment variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-api.com
   # Add other variables as needed
   ```

3. **Restart the application:**
   ```bash
   pm2 restart missions-display
   ```

## Useful PM2 Commands

```bash
# View application logs
pm2 logs missions-display

# Restart application
pm2 restart missions-display

# Stop application
pm2 stop missions-display

# View application status
pm2 status

# Monitor resources
pm2 monit
```

## Troubleshooting

### Application not starting
```bash
# Check PM2 logs
pm2 logs missions-display

# Check if port 3000 is in use
sudo lsof -i :3000
```

### Nginx not working
```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test Nginx configuration
sudo nginx -t
```

### Deployment fails
- Check GitHub Actions logs in the Actions tab
- Verify GitHub secrets are set correctly
- Ensure EC2 security group allows SSH from GitHub's IP ranges

## Updating the Application

After pushing changes to GitHub:
1. Changes are automatically deployed via GitHub Actions
2. Or manually run: `git pull && npm ci && npm run build && pm2 restart missions-display`

## Cost Optimization

- **Use t2.small or t3.small** for better performance during builds
- **Enable auto-scaling** if you expect variable traffic
- **Use CloudFront CDN** to reduce EC2 load and improve global performance
- **Consider AWS Amplify** or **Vercel** for simpler Next.js hosting (alternative to EC2)

## Alternative: Deploy to Vercel (Recommended for Next.js)

Vercel provides simpler deployment for Next.js apps:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Vercel offers:
- Automatic CI/CD from GitHub
- Global CDN
- Automatic SSL
- Zero configuration
- Free tier available

For production applications, Vercel is often easier than managing EC2.
