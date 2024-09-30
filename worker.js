#!/usr/bin/node
import Bull from 'bull';
import imageThumbnail from 'image-thumbnail';
import fs from 'fs';
import { ObjectId } from 'mongodb';
import dbClient from './utils/db';

const fileQueue = new Bull('fileQueue');
const userQueue = new Bull('userQueue');

async function generateThumbnail(width, localPath) {
  const thumbnail = await imageThumbnail(localPath, { width });
  const thumbnailPath = `${localPath}_${width}`;
  await fs.promises.writeFile(thumbnailPath, thumbnail);
}

fileQueue.process(async (job) => {
  const { userId, fileId } = job.data;
  if (!fileId) {
    throw new Error('Missing fileId');
  }
  if (!userId) {
    throw new Error('Missing userId');
  }

  const file = await dbClient.client.db().collection('files').findOne({
    _id: ObjectId(fileId),
    userId: ObjectId(userId),
  });

  if (!file) {
    throw new Error('File not found');
  }

  const sizes = [500, 250, 100];
  await Promise.all(sizes.map((size) => generateThumbnail(size, file.localPath)));
});

userQueue.process(async (job) => {
  const { userId } = job.data;
  if (!userId) {
    throw new Error('Missing userId');
  }

  const user = await dbClient.client.db().collection('users').findOne({
    _id: ObjectId(userId),
  });

  if (!user) {
    throw new Error('User not found');
  }

  console.log(`Welcome ${user.email}!`);
});
