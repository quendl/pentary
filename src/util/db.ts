import { connect } from "mongoose";
import Logger from "./logger";

const myLogger = new Logger();

import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "../.././env") });

if (!process.env.MONGODB_TOKEN)
  throw new Error(`🔴 | No Database Connection string found in dotenv file.`);

myLogger.info("Connecting to Database . . .");

connect(process.env.MONGODB_TOKEN)
  .then(() => {
    myLogger.success("Successfully connected to database.");
  })
  .catch((error: any) => console.log(error));
