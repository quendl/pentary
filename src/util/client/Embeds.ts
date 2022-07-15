import { MessageEmbed } from "discord.js";
import emojis from "../frontend/emojis";

export function Embed(
  title: string,
  description: string,
  color: any,
  footer: string,
  author: string
) {
  return new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp()
    .setFooter({ text: footer })
    .setAuthor({ name: author });
}

export function permissionErrorEmbed(description: string) {
  return new MessageEmbed()
    .setDescription(`${emojis.error} | You are not allowed to do that!`)
    .setColor("RED")
    .setTimestamp();
}
