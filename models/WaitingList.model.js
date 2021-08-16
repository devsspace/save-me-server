import mongoose from "mongoose";
const { Schema, model } = mongoose;

const waitingListSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  serial: {
    type: Number,
    required: true,
  },
  // Optionals
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
