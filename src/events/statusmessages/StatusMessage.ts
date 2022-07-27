import { CommandInteraction, Role } from "discord.js";

import StatusMessages from "../../models/Server/StatusManager";

module.exports = {
    name: "presenceUpdate",
    async execute(oldPresence: string, newPresence: string | any) {
        const guildQuery = await StatusMessages.findOne({ guildID: newPresence.guild?.id });
        if (!guildQuery) return;

        const role = guildQuery.role;
        const statusmessage = guildQuery.statusmessage;

        if (newPresence.guild.me.roles.highest.id === role.id) return;
        // if (newPresence.guild.roles.highest.position >= newPresence.guild.me.roles.highest.position) return;

        if (!role || !statusmessage) return;
        try {
            // check if the user has a custom status + the status saved in the db
            if (newPresence.activities[0]?.type === "CUSTOM") {
                if (newPresence.activities[0]?.state === statusmessage) {
                    newPresence.member.roles.add(role);
                    // if status is changed to something else
                } else {
                    newPresence.member.roles.remove(role);
                }
                // if custom status is removed
            } else {
                newPresence.member.roles.remove(role);
            }
        } catch (err) {
            console.log(err);
            return;
        }
    },
};
