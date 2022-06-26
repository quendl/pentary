import { SlashCommandBuilder } from "@discordjs/builders";
import {
  CommandInteraction,
  MessageActionRow,
  MessageSelectMenu,
  TextChannel,
} from "discord.js";

// Config
import emojis from "../../util/frontend/emojis";
import { ownerCheck } from "../../util/guards/owner";

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
        .setCustomId("questions")
        .setPlaceholder("Nothing selected")
        .addOptions([
          {
            label: "Question 1",
            description: "Description about Q1",
            value: "first_option",
            emoji: "😀",
          },
          {
            label: "Question 2",
            description: "Description about Q1",
            value: "second_option",
            emoji: "😃",
          },
          {
            label: "Question 3",
            description: "Description about Q1",
            value: "third_option",
            emoji: "😄",
          },
          {
            label: "Question 4",
            description: "Description about Q1",
            value: "fourth_option",
            emoji: "😁",
          },
          {
            label: "Question 5",
            description: "Description about Q1",
            value: "fifth_option",
            emoji: "😆",
          },
        ])
    );

    interaction.reply({ content: "Done!", ephemeral: true });
    (channel as TextChannel).send({ content: "Select", components: [row] });
  },
};
