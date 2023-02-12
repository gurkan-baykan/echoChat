import mongoose from "mongoose";
const { Schema } = mongoose;
const messageSchema = new Schema({
  content: String,
  fromSelf: Boolean,
  date: Date,
});

const Message = mongoose.model("message", messageSchema);

export default Message;
