import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
  content: String,
  fromSelf: Boolean,
  date: { type: Date, default: new Date() },
});

const Message = mongoose.model("message", messageSchema);

export default Message;
