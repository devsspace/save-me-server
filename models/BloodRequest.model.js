import mongoose from "mongoose";
const { model, Schema } = mongoose;

const requestSchema = new Schema({
  bloodGroup: String,
  location: String,
  date: Date,
  numberOfBags: Number,
  requestedBy: Schema.Types.ObjectId,
  requestTime: {
    type: Date,
    default: new Date(),
  }
});

export default model("BloodRequest", requestSchema);
