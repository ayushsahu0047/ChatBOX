import express from "express";
import cors from 'cors'
import { Server } from "socket.io";
import http from 'http'

const app=  express();
const server = http.createServer(app);


const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET","PUT"],
    },
})
io.on("connection",(socket)=>{console.log(socket.id)
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User_id:-- ${socket.id} join Room :${data}`)
    })
    socket.on("send_message",(data)=>{console.log("send Message",data)
    socket.to(data.room).emit("receive_message",data)
})

    socket.on("disconnect",()=>{
        console.log("User Disconnected...",socket.id)
    })
});



app.use(cors());
server.listen(1000,()=>console.log("Server is running on the post 1000"));


