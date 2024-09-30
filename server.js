#!/usr/bin/node
import express from 'express';
import routes from './routes/index';
import errorHandler from './middleware/errorHandler';
import { logger } from './utils/logger';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', routes);
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

export default app; // Export for testing
