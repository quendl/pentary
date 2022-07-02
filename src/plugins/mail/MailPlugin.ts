/* 
  This is an example how to use and send emails 
*/

import nodemailer from "nodemailer";
import Logger from "../../util/logger";
require("dotenv").config();

const emailLogger = new Logger();

export async function emailClient(email: string) {
  let transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    port: 587,
    secure: false, 
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  let info = await transporter.sendMail({
    from: 'Pentary Client', 
    to: email, 
    subject: "Hello test✔",
    text: "Test", 
    html: "<b>Test</b>", 
  });

  emailLogger.success("Successfully sent email")
}

