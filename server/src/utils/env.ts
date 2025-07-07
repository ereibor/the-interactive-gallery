import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}


export const MONGODB_URI = process.env.MONGODB_URI 

