#!/bin/bash
# Deployment script for Admin API Cloud Function

echo "Deploying Admin API Cloud Function..."

# Set your project ID
PROJECT_ID="your-project-id"
REGION="us-central1"
FUNCTION_NAME="adminApi"

# Deploy the function
gcloud functions deploy $FUNCTION_NAME \
  --gen2 \
  --runtime=nodejs18 \
  --region=$REGION \
  --source=. \
  --entry-point=adminApi \
  --trigger=http \
  --allow-unauthenticated \
  --set-env-vars ADMIN_PASSWORD=admin123,ADMIN_TOKEN=admin-token-123,CONTENT_BUCKET=venus-tech-content

echo "Deployment complete!"
echo "Function URL will be displayed above."

