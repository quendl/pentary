import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember, Role } from "discord.js";

// utility
import { ownerCheck } from "../../../util/guards/owner";
import ms from "ms";

// database
import TempRoleSetup from "../../../models/Server/TempRoles";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tr")
        .setDescription("Temp roles")
        .addUserOption((option) => option.setName("target").setDescription("The user for the temp role").setRequired(true))
        .addRoleOption((option) => option.setName("role").setDescription("The role the user should receive").setRequired(true))
        .addStringOption((option) => option.setName("time").setDescription("The time in seconds the user should keep the role").setRequired(true)),
    async execute(interaction: CommandInteraction) {
        await ownerCheck(interaction);
        if (interaction.replied) return;

        const target = interaction.options.getMember("target") as GuildMember;
        const role = interaction.options.getRole("role") as Role;
        const duration = interaction.options.getString("time");

        const roleQuery = await TempRoleSetup.findOne({ userID: target.id });
        if(roleQuery) return interaction.reply({ content: `${target} already has a temp role.`, ephemeral: true }); 

        if(duration === null) return;

        const reg = new RegExp('^[0-9]+$');
        if (!reg.test(duration)) return interaction.reply({ content: "The time must be a number like 10000 (10s)", ephemeral: true });

        // convert 10000ms into 10s (example)
        let time; 
        time = ms(duration);

        const newUser = new TempRoleSetup({
            userID: target.id,
            guildID: interaction.guild?.id,
            role: role.id,
            duration: ~~((Date.now() + time) / 1000),
        })
        newUser.save();

        target.roles.add(role);

        interaction.reply({ content: "Done", ephemeral: true });
    },
};
