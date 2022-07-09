import { ClientEvents } from "discord.js";

export type DiscordEvents = keyof ClientEvents

export type TypeOrPromise<Type> = Type | Promise<Type>;
export type Permissions = "OWNER" | "USER";

/**
 * Type the arguments of an event
 */
export type ArgsOf<K extends keyof ClientEvents> = ClientEvents[K];
