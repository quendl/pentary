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
            label: "What is Pentary?",
            description: "Tells you more about Pentary",
            value: "first_option",
            emoji: `${emojis.botserver}`,
          },
          {
            label: "Why did you choose Discord?",
            description: "Why we have choosed Discord as our Community",
            value: "second_option",
            emoji: `${emojis.users}`,
          },
          {
            label: "Privacy Policy",
            description: "Where can I view the Privacy Policy?",
            value: "third_option",
            emoji: `${emojis.review}`,
          },
          {
            label: "Developer/Partner Applications",
            description: "The secret way to join our team",
            value: "fourth_option",
            emoji: `${emojis.partner}`,
          },
          {
            label: "What data is being stored here?",
            description: "How your data is being handled here",
            value: "fifth_option",
            emoji: `${emojis.save}`,
          },
        ])
    );

    interaction.reply({ content: "Done!", ephemeral: true });
    (channel as TextChannel).send({ content: "Select", components: [row] });
  },
};
