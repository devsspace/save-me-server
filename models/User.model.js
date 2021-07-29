const { BCrypt } = require('jwt-auth-helper');
const { model, Schema } = require("mongoose");
const permissions = require('mongoose-permissions');


const userSchema = new Schema({
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
    password: {
        type: String,
        required: true,
    },
    // role: {
    //     name: String,
    //     permissions: [{ name: String }],
    // },
    // permissions: [{ name: String }],
}).plugin(permissions);

// mutator bcrypt password method implement here
// userSchema.pre('save', async function (cb) {
//     // check is new
//     // isModified
//     this.password = await BCrypt.makeHash(this.password);
// });

module.exports = model("User", userSchema);
