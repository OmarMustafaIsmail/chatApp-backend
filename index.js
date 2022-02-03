const express =require("express");
var http = require("http");

const app = express();
const port = process.env.port || 3000;

var server = http.createServer(app);
var io = require("socket.io")(server);

//middleware
app.use(express.json());




io.on("connection",(socket)=>{
    console.log("connected");
    console.log(socket.id + "Joined The chat");
    socket.on("/test" , (msg)=>{
        console.log(msg)
    })
})

server.listen(port, "0.0.0.0",()=>{
    console.log("server started");
})