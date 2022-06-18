const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
import { getAllFiles } from "./util/util";

import Logger from "./util/logger";
import path from "path";
require("dotenv").config();

const commands = [];
const commandFiles = getAllFiles(path.join(__dirname, "./commands"));
const infoLogger = new Logger();

for (const file of commandFiles) {
  const command = require(`${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

(async () => {
  try {
    infoLogger.info("Started refreshing application (/) commands.");

    if (process.env.NODE_ENV === "development") {
      infoLogger.info("Bot mode: Development");
      await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID
        ),
        { body: commands }
      );
    } else if (process.env.NODE_ENV === "production") {
      infoLogger.info("Bot mode: Production");
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: commands,
      });
    } else {
      throw new Error("Couldn't find NODE_ENV");
    }

    infoLogger.success("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
