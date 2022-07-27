import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { ownerCheck } from "./util/guards/owner";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("")
        .setDescription(""),
    async execute(interaction: CommandInteraction) {
        await ownerCheck(interaction);
        if (interaction.replied) return;

    },
};
