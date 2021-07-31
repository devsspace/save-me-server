import { model, Schema } from "mongoose";

const modelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    blood_group: String,
    password: {
        type: String,
        required: true,
    }
})

module.exports = model("Donotion", userSchema);
