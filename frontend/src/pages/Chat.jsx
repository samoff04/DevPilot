import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import TopBar from "../components/TopBar";
import ChatArea from "../components/ChatArea";

import {
  getChats,
  createChat,
  updateChat,
  askAI,
  deleteChat
}
from "../api/chat";

import "../styles/chat.css";

export default function Chat() {

  if (!localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {

    const loadChats = async () => {

      try {

        const res = await getChats();
                
        if (res.data.length > 0) {

          setChats(res.data);
          setActiveChatId(res.data[0]._id);

        } else {

          const newChatRes = await createChat();

          setChats([newChatRes.data]);
          setActiveChatId(newChatRes.data._id);

        }

      } catch (err) {
        console.log(err);
      }

    };

    loadChats();

  }, []);

  const createNewChat = async () => {

    try {

      const res = await createChat();

      setChats(prev => [...prev, res.data]);

      setActiveChatId(res.data._id);

    } catch (err) {
      console.log(err);
    }

  };

  const handleDelete = async (id) => {

  await deleteChat(id);

  setChats(
    prev =>
      prev.filter(
        chat => chat._id !== id
      )
  );

};

const sendMessage = async (text) => {

  if (!text.trim()) return;

  // Add user message + Thinking...
  const tempChats = chats.map(chat => {

    if (chat._id !== activeChatId)
      return chat;

    return {

      ...chat,

      messages: [

        ...chat.messages,

        {
          role: "user",
          content: text
        },

        {
          role: "assistant",
          content: "Thinking..."
        }

      ]

    };

  });

  setChats(tempChats);

  try {

    const ai = await askAI(text);

    const finalChats = tempChats.map(chat => {

      if (chat._id !== activeChatId)
        return chat;

      const msgs = [...chat.messages];

      // Replace last message (Thinking...)
      msgs[msgs.length - 1] = {

        role: "assistant",
        content: ai.data.reply

      };

      return {

        ...chat,

        messages: msgs

      };

    });

    setChats(finalChats);

    const currentChat = finalChats.find(
      chat => chat._id === activeChatId
    );

    await updateChat(
      activeChatId,
      {
        messages: currentChat.messages
      }
    );

  }

  catch (err) {

    console.log(err);

    // Replace Thinking... with error message
    const errorChats = tempChats.map(chat => {

      if (chat._id !== activeChatId)
        return chat;

      const msgs = [...chat.messages];

      msgs[msgs.length - 1] = {

        role: "assistant",
        content:
          "⚠️ DevPilot is temporarily unavailable."

      };

      return {

        ...chat,

        messages: msgs

      };

    });

    setChats(errorChats);

  }

};

  const activeChat = chats.find(
    chat => chat._id === activeChatId
  );

  return (
    <div className="chat-page">

      <TopBar createNewChat={createNewChat} />

      <div className="chat-layout">

        <div className="chat-sidebar">

          {chats.map(chat => (

            <div
              key={chat._id}
              className={
                activeChatId === chat._id
                  ? "chat-item active-chat"
                  : "chat-item"
              }
              onClick={() =>
                setActiveChatId(chat._id)
              }
            >
              <div className="chat-row">

              <span>
              {chat.title}
              </span>

              <button
              className="delete-btn"
              onClick={(e)=>{

              e.stopPropagation();

              handleDelete(chat._id);

              }}
              >

              ×

              </button>

              </div>
            </div>

          ))}

        </div>

        {activeChat && (

          <ChatArea
            messages={activeChat.messages}
            sendMessage={sendMessage}
          />

        )}

      </div>

    </div>
  );
}