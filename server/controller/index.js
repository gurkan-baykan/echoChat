import express from "express";
import Message from "../models/message.js";

export const saveMessage = async (message = null) => {
  try {
    const createdDt = new Date();
    message["date"] = createdDt;
    const newFilm = new Message(message);
    const result = await newFilm.save();

    if (result) return result;
  } catch (err) {
    return err;
  }
};

export const getMessages = async (skip) => {
  try {
    const messages = await Message.find({})
      .sort({ date: "desc" })
      .skip(10 * skip)
      .limit(10);

    const totalCount = await Message.count();
    if (messages)
      return { messages: messages.reverse(), totalCount: totalCount };
  } catch (err) {
    return err;
  }
};
