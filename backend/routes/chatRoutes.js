import express from "express";

import {
getChats,
createChat,
updateChat,
deleteChat,
askAI
}
from "../controllers/chatController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getChats);

router.post("/", protect, createChat);

router.post("/ask", protect, askAI);

router.put("/:id", protect, updateChat);

router.delete("/:id", protect, deleteChat);

export default router;