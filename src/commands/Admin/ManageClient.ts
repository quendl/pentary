import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, TextChannel, Role } from "discord.js";

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
        .addChannelOption((option) => option.setName("channel").setDescription("The channel for the bot").setRequired(true))
        .addRoleOption((option) => option.setName("role").setDescription("The role for the main users").setRequired(true))
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
    const channel = interaction.options.getChannel("channel") as TextChannel;
    const role = interaction.options.getRole("role") as Role;

    // embeds
    const successInit = new MessageEmbed()
      .setDescription(`${emojis.success} | Client successfully initialized.`)
      .setColor("GREEN");

    const successDisable = new MessageEmbed()
      .setDescription(`${emojis.success} | Client successfully disabled.`)
      .setColor("GREEN");

    const successPublic = new MessageEmbed()
      .setDescription(`${emojis.success} | I'm now online and ready to use.`)
      .setColor("GREEN");

    const AlreadyInitialized = new MessageEmbed()
      .setDescription(`${emojis.error} | Client already initialized.`)
      .setColor("RED");

    const notInitializedYet = new MessageEmbed()
      .setDescription(`${emojis.error} | Client isn't initialized yet.`)
      .setColor("RED");

    // component for the embed
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("delete")
        .setEmoji(`🗑️`)
        .setStyle("PRIMARY")
    );

    const dataQuery = await Guild.findOne({ id: interaction.guild?.id });
    try {
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
          role: role.id,
          channel: channel?.id,
          Date: new Date(),
        });
        newData.save();
        interaction.followUp({
          embeds: [successInit],
          ephemeral: true,
        });

        // send a message into the bots channel
        channel.send({ embeds: [successPublic], components: [row] });

        let transporter = nodemailer.createTransport({
          host: process.env.SERVICE,
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
        Channel: ${channel?.name} (${channel?.id})
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
    } catch (error: any) {
      console.log(error);
    }
  },
};
