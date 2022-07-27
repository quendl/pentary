import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";

// database query
import VerificationCodes from "../../models/Verification/VerificationCodes";
import VerifiedUser from "../../models/Server/VerifiedUsers";

import ActiveClient from "../../models/Admin/ActivateClient";

// configs
import emojis from "../../util/frontend/emojis";

/*

This is the backend for the create code modal.
Once you click the "redeem" button, it will open up a modal.
There you enter your verification code, it will send it to the server.

*/

const buttonCooldown = new Set();

module.exports = {
    name: "interactionCreate",
    async execute(interaction: CommandInteraction) {
        if (!interaction.isModalSubmit()) return;

        const GuildClient = await ActiveClient.findOne({ guildID: interaction.guild?.id });
        const GuildRole = GuildClient.role;

        const embed = new MessageEmbed()
            .setDescription(`${emojis.success} | You have been verified successfully!`)
            .setColor("GREEN");

        const invalidCode = new MessageEmbed()
            .setDescription(`${emojis.error} | Invalid code!`)
            .setColor("RED");

        if (interaction.customId === "verify-code-modal") {
            const codeFromUser = interaction.fields.getTextInputValue("codeInput");

            if (buttonCooldown.has(interaction.user.id)) return interaction.reply({ content: `<@${interaction.user.id}> you are on cooldown, try again in a few seconds.`, ephemeral: true });
            buttonCooldown.add(interaction.user.id);
            setTimeout(() => buttonCooldown.delete(interaction.user.id), 30000);

            const isValidCode = await VerificationCodes.findOne({ code: codeFromUser });
            if (!isValidCode) return interaction.reply({ embeds: [invalidCode], ephemeral: true });

            const newUser = new VerifiedUser({
                userID: interaction.user.id,
                guildID: interaction.guild?.id,
                Date: Date.now()
            })
            newUser.save(); // add the user to the database
            isValidCode.delete(); // delete the code from the collection as its redeemed

            const member = interaction.member as GuildMember;
            const role = interaction.guild?.roles.cache.get(GuildRole);

            member?.roles.add(role!);
            interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}