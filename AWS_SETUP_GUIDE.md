# AWS Setup Guide for SwasthyaOS

This guide provides step-by-step instructions to set up the necessary AWS services and connect your Next.js application.

## Prerequisites
- An active AWS Account.
- AWS CLI installed and configured (optional but recommended).

---

## 1. Amazon Bedrock (AI Layer)
SwasthyaOS uses **Claude 3 Sonnet** via Amazon Bedrock for medical intelligence.

### Enable Model Access
1.  Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2.  Search for **Amazon Bedrock**.
3.  In the left navigation pane, scroll down to **Model access**.
4.  Click **Manage model access**.
5.  Find **Anthropic** -> **Claude 3 Sonnet**.
6.  Select the checkbox and click **Save changes**.
    > [!NOTE]
    > It may take a few minutes for access to be granted.

---

## 2. Amazon DynamoDB (Data Layer)
SwasthyaOS stores clinical records in DynamoDB.

### Create Tables
1.  Search for **DynamoDB**.
2.  Click **Create table**.
3.  **Table 1: Patients**
    - **Table name**: `Swasthya_Patients`
    - **Partition key**: `id` (String)
    - Click **Create table**.
4.  **Table 2: Appointments** (Optional/Future)
    - **Table name**: `Swasthya_Appointments`
    - **Partition key**: `id` (String)
    - Click **Create table**.

---

## 3. Amazon S3 (Storage Layer)
Used for storing clinical documents (reports, images).

### Create Bucket
1.  Search for **S3**.
2.  Click **Create bucket**.
3.  **Bucket name**: `swasthya-clinical-documents` (must be globally unique).
4.  **Region**: `ap-south-1` (Mumbai) - recommended for data residency.
5.  Keep other settings default and click **Create bucket**.

---

## 4. IAM (Identity & Access)
Create a user for the application to interact with AWS.

### Create IAM User
1.  Search for **IAM**.
2.  Click **Users** -> **Create user**.
3.  **User name**: `SwasthyaOS-App`.
4.  Select **Provide user access to the AWS Management Console** - *Unchecked* (Programmatic access only).
5.  Click **Next**.
6.  **Permissions**: Select **Attach policies directly**.
7.  Attach the following managed policies:
    - `AmazonBedrockFullAccess`
    - `AmazonDynamoDBFullAccess`
    - `AmazonS3FullAccess`
8.  Click **Next** -> **Create user**.

### Generate Access Keys
1.  Click on the newly created user `SwasthyaOS-App`.
2.  Select the **Security credentials** tab.
3.  In the **Access keys** section, click **Create access key**.
4.  Select **Application running outside AWS**.
5.  Click **Next** -> **Create access key**.
6.  **CRITICAL**: Copy the **Access key ID** and **Secret access key**. You will not see them again.

---

## 5. Connecting Next.js to AWS
Update your local environment to bridge the app to AWS.

### Configure Environment Variables
1.  Open `.env.local` in your project root.
2.  Add the following keys (replace placeholders with your IAM keys):

```env
# AWS Configuration
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here

# DynamoDB Table Names
DYNAMODB_TABLE_PATIENTS=Swasthya_Patients
DYNAMODB_TABLE_APPOINTMENTS=Swasthya_Appointments

# S3 Bucket Name
S3_BUCKET_DOCS=swasthya-clinical-documents
```

3.  Restart your development server:
    ```bash
    npm run dev
    ```

---

## 7. Seeding Data (Populate your Dashboard)
To see your application behave as a real full-stack app, you can seed your DynamoDB tables with dummy clinical data.

### Run the Seeding Script
1.  Ensure your `.env.local` has the correct `Access_Key_ID` and `Secret_Access_Key`.
2.  Open your terminal in the project root.
3.  Run the following command:
    ```bash
    npx tsx scripts/seed-dynamodb.ts
    ```
4.  **Verify**: Log in to the [DynamoDB Console](https://console.aws.amazon.com/dynamodbv2/home#tables), select `Swasthya_Patients`, and click **Explore table items**. You should see 6 patient records.

---

## 8. Development Workflow
To run the app locally with AWS services:
1.  `npm install` - ensure all SDKs are present.
2.  `npm run dev` - starts the Next.js dev server.
3.  All AI components will now call Bedrock and the patient list will fetch from DynamoDB.

---

## 6. Deployment to AWS Amplify
Amplify is the recommended way to host Next.js apps on AWS with full support for SSR and App Router.

### Connect Your Repository
1.  Search for **AWS Amplify**.
2.  Click **Create new app** -> **GitHub** (or your preferred provider).
3.  Authorize AWS Amplify and select your `SwasthyaOS` repository and branch.

### Configure Build & Variables
1.  **Build settings**: Amplify should automatically detect Next.js. Ensure the "Build command" is `npm run build` and "Output directory" is `.next`.
2.  **Environment variables**: This is the most important step for the app to work.
    - Click **Advanced settings** or find **Environment variables** in the side menu.
    - Add ALL the keys from your `.env.local`:
        - `AWS_REGION`: `ap-south-1`
        - `AWS_ACCESS_KEY_ID`: (Your IAM User Access Key)
        - `AWS_SECRET_ACCESS_KEY`: (Your IAM User Secret Key)
        - `DYNAMODB_TABLE_PATIENTS`: `Swasthya_Patients`
        - `S3_BUCKET_DOCS`: (Your Bucket Name)
3.  Click **Save and deploy**.

### Finalizing
- Amplify will provide a `https://master.xxxx.amplifyapp.com` URL.
- Once the build is green, your medical AI dashboard is live!

---

## Alternative: Deploy to EC2/ECS
If you require more control (e.g., custom Docker containers or high-traffic scaling):
1.  Use **AWS App Runner** for a managed container experience.
2.  Use **Amazon ECS (Fargate)** for complex microservices.
3.  Note that these require setting up a VPC and may involve more configuration than Amplify.

---

## Troubleshooting
- **Bedrock Errors**: Ensure you are in a region where Bedrock is available (e.g., US-East-1, US-West-2, or AP-South-1).
- **Access Denied**: Double-check the IAM user policies and ensure the Access Keys are correct in `.env.local`.
- **Table Not Found**: Verify that the table names in `.env.local` exactly match the names in the AWS Console.
