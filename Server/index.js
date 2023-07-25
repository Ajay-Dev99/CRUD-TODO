const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require("./Routes/userRoutes")


app.listen(4000,()=>{
    console.log("Server start on port 4000");
})

mongoose.connect("mongodb://0.0.0.0:27017/Todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connection successfull");
}).catch((err) => {
    console.log(err.message);
})



app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","DELETE"],
    credentials:true
}))

app.use(express.json())

app.use("/",userRouter)






// const express = require("express")
// const cors = require("cors")

// const app = express()

// app.listen(4000,()=>{
//     console.log("Server Start on Port 4000");
// })

// app.use(cors({
//     origin:["http://localhost:3000"],
//     methods:["GET","POST"],
//     Credential:true
// }))

// app.use(express.json())

