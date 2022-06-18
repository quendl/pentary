import { SlashCommandBuilder } from "@discordjs/builders";
import {
  CommandInteraction,
  MessageActionRow,
  MessageSelectMenu,
  TextChannel,
} from "discord.js";

// Config
import emojis from "../../util/frontend/emojis";
import { ownerCheck } from "../../util/security/owner";

// Database query
import Guild from "../../models/Admin/ActivateClient";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("faqpanel")
    .setDescription("Sends the FAQ panel into the channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Select the channel")
        .setRequired(false)
    ),
  async execute(interaction: CommandInteraction) {
    // check if the user is an owner
    await ownerCheck(interaction);
    if (interaction.replied) return;

    const channel =
      interaction.options.getChannel("channel") || interaction.channel;

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("roles")
        .setPlaceholder("Select a reaction role")
        .addOptions([
          {
            label: "Reaction Role 1",
            description: "Take this role by clicking me ",
            value: "first_option",
            emoji: "😀",
          },
          {
            label: "Reaction Role 2",
            description: "Take this role by clicking me ",
            value: "second_option",
            emoji: "😃",
          },
          {
            label: "Reaction Role 3",
            description: "Take this role by clicking me ",
            value: "third_option",
            emoji: "😄",
          },
          {
            label: "Reaction Role 4",
            description: "Take this role by clicking me ",
            value: "fourth_option",
            emoji: "😁",
          },
          {
            label: "Reaction Role 5",
            description: "Take this role by clicking me s",
            value: "fifth_option",
            emoji: "😆",
          },
        ])
    );

    (channel as TextChannel).send({ content: "Select", components: [row] });
  },
};
