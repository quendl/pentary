import { SlashCommandBuilder } from "@discordjs/builders";
import {
  CommandInteraction,
  MessageActionRow,
  Modal,
  ModalActionRowComponent,
  TextInputComponent,
} from "discord.js";

// Config
import emojis from "../../../util/frontend/emojis";
import { ownerCheck } from "../../../util/guards/owner";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flag")
    // Also known as a "report" command, that staff members can see ...
    .setDescription("Flag a user for Staff members"),
  async execute(interaction: CommandInteraction) {
    // check if the user is an owner
    await ownerCheck(interaction);
    if (interaction.replied) return;

    const modal = new Modal()
      .setCustomId("flag-user")
      .setTitle("Pentary Client");

    const firstQuestion = new TextInputComponent()
      .setCustomId("user")
      .setLabel("Enter the User ID")
      .setMaxLength(18)
      .setPlaceholder("12345678910")
      .setRequired(true)
      .setStyle("SHORT");

    const secondQuestion = new TextInputComponent()
      .setCustomId("flagtype")
      .setLabel("Enter the type of flag")
      .setMaxLength(20)
      .setPlaceholder("Insulting")
      .setRequired(true)
      .setStyle("SHORT");

    const hobbiesInput = new TextInputComponent()
      .setCustomId("addinfo")
      .setLabel("Any additional informations")
      .setMaxLength(100)
      .setRequired(true)
      .setStyle("PARAGRAPH"); // Paragraph means multiple lines of text.
    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow =
      new MessageActionRow<ModalActionRowComponent>().addComponents(
        firstQuestion
      );
    const secondQuestionRow =
      new MessageActionRow<ModalActionRowComponent>().addComponents(
        secondQuestion
      );
    const thirdActionRow =
      new MessageActionRow<ModalActionRowComponent>().addComponents(
        hobbiesInput
      );
    modal.addComponents(firstActionRow, secondQuestionRow, thirdActionRow);
    await interaction.showModal(modal);
  },
};
