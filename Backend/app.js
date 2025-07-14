import express from "express";
import cors from "cors";
import Userrouter from "./routes/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // ✅ fixed

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/users", Userrouter); // e.g., POST /users/register

export default app;
