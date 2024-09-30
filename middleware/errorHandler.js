#!/usr/bin/node
import { logger } from '../utils/logger';

export default function errorHandler(err, req, res, next) {
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
  });
}
