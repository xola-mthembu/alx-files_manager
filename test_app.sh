#!/bin/bash

# Start the server and worker in the background
npm run start-server &
npm run start-worker &

# Wait for the server to start
sleep 5

# Test user creation
echo "Creating user..."
USER_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "password123"}' http://localhost:5000/users)
USER_ID=$(echo $USER_RESPONSE | jq -r '.id')

# Test authentication
echo "Authenticating..."
AUTH_RESPONSE=$(curl -s -H "Authorization: Basic $(echo -n 'test@example.com:password123' | base64)" http://localhost:5000/connect)
TOKEN=$(echo $AUTH_RESPONSE | jq -r '.token')

# Test file upload
echo "Uploading file..."
FILE_RESPONSE=$(curl -s -X POST -H "X-Token: $TOKEN" -H "Content-Type: application/json" -d '{"name": "test.txt", "type": "file", "data": "SGVsbG8gV29ybGQh"}' http://localhost:5000/files)
FILE_ID=$(echo $FILE_RESPONSE | jq -r '.id')

# Test get file
echo "Getting file..."
curl -s -H "X-Token: $TOKEN" http://localhost:5000/files/$FILE_ID

# Test publish file
echo "Publishing file..."
curl -s -X PUT -H "X-Token: $TOKEN" http://localhost:5000/files/$FILE_ID/publish

# Test get file data
echo "Getting file data..."
curl -s -H "X-Token: $TOKEN" http://localhost:5000/files/$FILE_ID/data

# Clean up
echo "Cleaning up..."
kill $(jobs -p)
