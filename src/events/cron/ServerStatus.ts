import { TextChannel } from "discord.js";
import cron from "node-cron";

import client from "../../util/bot";

import fetch from "cross-fetch";

export async function ServerStatus() {
    const channel = await client.channels.fetch ("985600742956072960") as TextChannel;
    // cron.schedule('0 0 * * *', () => {
    //     console.log('Running a job at midnight');
    // }, {
    //     scheduled: true,
    //     timezone: "Germany/Berlin"
    // });

    // every hour 21:00, 22:00
    cron.schedule('0 * * * *', () => {
        channel.send({ content: "Hello there :wave:" });
    });
}