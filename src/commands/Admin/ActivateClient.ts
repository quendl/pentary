import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

// Config
import emojis from "../../util/frontend/emojis";
import { ownerCheck } from "../../util/guards/owner";

// Database query
import Guild from "../../models/Admin/ActivateClient";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("client")
    .setDescription("Switch to a different client state")
    .addSubcommand((sub) =>
      sub.setName("on").setDescription("Enable the client")
    )
    .addSubcommand((sub) =>
      sub.setName("off").setDescription("Disable the client globally")
    ),
  async execute(interaction: CommandInteraction) {
    // check if the user is an owner
    await ownerCheck(interaction);
    if (interaction.replied) return;

    await interaction.deferReply();
    const sub = interaction.options.getSubcommand();

    const dataQuery = await Guild.findOne({ id: interaction.guild?.id });
    if (sub === "on") {
      // If there is data, return and dont save new data
      if (dataQuery)
        return interaction.followUp({
          content: `${emojis.error} | Client already initialized`,
          ephemeral: true,
        });
      // If no data, create new data
      const newData = new Guild({
        guildID: interaction.guild?.id,
        userID: interaction.user.id,
        Date: new Date(),
      });
      newData.save();
      interaction.followUp({
        content: `${emojis.success} | Successfully initialized the client`,
        ephemeral: true,
      });
    } else if (sub === "off") {
      // If there isnt anything to delete, dont do anything
      if (!dataQuery)
        return interaction.followUp({
          content: `${emojis.error} |  Client isn't initialized yet.`,
          ephemeral: true,
        });
      dataQuery.delete();
      interaction.followUp({
        content: `${emojis.success} | Client successfully disabled.`,
        ephemeral: true,
      });
    }
  },
};
