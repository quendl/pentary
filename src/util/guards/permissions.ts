import { CommandInteraction, GuildMember } from "discord.js";

import emojis from "../../util/frontend/emojis";

export function permsCheck(interaction: CommandInteraction) {
  if (!(interaction.member as GuildMember).permissions.has("MANAGE_MESSAGES")) {
    return interaction.reply({
      content: `${emojis.error} | You don't have the required permissions to use this.`,
      ephemeral: true,
    });
  }
  return true;
}

export function isAdmin(interaction: CommandInteraction) {
  if (!(interaction.member as GuildMember).permissions.has("ADMINISTRATOR")) {
    return interaction.reply({
      content: `${emojis.error} | You need to be an Admin to use this.`,
      ephemeral: true,
    });
  }
  return true;
}

