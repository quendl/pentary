import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";
import { generateCaseID } from "../../util/client/GenerateIDs";
import emojis from "../../util/frontend/emojis";

const buttonCooldown = new Set();

module.exports = {
  name: "interactionCreate",
  async execute(interaction: CommandInteraction) {
    if (!interaction.isButton()) return;

    if (interaction.customId === "admin-thread") {
      interaction.reply({
        content: `${emojis.success} | Successfully opened review`,
        ephemeral: true,
      });

      if (buttonCooldown.has(interaction.user.id)) return interaction.reply({ content: `<@${interaction.user.id}> you are on cooldown, try again in a few seconds.`, ephemeral: true });
      buttonCooldown.add(interaction.user.id);
      setTimeout(() => buttonCooldown.delete(interaction.user.id), 30000);

      const embed = new MessageEmbed()
        .setDescription(
          `This review thread has been opened by ${interaction.user.tag}.\n\nUse this to discuss more about the new Staff member within this thread.`
        )
        .setColor("GREEN");

      const channel = interaction.channel as TextChannel;
      const thread = await channel?.threads.create({
        name: `review-${generateCaseID()}`,
        startMessage: interaction.message as unknown as string,
        autoArchiveDuration: 60,
        reason: "Review thread",
      });
      if (thread.joinable) await thread.join();
      thread.send({ embeds: [embed] });
    }
  },
};
