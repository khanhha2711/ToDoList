import express, { json } from "express";
import router from "./routes/taskRouters.js";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001;

//midlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

//router
app.use("/api/tasks", router);

//create PORT
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Connecting with port: ${PORT}`);
  });
});
