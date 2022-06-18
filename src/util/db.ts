import { connect } from "mongoose";
import Logger from "./logger";

const myLogger = new Logger();

import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "../.././env") });

myLogger.info("Connecting to Database . . .");
connect(process.env.MONGODB_TOKEN as string)
  .then(() => {
    myLogger.success("Successfully connected to database.");
  })
  .catch((error: any) => console.log(error));
