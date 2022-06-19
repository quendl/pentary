export class GuildNotFoundError extends Error {
  constructor(guildID: string) {
    super(`You are not withing the guild: ${guildID}`);
  }
}
