import mongoose from "mongoose"
const { model, Schema } = mongoose

const requestSchema = new Schema({
    bloodGroup: String,
    location: String,
    date: Date,
    numberOfBags: Number,
    requestedBy: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        bloodGroup: { type: String, required: true },
        location: { type: String, required: true },
        phoneNumber: { type: String, required: true },
    },
    requestedAt: {
        type: Date,
        default: new Date(),
    },
    status: {
        type: String,
        default: "Pending",
    },
})

export default model("BloodRequest", requestSchema)
