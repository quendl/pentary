import { Schema, model } from "mongoose";

const StatusMessage = new Schema({
    guildID:
    {
        type: String,
    },
    role:
    {
        type: String,
    },
    statusmessage:
    {
        type: String,
    }
}, { timestamps: true });

const Status = model("statusmessages", StatusMessage);

export default Status;