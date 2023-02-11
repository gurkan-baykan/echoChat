import express from "express";
import Message from "../models/message.js";

export const saveMessage = async (message = null) => {
  try {
    const createdDt = new Date();
    console.log(createdDt);

    const newFilm = new Message(message);
    const result = await newFilm.save();

    if (result) return result;
  } catch (err) {
    return err;
  }
};

export const getMessages = async () => {
  try {
    const messages = await Message.find({}).sort({ date: "asc" }).limit(20);

    if (messages) return messages;
  } catch (err) {
    return err;
  }
};
