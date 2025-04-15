import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})
import connectDB from './db/index.js'
import app from './app.js'


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8080, ()=>{
        console.log('server is running on Port:', `${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("MONGODB Connection Error: " , err);
})