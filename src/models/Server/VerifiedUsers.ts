import { Schema, model } from "mongoose";

const VerifiedUsers = new Schema({
    userID: 
    {
        type: String,
    },
    guildID:
    {
        type: String,
    },
    Date: 
    {
        type: Date,
    }
})

const Users = model("verified-users", VerifiedUsers);

export default Users;