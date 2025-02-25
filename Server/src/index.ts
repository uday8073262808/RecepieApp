import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import connectToDB from "./db/db";
import cors from "cors";
import authRoutes from "./routes/auth";



dotenv.config();


const app: Express = express();

connectToDB();
app.use(cors());
app.use(express.json());

app.use ("/api/auth", authRoutes);



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

