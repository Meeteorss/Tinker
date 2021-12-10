import nodemailer from "nodemailer";

import { v4 } from "uuid";
import { redis } from "./redis";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "meeteorss.projecta@gmail.com",
    pass: "projecta98^^",
  },
});

export const createConfirmationUrl = async (userId: string) => {
  const token = v4();
  await redis.set(token, userId, "ex", 60 * 60 * 24 * 7);

  return `http://localhost:3000/user/confirm/${token}`;
};

export const sendConfirmationEmail = async (to: string, url: string) => {
  const mailOption = {
    from: "meeteorss.projecta@gmail.com",
    to: to,
    subject: "Confirmation email",

    html: `
    <h1>to confirm your email by clicking on the link below</h1>
    <a href="${url}">${url}</a>
    `,
  };
  await transporter.sendMail(mailOption);
};

export const sendFPEmail = async (to: string, token: string) => {
  const mailOption = {
    from: "meeteorss.projecta@gmail.com",
    to: to,
    subject: "Password reset demand",

    html: `
    <h1>To change the password click on the link below</h1>
    <a href="http://localhost:3000/user/change_password/${token}">Reset Password</a>
    `,
  };
  await transporter.sendMail(mailOption);
};
