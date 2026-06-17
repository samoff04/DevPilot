import Chat from "../models/Chat.js";
import { GoogleGenAI } from "@google/genai";

console.log("Gemini key:", process.env.GEMINI_API_KEY);

export const getChats = async (req, res) => {

  const chats = await Chat.find({
    userId: req.user.id
  });

  res.json(chats);
};

export const createChat = async (req, res) => {

  const chat = await Chat.create({
    userId: req.user.id,
    title: "New Chat",
    messages: []
  });

  res.json(chat);
};

export const updateChat = async (req, res) => {

  try {

    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found"
      });
    }

    chat.messages = req.body.messages;

    await chat.save();

    res.json(chat);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const askAI = async (req, res) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Message is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",

      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],

      config: {
        maxOutputTokens: 512,
        temperature: 0.3,
      },
    });

    const reply = response.response.text();

    return res.json({ reply });
  } catch (error) {
    console.log("===== ERROR =====");
    console.log(error);

    let reply = "⚠️ DevPilot error occurred. Try again later.";

    if (error?.status === 429) {
      reply = "⚠️ Too many requests. Please wait and try again.";
    }

    return res.status(200).json({ reply });
  }
};

export const deleteChat = async (req, res) => {
  try {
    await Chat.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    return res.json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete chat",
    });
  }
};