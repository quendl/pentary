import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";

// Config
import nodemailer from "nodemailer";
import emojis from "../../util/frontend/emojis";
import { ownerCheck } from "../../util/guards/owner";
import client from "../../util/bot";
require("dotenv").config();

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

    // embeds
    const successInit = new MessageEmbed()
      .setDescription(`${emojis.success} | Client successfully initialized.`)
      .setColor("GREEN");

    const successDisable = new MessageEmbed()
      .setDescription(`${emojis.success} | Client successfully disabled.`)
      .setColor("GREEN");

    const AlreadyInitialized = new MessageEmbed()
      .setDescription(`${emojis.error} | Client already initialized.`)
      .setColor("RED");

    const notInitializedYet = new MessageEmbed()
      .setDescription(`${emojis.error} | Client isn't initialized yet.`)
      .setColor("RED");

    const dataQuery = await Guild.findOne({ id: interaction.guild?.id });
    if (sub === "on") {
      // If there is data, return and dont save new data
      if (dataQuery)
        return interaction.followUp({
          embeds: [AlreadyInitialized],
          ephemeral: true,
        });
      // If no data, create new data
      const newData = new Guild({
        userID: interaction.user.id,
        guildID: interaction.guild?.id,
        Date: new Date(),
      });
      newData.save();
      interaction.followUp({
        embeds: [successInit],
        ephemeral: true,
      });
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
      await transporter.sendMail({
        from: "Pentary Logging",
        to: process.env.TO,
        subject: "Pentary Client",
        text: `
        This is a confirmation about ${client.user?.tag}'s state.

        ---- ---- ----

        Init by: ${interaction.user.tag} (${interaction.user.id})
        Guild: ${interaction.guild?.name} (${interaction.guild?.id})
        Date: ${new Date()}
        ---- ---- ----
        `,
      });
    } else if (sub === "off") {
      // If there isnt anything to delete, dont do anything
      if (!dataQuery)
        return interaction.followUp({
          embeds: [notInitializedYet],
          ephemeral: true,
        });
      dataQuery.delete();
      interaction.followUp({
        embeds: [successDisable],
        ephemeral: true,
      });
    }
  },
};
