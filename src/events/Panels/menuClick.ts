import { CommandInteraction, GuildMemberRoleManager, Role } from "discord.js";

module.exports = {
  name: "interactionCreate",
  async execute(interaction: CommandInteraction) {
    if (!interaction.isSelectMenu()) return;
    const choice = interaction.values[0];
    const member = interaction.member;

    if (choice === "first_option") {
        interaction.reply({ content: `Clicked menu 1`, ephemeral: true });
    }

    if (choice === "second_option") {
    }

    if (choice === "third_option") {
    }

    if (choice === "fourth_option") {
    }

    if (choice === "fifth_option") {
    }
  },
};
