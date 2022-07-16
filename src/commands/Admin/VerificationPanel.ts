import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, TextChannel, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vpanel")
        .setDescription("Sends the verification panel"),
    async execute(interaction: CommandInteraction) {
        const channel = interaction.channel as TextChannel;

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("create-code")
                .setLabel("Generate code")
                .setStyle("PRIMARY")
                .setEmoji(`📥`),
            new MessageButton()
                .setCustomId("verify-code")
                .setStyle("SECONDARY")
                .setLabel("Verify code")
                .setEmoji(`📤`)
        )

        const embed = new MessageEmbed()
            .setDescription(
                `
        **Welcome to the verification!**
        Before you click the button below, read this carefully.
        
        Before you can fully access our server and tools, you have to verify yourself.
        Once you click the button below, you will see a verification code - *do not share that anywhere*!!
        Your request will be investigated properly asap, please be patient.

        *Remember, spamming/abusing this system might lead to a permanent ban from our server.*

        Thanks!
        `)

        interaction.reply({ content: "Done", ephemeral: true });
        channel.send({ embeds: [embed], components: [row] });
    },
};
