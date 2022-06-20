import { CommandInteraction } from "discord.js";

// configs
import emojis from "../util/frontend/emojis";

module.exports = {
  name: "interactionCreate",
  async execute(interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;

    // get all of the commands
    const command = interaction.client.commands.get(interaction.commandName);

    // if there isnt any command, return
    if (!command) return;
    
    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `${emojis.error} | Error trying to execute this command.`,
        ephemeral: false,
      });
    }
  },
};
