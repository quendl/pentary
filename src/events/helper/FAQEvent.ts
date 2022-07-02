import { CommandInteraction, MessageEmbed } from "discord.js";

module.exports = {
  name: "interactionCreate",
  async execute(interaction: CommandInteraction) {
    if (!interaction.isSelectMenu()) return;
    const choice = interaction.values[0];
    const member = interaction.member;

    const option1 = new MessageEmbed()
    .setDescription(`Pentary is our Discord client that helps users to find what they are looking for, with the help of a strong community.`)
    .setColor("GREEN");

    const option2 = new MessageEmbed()
    .setDescription(`Discord is the perfect place to find other people that have the same interests as you, we love to connect people!`)
    .setColor("GREEN");

    const option3 = new MessageEmbed()
    .setDescription(`You can view our Privacy Policy and much more about how informations are handled [here](https://github.com/quendl).`)
    .setColor("GREEN");

    const option4 = new MessageEmbed()
    .setDescription(`Currently it is not possible to apply for any job or partnership, please try again later.`)
    .setColor("GREEN");

    const option5 = new MessageEmbed()
    .setDescription(`We use a strong Database where your Data (Discord ID, Username and Discriminator) are being stored for various utilities on our server.`)
    .setColor("GREEN");

    if (choice === "first_option") {
      interaction.reply({ embeds: [option1], ephemeral: true });
    }

    if (choice === "second_option") {
      interaction.reply({ embeds: [option2], ephemeral: true });
    }

    if (choice === "third_option") {
      interaction.reply({ embeds: [option3], ephemeral: true });
    }

    if (choice === "fourth_option") {
      interaction.reply({ embeds: [option4], ephemeral: true });
    }

    if (choice === "fifth_option") {
      interaction.reply({ embeds: [option5], ephemeral: true });
    }
  },
};
