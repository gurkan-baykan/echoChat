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

export const getMessages = async (skip) => {
  try {
    console.log(skip);
    const messages = await Message.find({})
      .skip(skip)
      .sort({ date: "asc" })
      .limit(10);
    const totalCount = await Message.count();
    if (messages) return { messages: messages, totalCount: totalCount };
  } catch (err) {
    return err;
  }
};
