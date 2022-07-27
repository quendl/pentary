import cron from "node-cron";

// client
import client from "../../util/bot";

// database
import TimedRoleSchema from "../../models/Server/TempRoles";
import { Role } from "discord.js";


export async function TempRole() {
    const Actions = await TimedRoleSchema.find().exec();

    cron.schedule("*/1 * * * * *", async () => {
        for (const action of Actions) {
            // database queries
            const guildQuery = await client.guilds.fetch(action.guildID);
            const member = await guildQuery.members.fetch(action.userID);
            const role = await guildQuery.roles.fetch(action.role);

            const duration = action.duration;
            const currentTime = ~~(Date.now() / 1000);
            console.log(guildQuery);
            console.log(member);
            console.log(role);
            console.log(currentTime);

            if (currentTime >= duration) {
                // check if the user has the role, if not, dont do anything
                if (!member.roles.cache.has(role?.id!)) return;
                await member?.roles.remove(role as Role);
                try {
                    action.delete({ userID: action.userID });
                } catch (error: any) {
                    console.log(error);
                    return;
                }
            }
        }
    });
}
TempRole();
