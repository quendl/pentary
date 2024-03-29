import { connect } from "mongoose";
import Logger from "./logger";

const myLogger = new Logger();

import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "../.././env") });

if (!process.env.MONGODB_TOKEN)
  throw new Error(`🔴 | No Database Connection string found in .env file.`);

if (!process.env.ADMIN_CHANNEL)
  throw new Error(`🔴 | No Admin Channel ID found.`)

myLogger.info("Connecting to Database . . .");

connect(process.env.MONGODB_TOKEN)
  .then(() => {
    myLogger.success("Successfully connected to Database.");
  })
  .catch((error: any) => console.log(error));
