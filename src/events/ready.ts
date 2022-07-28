import Logger from "../util/logger";

const infoLogger = new Logger();

module.exports = {
  name: "ready",
  once: true,
  execute(client: any) {
    infoLogger.success(`${client.user.tag} is online!`);
  },
};
