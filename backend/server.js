import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.routes.js';
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(postRoutes);
app.use(userRoutes);
app.use(express.static('upload'));

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

const start = async () => {
  try {
    const connectDB = await mongoose.connect(MONGO_URL);
    console.log(`MongoDB connected: ${connectDB.connection.host}`);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();