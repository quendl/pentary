import { CommandInteraction, MessageEmbed } from "discord.js";

// database query
import Guild from "../../models/Admin/ActivateClient";

// config
import emojis from "../../util/frontend/emojis";

export async function clientCheck(interaction: CommandInteraction) {
  const embed = new MessageEmbed()
    .setDescription(`${emojis.error} | The client isn't initialized yet!`)
    .setColor("RED");

  const guildQuery = await Guild.findOne({ guildID: interaction.guild?.id });
  if (!guildQuery)
    return interaction.reply({ embeds: [embed], ephemeral: true });
}
