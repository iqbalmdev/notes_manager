# 🔑 AWS Credentials Setup Guide

## **Method 1: AWS CLI Configuration (Easiest)**

### Step 1: Install AWS CLI
```bash
# macOS
brew install awscli

# Windows
# Download from: https://aws.amazon.com/cli/

# Linux
sudo apt-get install awscli
```

### Step 2: Configure Credentials
```bash
aws configure
```

**You'll be prompted to enter:**
```
AWS Access Key ID [None]: AKIA...
AWS Secret Access Key [None]: wJalrXUtn...
Default region name [None]: us-east-1
Default output format [None]: json
```

### Step 3: Verify Configuration
```bash
aws sts get-caller-identity
```

---

## **Method 2: Environment Variables**

### Option A: Add to Shell Profile
```bash
# Add to ~/.bashrc or ~/.zshrc
export AWS_ACCESS_KEY_ID=your_access_key_here
export AWS_SECRET_ACCESS_KEY=your_secret_key_here
export AWS_DEFAULT_REGION=us-east-1
export CDK_DEFAULT_ACCOUNT=your_aws_account_id
export CDK_DEFAULT_REGION=us-east-1
```

### Option B: Create .env file
```bash
# Create .env file in infrastructure folder
echo "AWS_ACCESS_KEY_ID=your_access_key_here" > .env
echo "AWS_SECRET_ACCESS_KEY=your_secret_key_here" >> .env
echo "AWS_DEFAULT_REGION=us-east-1" >> .env
echo "CDK_DEFAULT_ACCOUNT=your_aws_account_id" >> .env
echo "CDK_DEFAULT_REGION=us-east-1" >> .env
```

---

## **Method 3: AWS Profiles**

### Create Named Profile
```bash
aws configure --profile notes-manager
```

### Use the Profile
```bash
export AWS_PROFILE=notes-manager
```

---

## **How to Get AWS Credentials**

### Step 1: Go to AWS Console
1. Open [AWS Console](https://console.aws.amazon.com)
2. Sign in to your account

### Step 2: Navigate to IAM
1. Search for "IAM" in the search bar
2. Click on "IAM" service

### Step 3: Create Access Key
1. Click "Users" in the left sidebar
2. Click on your username
3. Go to "Security credentials" tab
4. Scroll down to "Access keys" section
5. Click "Create access key"
6. Choose "Command Line Interface (CLI)"
7. Check the confirmation box
8. Click "Next"
9. Add a description tag (optional)
10. Click "Create access key"

### Step 4: Copy Credentials
**⚠️ IMPORTANT: Copy these immediately - you won't see them again!**
- **Access Key ID**: `AKIA...`
- **Secret Access Key**: `wJalrXUtn...`

---

## **Quick Setup Commands**

### For macOS/Linux:
```bash
# 1. Install AWS CLI
brew install awscli

# 2. Configure credentials
aws configure

# 3. Verify setup
aws sts get-caller-identity

# 4. Install CDK
npm install -g aws-cdk

# 5. Deploy frontend
cd infrastructure
./scripts/deploy-frontend.sh
```

### For Windows:
```powershell
# 1. Install AWS CLI (download from AWS website)
# 2. Open Command Prompt or PowerShell
# 3. Configure credentials
aws configure

# 4. Verify setup
aws sts get-caller-identity

# 5. Install CDK
npm install -g aws-cdk

# 6. Deploy frontend
cd infrastructure
./scripts/deploy-frontend.sh
```

---

## **Troubleshooting**

### Check if credentials are set:
```bash
aws configure list
```

### Test AWS connection:
```bash
aws sts get-caller-identity
```

### Check CDK setup:
```bash
cdk --version
```

### If you get permission errors:
- Make sure your AWS user has the required permissions
- Check the IAM policies attached to your user
- Ensure you're using the correct region

---

## **Security Best Practices**

1. **Never commit credentials to git**
2. **Use IAM roles when possible**
3. **Rotate access keys regularly**
4. **Use least privilege principle**
5. **Enable MFA on your AWS account**

---

## **Next Steps After Setup**

1. **Verify credentials**: `aws sts get-caller-identity`
2. **Bootstrap CDK**: `cdk bootstrap`
3. **Deploy frontend**: `./scripts/deploy-frontend.sh`
4. **Check deployment**: Visit the CloudFront URL
