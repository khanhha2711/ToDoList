import express, { json } from "express";
import router from "./routes/taskRouters.js";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import path from "path";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
//midlewares
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

//router
app.use("/api/tasks", router);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

//create PORT
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Connecting with port: ${PORT}`);
  });
});
