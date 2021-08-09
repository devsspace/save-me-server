import mongoose from "mongoose";
const { Schema, model } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "donor",
    },
    // permissions: [{ name: String }],
    name: {
        type: String,
    },
    username: {
        type: String
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
    bloodGroup: {
        type: String,
    },
    status: {
        type: String,
    },
    eligibility: {
        type: String,
        default: "eligible"
    },
    lastDonationDate: {
        type: Date,
    }
})
// .plugin(permissions);

// // mutator bcrypt password method implement here
// userSchema.pre('save', async function (cb) {
//     // check is new
//     if (this.isNew) {
//         this.password = await BCrypt.makeHash(this.password);
//     }
// });

export default model("User", userSchema);
