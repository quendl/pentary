import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";
import emojis from "../../util/frontend/emojis";
require("dotenv").config();

module.exports = {
  name: "interactionCreate",
  async execute(interaction: CommandInteraction) {
    if (!interaction.isModalSubmit()) return;

    const adminChannel = (await interaction.guild?.channels.fetch(
      process.env.ADMIN_CHANNEL as string
    )) as TextChannel;

    const embed = new MessageEmbed()
      .setDescription(`${emojis.success} | Successfully submitted flag!`)
      .setColor("GREEN");

    if (interaction.customId === "flag-user") {
      const userID = interaction.fields.getTextInputValue("user");
      const flagTyped = interaction.fields.getTextInputValue("flagtype");
      const additionalInfos = interaction.fields.getTextInputValue("addinfo");

      const infoEmbed = new MessageEmbed()
        .setDescription(
          `
    **User ID:** ${userID}
    **Flag Type:** ${flagTyped}

    **Other information:** ${additionalInfos}
    `
        )
        .setTimestamp()
        .setAuthor({
          name: `From: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        });

      interaction.reply({ embeds: [embed], ephemeral: true });
      adminChannel.send({ embeds: [infoEmbed] });
    }
  },
};
