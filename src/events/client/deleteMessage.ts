import { CommandInteraction, Message } from "discord.js";
import { permsCheck } from "../../util/guards/permissions";

module.exports = {
  name: "interactionCreate",
  async execute(interaction: CommandInteraction) {
    if (!interaction.isButton()) return;

    await permsCheck(interaction);
    if (interaction.replied) return;

    try {
      if (interaction.customId === "delete") {
        (interaction.message as Message).delete();
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },
};
