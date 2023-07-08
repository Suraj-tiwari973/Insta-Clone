const express = require("express");
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const cors = require("cors")
const app = express();
const PORT = 3002;

require("./models/user"); // user schema..
require("./models/post"); // post schema..

app.use(express.json())   // it will allow the server to pass the request in json formate.
app.use(require('./routes/auth'))  // auth file ipmorted here.
app.use(require('./routes/post'))  // post file ipmorted here.
app.use(cors());
  



mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("Connected to database susscessfuly.");
});

mongoose.connection.on("error",(err)=>{
    console.log("Database not connected.",err);
});

app.listen(3002,()=>{
    console.log(`Listening bro at port ${PORT}`);
})


