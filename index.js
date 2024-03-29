const express =require("express");
var http = require("http");

const app = express();
const port = process.env.port || 3000;

var server = http.createServer(app);
var io = require("socket.io")(server);

//middleware
app.use(express.json());


var clients = {};

io.on("connection",(socket)=>{
    console.log("connected");
    console.log(socket.id + "Joined The chat");
    socket.on("/signin" , (id)=>{
        console.log(id)
        clients[id]=socket;
        console.log(clients)
    })
    socket.on("message",(msg)=>{
        console.log(msg);
        let targetId = msg.targetId;
        if(clients[targetId])
        clients[targetId].emit("message",msg);
        
    })
})

server.listen(port, "0.0.0.0",()=>{
    console.log("server started");
})