import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  secure: true,
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});
export const sendEmail = async (options) => {
  try {
    console.log('Sending email with options:', options);
    const result = await transporter.sendMail(options);
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Email sending error:', error.message);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
