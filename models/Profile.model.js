import { model, Schema } from "mongoose";

const modelSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String
    },
    profilePic: String,
    phone: {
        type: String,
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    }
});

export default model("Profile", modelSchema);