import { Schema, model } from "mongoose";

const VerificationCodes = new Schema({
    userID: 
    {
        type: String,
    },
    guildID:
    {
        type: String,
    },
    code:
    {
        type: String
    },
    expire_at: 
    {
        type: Date,
        default: Date.now(),
        expires: 500
    },
})

const Code = model("ver-codes", VerificationCodes);

export default Code;