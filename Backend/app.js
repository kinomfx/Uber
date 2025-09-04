import express from "express";
import Userrouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import captianRouter from "./routes/captian.routes.js";
import { router } from "./routes/maps.routes.js";
import { RideRouter } from "./routes/rides.routes.js";
import cors from "cors";
const app = express();

app.use(cors({
  origin: [
        "http://localhost:5173",            
        "https://uber-lemon-one.vercel.app" ,
        "https://uber-nq5vth6pq-moniks-projects-f54a1c98.vercel.app"
      ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
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
