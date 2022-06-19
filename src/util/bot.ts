import { Client, Intents, Collection } from "discord.js";
import { red } from "colors";
import { getAllFiles } from "./util";

import "../deployCommands";
import path from "path";
require("dotenv").config();

declare module "discord.js" {
  export interface Client {
    commands: Collection<unknown, any>;
    events: Collection<unknown, any>;
  }
}

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_WEBHOOKS,
  ],
});

client.commands = new Collection();
client.events = new Collection();
const commands = getAllFiles(path.join(__dirname, "../commands"));

if (commands.length <= 0) console.log(red("NO COMMANDS FOUND"));
else {
  /* Iterate every file in the array and require it. Also map it to the commands collection. */
  commands.forEach((file) => {
    const props = require(`${file}`);
    client.commands.set(props.data.name, props);
  });
}

const events = getAllFiles(path.join(__dirname, "../events"));
if (events.length <= 0) console.log(red("NO EVENTS FOUND"));
else {
  /* Iterate every file in the array and require it. Also register every event. */
  events.forEach((file) => {
    const event = require(`${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  });
}

client.login(process.env.TOKEN);

export default client;
