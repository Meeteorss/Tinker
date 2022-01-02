import nodemailer from "nodemailer";

import { v4 } from "uuid";
import { redis } from "./redis";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "meeteorss.projecta@gmail.com",
    pass: "projecttinker98^^",
  },
});

export const createConfirmationUrl = async (userId: string) => {
  const token = v4();
  await redis.set(token, userId, "ex", 60 * 60 * 24 * 7);

  return `https://tinker.ma/user/confirm/${token}`;

  //return `http://localhost:3000/user/confirm/${token}`;
};

export const sendConfirmationEmail = async (to: string, url: string) => {
  const mailOption = {
    from: "meeteorss.projecta@gmail.com",
    to: to,
    subject: "Confirmation email",

    html: `
    <h1>Confirmez votre email en cliquant sur le lien ci-dessous.</h1>
    <a href="${url}">${url}</a>
    `,
  };
  await transporter.sendMail(mailOption);
};

export const sendFPEmail = async (to: string, token: string) => {
  const mailOption = {
    from: "meeteorss.projecta@gmail.com",
    to: to,
    subject: "Demande de changement de mot de passe",

    html: `
    <h1>Pour changer votre mot de passe cliquez sur le lien ce-dessous.</h1>
    <a href="https://tinker.ma/user/change_password/${token}">Reset Password</a>
    `,
    // html: `
    // <h1>Pour changer votre mot de passe cliquez sur le lien ce-dessous.</h1>
    // <a href="http://localhost:3000/user/change_password/${token}">Reset Password</a>
    // `,
  };
  await transporter.sendMail(mailOption);
};
