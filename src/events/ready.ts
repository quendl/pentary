import Logger from "../util/logger";
//import { TempRole } from "./cron/TempRoles";

const infoLogger = new Logger();

module.exports = {
  name: "ready",
  once: true,
  execute(client: any) {
    infoLogger.success(`${client.user.tag} is online!`);
  //  TempRole();
  },
};
