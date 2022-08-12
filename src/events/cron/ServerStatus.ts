import { TextChannel } from "discord.js";
import cron from "node-cron";

import client from "../../util/bot";
const channel = client.channels.cache.get("985600742956072960") as TextChannel;

import fetch from "cross-fetch";

export async function ServerStatus() {
    // cron.schedule('0 0 * * *', () => {
    //     console.log('Running a job at midnight');
    // }, {
    //     scheduled: true,
    //     timezone: "Germany/Berlin"
    // });

    // every hour 21:00, 21:00
    cron.schedule('0 * * * *', () => {
        channel.send({ content: "Hello there :wave:" });
    });
}