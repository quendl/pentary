import { Schema, model } from "mongoose";

const GuildStaff = new Schema({
    guildID: 
    {
        type: String,
    },
    userID:
    {
        type: String,
    },
    applicationID:
    {
        type: String
    },
    email: 
    {
        type: String,
    },
    Date: 
    {
        type: Date,
    }
})

const Staff = model("guild-staff", GuildStaff);

export default Staff;