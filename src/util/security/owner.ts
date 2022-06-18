import { CommandInteraction } from "discord.js";

import emojis from "../../Controller/emojis";

export function ownerCheck(interaction: CommandInteraction) {
  if (!process.env.OWNER?.includes(interaction.user.id)) {
    return interaction.reply({
      content: `${emojis.error} | You cant use this command.`,
      ephemeral: true,
    });
  }
  return true;
}
