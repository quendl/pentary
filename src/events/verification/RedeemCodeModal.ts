import { Collection, CommandInteraction, MessageActionRow, Modal, ModalActionRowComponent, TextInputComponent } from "discord.js";

// database query
import VerifiedUser from "../../models/Server/VerifiedUsers";
import ActiveClient from "../../models/Admin/ActivateClient";

// config
import emojis from "../../util/frontend/emojis";

/*

This is the frontend for the create code modal.
Once you click the "redeem" button, it will open up a modal.

*/

module.exports = {
    name: "interactionCreate",
    async execute(interaction: CommandInteraction) {
        if (!interaction.isButton()) return;

        const isVerified = await VerifiedUser.findOne({ userID: interaction.user.id });

        const isClientEnabled = await ActiveClient.findOne({ guildID: interaction.guild?.id });

        const modal = new Modal()
            .setTitle("Verification Code")
            .setCustomId("verify-code-modal")

        const codeInput = new TextInputComponent()
            .setCustomId("codeInput")
            .setLabel("Enter your generated verification code")
            .setStyle("SHORT")
            .setMaxLength(12)
            .setRequired(true)

        const codeActionRow = new MessageActionRow<ModalActionRowComponent>().addComponents(codeInput)
        modal.addComponents(codeActionRow)

        if (interaction.customId === "verify-code") {
            if (!isClientEnabled) return interaction.reply({ content: `${emojis.error} | This is currently disabled.`, ephemeral: true });
            if (isVerified) return interaction.reply({ content: `${emojis.error} | You are already verified!`, ephemeral: true });

            await interaction.showModal(modal)
        }
    }
}

