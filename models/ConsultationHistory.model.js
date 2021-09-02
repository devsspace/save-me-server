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
  fee: {
    type: Number,
    required: true,
  },
  
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    billingDetails: {
      type: Schema.Types.Mixed,
    },
    card: {
      type: Schema.Types.Mixed,
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
  },
});
export default model("ConsultationHistory", consultationHistorySchema);
