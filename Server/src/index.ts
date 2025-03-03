//index.ts




import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import connectToDB from "./db/db";
import cors from "cors";
import authRoutes from "./routes/auth";
import recipeRoutes from "./routes/recipes";




dotenv.config();


const app: Express = express();

connectToDB();
app.use(cors());
app.use(express.json());

app.use ("/api/auth", authRoutes);
app.use ("/api/recipe", recipeRoutes);



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

