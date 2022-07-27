import { Collection, CommandInteraction, Message, MessageActionRow, MessageButton, MessageComponent, MessageComponentInteraction, MessageEmbed, TextChannel } from "discord.js";

// database query
import VerificationCodes from "../../models/Verification/VerificationCodes";
import VerifiedUser from "../../models/Server/VerifiedUsers";

import ActiveClient from "../../models/Admin/ActivateClient";

// config
import emojis from "../../util/frontend/emojis";

function generateID() {
    let length = 12,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const buttonCooldown = new Set();

module.exports = {
    name: "interactionCreate",
    async execute(interaction: CommandInteraction) {
        if (!interaction.isButton()) return;

        const verificationCode = generateID();
        const AdminChannel = process.env.ADMIN_CHANNEL as unknown as TextChannel;

        const hasVerificationCode = await VerificationCodes.findOne({ userID: interaction.user.id });
        const isVerified = await VerifiedUser.findOne({ userID: interaction.user.id });

        const isClientEnabled = await ActiveClient.findOne({ guildID: interaction.guild?.id });

        if (interaction.customId === "create-code") {
            if (buttonCooldown.has(interaction.user.id)) return interaction.reply({ content: `<@${interaction.user.id}> you are on cooldown, try again in a few seconds.`, ephemeral: true });
            buttonCooldown.add(interaction.user.id);
            setTimeout(() => buttonCooldown.delete(interaction.user.id), 30000);

            if (!isClientEnabled) return interaction.reply({ content: `${emojis.error} | This is currently disabled`, ephemeral: true });
            if (hasVerificationCode || isVerified) return interaction.reply({ content: `${emojis.error} | You are already verified or have a verification code pending!`, ephemeral: true });

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId("YES")
                        .setLabel("Yes")
                        .setStyle("SUCCESS"),

                    new MessageButton()
                        .setCustomId("NO")
                        .setLabel("No")
                        .setStyle("DANGER")
                );

            const embed = new MessageEmbed()
                .setDescription(
                    `
        **Trying to generate a verification code**
        Please do not share your code anywhere.

        By generating and redeeming a verification code, you accept
        the rules and privacy policy of ${interaction.guild?.name} 

        If this wasn't an accident, click \`YES\` below.
        `)

            const cancelledEmbed = new MessageEmbed()
                .setDescription(`Successfully cancelled verification`)
                .setColor("GREEN")

            const finalEmbed = new MessageEmbed()
                .setDescription(`**Successfully generated a verification code**\n\nCode: **${verificationCode}**\n\nNote: This code is only valid for a short amount of time.\nIf you run into any issues, please contact the support.`)
                .setColor("GREEN")

            const timedOut = new MessageEmbed()
                .setDescription(`You didn't choosed any option, the time ran out.`)
                .setColor("RED")

            const msg = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true, fetchReply: true }) as Message;

            const collector = msg.channel.createMessageComponentCollector({
                componentType: 'BUTTON',
                time: 15000,
            });

            collector.on("collect", async (i: MessageComponentInteraction) => {
                if (i.customId === "YES") {
                    const newCode = new VerificationCodes({
                        userID: interaction.user.id,
                        guildID: interaction.guild?.id,
                        code: verificationCode,
                    })
                    newCode.save();

                    interaction.editReply({
                        embeds: [finalEmbed],
                        components: [],
                    })
                }
                if (i.customId === "NO") {
                    interaction.editReply({
                        embeds: [cancelledEmbed],
                        components: [],
                    })
                }
            })

            collector.on("end", async (collected: Collection<string, MessageComponent>, error: string) => {
                try {
                    // edit the message and disable the buttons once the time runs out
                    msg.components[0].components.map(c => c.setDisabled(true));
                    await interaction.editReply({ embeds: [timedOut], components: msg.components });
                } catch (error: any) {
                    console.log(error)
                }
            })
        }
    }
}
