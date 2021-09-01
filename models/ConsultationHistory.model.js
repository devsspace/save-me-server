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
  fee: {
    type: String,
    required: true,
  },

  paymentInfo: {
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
