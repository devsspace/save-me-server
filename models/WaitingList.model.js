import mongoose from "mongoose";
const { Schema, model } = mongoose;

const waitingListSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  location: {
    type: String,
  },
});
export default model("WaitingList", waitingListSchema);
