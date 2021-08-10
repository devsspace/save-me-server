import mongoose from "mongoose";
const { model, Schema } = mongoose;

const donationSchema = new Schema({
    askedBy: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
    },
    askedTo: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        bloodGroup: { type: String, required: true },
        location: { type: String, required: true },
        phoneNumber: { type: String, required: true },
    },
    date: {
        type: Date,
        require: true,
    },
    details: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    }
});

export default model("Donation", donationSchema);
