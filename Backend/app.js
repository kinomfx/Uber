import express from "express"
import cors from "cors"
const app = express()
app.use(cors())
app.set('view-engine' , 'ejs')
app.get('/' , (req , res)=>{
    res.send('hi')
})

export default app;