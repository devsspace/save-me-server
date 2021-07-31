import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        default: "user",
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
    phone: {
        type: String,
    },
    location: {
        type: String
    },
    status: {
        type: String,
    },
})
// .plugin(permissions);

// // mutator bcrypt password method implement here
// userSchema.pre('save', async function (cb) {
//     // check is new
//     if (this.isNew) {
//         this.password = await BCrypt.makeHash(this.password);
//     }
// });

export default mongoose.model("User", userSchema);
