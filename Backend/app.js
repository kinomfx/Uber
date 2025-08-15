import express from "express";
import cors from "cors";
import Userrouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import captianRouter from "./routes/captian.routes.js";
import { router } from "./routes/maps.routes.js";
import { RideRouter } from "./routes/rides.routes.js";
const app = express();

app.use(cors({
  origin:'*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.set("view engine", "ejs"); // ✅ fixed

app.get("/", (req, res) => {
  res.send("hi");
});
app.use('/captains' , captianRouter)
app.use("/users", Userrouter); // e.g., POST /users/register
app.use('/maps' , router)
app.use('/rides' , RideRouter)
export default app;
