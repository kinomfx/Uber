import dotenv from "dotenv"
dotenv.config()
import http from "http"
import app from "./app.js"
import ConnectDB from "./db/db.js"

const server = http.createServer(app)
ConnectDB()

server.listen(process.env.PORT || 5000 ,()=>{
    console.log("server is listening on Port" , process.env.PORT)
})