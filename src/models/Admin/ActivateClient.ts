import { Schema, model } from "mongoose";

const SetupChannelSchema = new Schema({
    guildID: 
    {
        type: String,
    },
    userID:
    {
        type: String,
    },
    Date: 
    {
        type: Date,
    }
})

const SetupChannel = model("client", SetupChannelSchema);

export default SetupChannel;