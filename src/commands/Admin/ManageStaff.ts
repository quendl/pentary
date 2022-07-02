import { SlashCommandBuilder } from "@discordjs/builders";
import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  TextChannel,
} from "discord.js";

// packages
import nodemailer from "nodemailer";
require("dotenv").config();

// Config
import emojis from "../../util/frontend/emojis";
import { ownerCheck } from "../../util/guards/owner";

// Database query
import User from "../../models/Admin/GuildStaff";
import { generatedID } from "../../util/client/GenerateAID";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("staff")
    .setDescription("Add or remove staff members")
    .addSubcommand((sub) =>
      sub
        .setName("add")
        .setDescription("Add staff members")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user to add")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("email")
            .setDescription("The users email")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("remove")
        .setDescription("Remove staff members")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user to remove")
            .setRequired(true)
        )
    ),
  async execute(interaction: CommandInteraction) {
    // check if the user is an owner
    await ownerCheck(interaction);
    if (interaction.replied) return;

    await interaction.deferReply();
    const sub = interaction.options.getSubcommand();

    // admin channel stuff
    const adminChannel = (await interaction.guild?.channels.fetch(
      process.env.ADMIN_CHANNEL as string
    )) as TextChannel;

    // user and email stuff
    const user = interaction.options.getUser("user");
    const email = interaction.options.getString("email");

    const userQuery = await User.findOne({ userID: user?.id });

    // generate random ID for the user
    const applicationID = generatedID();

    // embeds for errors/success
    const userAdded = new MessageEmbed()
      .setDescription(
        `${emojis.success} | ${user} successfully added to the Staff members`
      )
      .setColor("GREEN");

    const userRemoved = new MessageEmbed()
      .setDescription(`${emojis.success} | ${user} successfully removed!`)
      .setColor("GREEN");

    const userAlreadyAdded = new MessageEmbed()
      .setDescription(`${emojis.error} | ${user} is a Staff member already!`)
      .setColor("RED");

    const userNotAdded = new MessageEmbed()
      .setDescription(`${emojis.error} | ${user} is not a Staff member yet!`)
      .setColor("RED");

    const ifIsABot = new MessageEmbed()
    .setDescription(`${emojis.error} | You cannot add bots to the Staff members!`)
    .setColor("RED");

    // notification embeds
    const userEmbed = new MessageEmbed()
      .setDescription(
        `Dear ${user?.tag}, your Profile got updated, please take a look at your E-Mail inbox.`
      )
      .setColor("DARK_GREEN");

    const AdminEmbed = new MessageEmbed()
      .setDescription(
        `${user?.tag} got added to the Staff team by ${interaction.user.tag}`
      )
      .setColor("GREEN");

    // button interaction for admins
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("admin-thread")
        .setEmoji(`${emojis.review}`)
        .setStyle("PRIMARY")
    );

    // do not allow bots being added
    if(user?.bot) return interaction.followUp({ embeds: [ifIsABot], ephemeral: true });

    // + send a message into the staff logs (discord admin channel) + Koni a DM
    if (sub === "add") {
      if (userQuery)
        return interaction.followUp({
          embeds: [userAlreadyAdded],
          ephemeral: true,
        });

      const newUser = new User({
        userID: user?.id,
        guildID: interaction.guild?.id,
        applicationID: applicationID,
        email: email,
        Date: new Date(),
      });
      newUser.save();

      interaction.followUp({
        embeds: [userAdded],
        ephemeral: true,
      });

      try {
        user?.send({ embeds: [userEmbed] }); // DM to the user
        adminChannel?.send({ embeds: [AdminEmbed], components: [row] }); // message into the admin channel
      } catch (error) {
        console.log(error);
        return;
      }

      async function main() {
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.USER,
            pass: process.env.PASS,
          },
        });
        let info = await transporter.sendMail({
          from: "Pentary Business",
          to: email!,
          subject: `Pentary Staff`,
          text: `
          Dear ${user?.tag},
          
          You have been added to the ${interaction.guild?.name}'s Staff team.

          ---- ---- ---- ----

          User: ${user?.tag} (${user?.id})
          Guild: ${interaction.guild?.name}
          Date: ${new Date()}

          ---- ---- ---- ----

          Application ID: ${applicationID}

          Keep in mind that you won't be notified about any future changes. 
          Do not share any informations from this E-Mail and secure your Application ID.
          `,
        });
      }

      main().catch(console.error);
    } else if (sub === "remove") {
      if (!userQuery)
        return interaction.followUp({
          embeds: [userNotAdded],
          ephemeral: true,
        });

      userQuery.delete();

      interaction.followUp({
        embeds: [userRemoved],
        ephemeral: true,
      });
    }
  },
};
