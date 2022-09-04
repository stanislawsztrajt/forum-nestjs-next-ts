import * as dotenv from 'dotenv';
import mongoose, { FilterQuery } from 'mongoose';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);
const connect = mongoose.connection;

export const findOneByCollectionName = async (
  collectionName: string,
  query: FilterQuery<unknown>,
) => {
  const collectionModel = connect.db.collection(collectionName);
  return await collectionModel.findOne(query);
};
