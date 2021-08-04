import mongoose from "mongoose";
const { model, Schema } = mongoose;

const donationSchema = new Schema({
  askedBy: {
    type: Schema.Types.Mixed,
    required: true,
  },
  askedTo: {
    type: Schema.Types.Mixed,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

export default model("Donation", donationSchema);
