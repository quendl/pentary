import { CommandInteraction, GuildMember } from "discord.js";

import emojis from "../../Controller/emojis";

export function permsCheck(interaction: CommandInteraction) {
  if (!(interaction.member as GuildMember).permissions.has("MANAGE_MESSAGES")) {
    return interaction.reply({
      content: `${emojis.error} | You don't have the required permissions to use this.`,
      ephemeral: true,
    });
  }
  return true;
}
