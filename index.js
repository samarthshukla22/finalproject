import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors'
import bodyParser from "body-parser"
import userRoutes from './routes/user.js'
import videoRoutes from './routes/video.js'
import commentsRoutes from './routes/comments.js'
import path from 'path'

dotenv.config()


const app = express()
app.use(cors("*"))
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use('/uploads',express.static(path.join('uploads')))


// var __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './youtube/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './youtube/build/index.html'))
);


app.use(bodyParser.json())

app.use('/user',userRoutes)
app.use('/video',videoRoutes)
app.use('/comment',commentsRoutes)

const PORT= process.env.PORT
console.log(PORT)


app.listen(PORT,()=>{
    console.log(`Server Running on the PORT ${PORT}`)
})


const DB_URL = process.env.CONNECTION_URL
// const DB_URL = "mongodb+srv://samarth:samarth@cluster0.8wrzgm7.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(DB_URL,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("MongoDB database connected")
}).catch((error)=>{
    console.log(error)
})