import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import docsRouter from "./routes/documents.routes.js";

const app = express();

app.use(cors());
app.use(express.json());   // move this ABOVE routers


mongoose.connect("mongodb+srv://saiprasad45_db:Spr1414@cluster0.9vk9cu7.mongodb.net/Meili");

app.use("/api/docs", docsRouter);

export default app;
