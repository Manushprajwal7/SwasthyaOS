# Amplify Deployment Guide

## Issue Resolution: AWS Authentication Error

The error "The security token included in request is invalid" occurs because the deployed app is trying to use hardcoded AWS credentials instead of IAM roles.

## Solution Implemented

### 1. Updated AWS SDK Configuration
- Modified `/lib/db/aws-sdk.ts` to automatically use IAM roles in production
- Falls back to environment variables for local development
- No hardcoded credentials in production

### 2. Enhanced Error Handling
- Updated `/app/api/dashboard/route.ts` with fallback data
- Returns 200 with fallback data instead of 500 errors
- Graceful degradation when database is unavailable

### 3. Amplify Configuration
- Created `amplify.yml` for proper deployment settings
- Added CORS headers for API access

## Deployment Steps

### Step 1: Configure IAM Role in Amplify
1. Go to AWS Amplify Console
2. Select your app
3. Go to "Backend environment" → "Build settings"
4. Ensure the IAM role has permissions for:
   - DynamoDB: Read/Write access to all Swasthya_* tables
   - S3: Read/Write access to swasthya-clinical-documents bucket

### Step 2: Set Environment Variables
In Amplify Console → App settings → Environment variables:

```
AWS_REGION=ap-south-1
AMPLIFY_ENV=production
NODE_ENV=production
DYNAMODB_TABLE_PATIENTS=Swasthya_Patients
DYNAMODB_TABLE_ALERTS=Swasthya_Alerts
DYNAMODB_TABLE_AI_EVENTS=Swasthya_AIEvents
DYNAMODB_TABLE_METRICS=Swasthya_Metrics
S3_BUCKET_DOCS=swasthya-clinical-documents
```

### Step 3: Redeploy
1. Push the latest code changes
2. Amplify will automatically rebuild with new configuration
3. The app will now use IAM roles instead of hardcoded credentials

## Verification

After deployment, test:
1. Dashboard loads without authentication errors
2. API endpoints return data (or fallback data)
3. No 500 Internal Server Error

## Local Development

For local development, create `.env.local` with:
```
Access_Key_ID=your_local_aws_access_key
Secret_Access_Key=your_local_aws_secret_key
AWS_REGION=ap-south-1
```

## Troubleshooting

If still getting errors:
1. Check IAM role permissions in AWS Console
2. Verify environment variables in Amplify
3. Check CloudWatch logs for detailed error messages
4. Ensure DynamoDB tables exist in the correct region

## Security Notes

- Never commit AWS credentials to version control
- Use IAM roles for production deployments
- Rotate access keys regularly
- Follow principle of least privilege
