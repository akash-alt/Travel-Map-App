// const express = require("express")
// const mongoose = require("mongoose")
// const dotenv = require("dotenv")
// const app = express()
// const pinRoute = require("./routes/pins")

// dotenv.config()

// app.use(express.json())

// mongoose
//     .connect(process.env.MONGO_URL,{
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//         .then(()=>{
//             console.log("MongoDB connected")
//         }).catch((err)=>{
//             console.log(err)
//         });

// //  app.get("/",(req,res)=>{
// //      res.send("server is running")
// //  })

// app.use("/api/pins",pinRoute) // it will run the route

// app.listen(8800,function(){
//     console.log("backend server is running ")
// })

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config();

app.use(express.json());

mongoose
     .connect(process.env.MONGO_URL,{
             useNewUrlParser: true,
            useUnifiedTopology: true,
         })
         .then(()=>{
             console.log("MongoDB connected")
         }).catch((err)=>{
            console.log(err)
        });

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});