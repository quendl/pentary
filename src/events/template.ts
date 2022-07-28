import { CommandInteraction, MessageActionRow, MessageButton, MessageComponent, MessageComponentInteraction, MessageEmbed, TextChannel } from "discord.js";

const buttonCooldown = new Set();

module.exports = {
    name: "interactionCreate",
    async execute(interaction: CommandInteraction) {
        if (!interaction.isButton()) return;

    
        if (interaction.customId === "") {
            if (buttonCooldown.has(interaction.user.id)) return interaction.reply({ content: `<@${interaction.user.id}> you are on cooldown, try again in a few seconds.`, ephemeral: true });
            buttonCooldown.add(interaction.user.id);
            setTimeout(() => buttonCooldown.delete(interaction.user.id), 30000);

        }
    }
}
