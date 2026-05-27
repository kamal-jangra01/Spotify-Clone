import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/song.route.js";
import connectDB from "./src/config/mongoDB.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/album.route.js";

// app config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middleware

app.use(express.json());
app.use(cors());

// initializing routes

app.use("/api/song", songRouter);

app.use("/api/album", albumRouter);

app.get("/", (req, res) => res.send("API WORKING"));

app.listen(port, () => console.log(`server started on ${port}`));
