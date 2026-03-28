dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.routes.js';
import userRoutes from "./routes/users.routes.js";







const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(postRoutes);
app.use(userRoutes);
app.use(express.static('upload'));


const start = async () => {
    const connectDB = await mongoose.connect("mongodb+srv://harshguptacse22_db_user:S10OJTPtblvW8Hr8@uplink.kdrfffh.mongodb.net/?appName=uplink");
console.log(`MongoDB connected: ${connectDB.connection.host}`);

    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    })
}
start();