# ALX Files Manager

This project is a summary of this back-end trimester: authentication, NodeJS, MongoDB, Redis, pagination and background processing.

The objective is to build a simple platform to upload and view files:

- User authentication via a token
- List all files
- Upload a new file
- Change permission of a file
- View a file
- Generate thumbnails for images

## Files in the Project

- `server.js`: Main application file
- `routes/index.js`: Route definitions
- `controllers/AppController.js`: App-related controller functions
- `controllers/UsersController.js`: User-related controller functions
- `controllers/AuthController.js`: Authentication-related controller functions
- `controllers/FilesController.js`: File-related controller functions
- `utils/redis.js`: Redis client utility
- `utils/db.js`: MongoDB client utility
- `worker.js`: Background worker for processing jobs
- `.eslintrc.js`: ESLint configuration
- `babel.config.js`: Babel configuration
- `package.json`: Project dependencies and scripts
