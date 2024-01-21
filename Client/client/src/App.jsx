import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat'
import music from "./mixkit-tile-game-reveal-960.wav"

const socket = io.connect("http://localhost:1000")
const App = () => {
const [username, setusername] = useState("");
const [room, setroom] = useState("");
const [showchat, setshowchat] = useState(false)
const notification = new Audio(music)
const joinChat=()=>{
  if(username !=="" && room !== ""){
    socket.emit("join_room",room);
    setshowchat(true)
    notification.play();
  }
};
  return (
    <>
      
    {
   !showchat &&(
      
      <div className="join_room">
        <h1>Join chat</h1>
        <input type="text" placeholder='Enter the Name' 
        onChange={(e)=>setusername(e.target.value)} />
        <input type="text"  placeholder='Enter Chat Room'
        onChange={(e)=>setroom(e.target.value)}/>
        <button type="button" className="btn btn-light" onClick={joinChat}>Join</button>
      </div>
  )  }
  
  {
    showchat &&
       (
      <Chat socket= {socket} username={username} room={room}/>
       )   
    }
    
    </>

  )
}

export default App
