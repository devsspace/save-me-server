import mongoose from "mongoose";
const { Schema, model } = mongoose;

const consultationHistorySchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  billingDetails: {

  },
  card: {

  },
  created: {
    type: Number,
  },
  type: {
    type: String,
  },
  object: {
    type: String,
  },
  livemode: {
    type: Boolean,
  },
  
});
export default model("ConsultationHistory", consultationHistorySchema);
