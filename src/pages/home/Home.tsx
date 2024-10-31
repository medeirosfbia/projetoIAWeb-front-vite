import { ChangeEvent, Key, KeyboardEvent, useState } from "react";
import Message from "../../models/Message";
import User from "../../models/User";
import { sendMessage } from "../../services/ChatService";
import Chat from "@/components/chat/Chat";

function Home() {

 


  return (
    <>
      <div className="container">
        <Chat/>
      </div>
    </>

  );
}

export default Home;