import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Role } from "discord.js";
import { ownerCheck } from "../../../util/guards/owner";

import StatusMessage from "../../../models/Server/StatusManager";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("statusmessages")
        .setDescription("Custom roles for status messages")
        .addRoleOption((option) => option.setName("role").setDescription("The role users should receive").setRequired(true))
        .addStringOption((option) => option.setName("message").setDescription("The status message for the role").setRequired(true)),
    async execute(interaction: CommandInteraction) {
        await ownerCheck(interaction);
        if (interaction.replied) return;

        const role = interaction.options.getRole("role") as Role
        const message = interaction.options.getString("message");

        const guildQuery = await StatusMessage.findOne({ guildID: interaction.guild?.id });

        if (!guildQuery) {
            const newSetup = new StatusMessage({
                guildID: interaction.guild?.id,
                role: role.id,
                statusmessage: message
            })
            newSetup.save();

            interaction.reply({ content: "Done", ephemeral: true });
        } else {
            await StatusMessage.findOneAndUpdate({
                guildID: interaction.guild?.id,
                role: role.id,
                statusmessage: message
            })
            interaction.reply({ content: "Done", ephemeral: true });
        }
    },
};
