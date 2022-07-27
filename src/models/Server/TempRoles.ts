import { Schema, model } from "mongoose";

const TempRolesSchema = new Schema({
    userID: 
    {
        type: String,
    },
    guildID: 
    {
        type: String,
    },
    role: 
    {
        type: String,
    },
    duration: 
    {
        type: Number,
    }
}
, { timestamps: true });

const Users = model("TempRoles", TempRolesSchema);

export default Users;