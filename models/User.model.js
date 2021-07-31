import { BCrypt } from 'jwt-auth-helper';
import { model, Schema } from "mongoose";
import permissions from 'mongoose-permissions';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String
    },
    profilePic: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

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
    // role: {
    //     name: String,
    //     permissions: [{ name: String }],
    // },
    // permissions: [{ name: String }],
}).plugin(permissions);

// mutator bcrypt password method implement here
userSchema.pre('save', async function (cb) {
    // check is new
    if (this.isNew) {
        this.password = await BCrypt.makeHash(this.password);
    }
});

module.exports = model("User", userSchema);
