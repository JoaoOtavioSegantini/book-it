import nodemailer from 'nodemailer'
import { Options } from 'nodemailer/lib/smtp-transport'
import handlebars from 'handlebars'
import fs from 'fs'

const sendEmail = async (
  options: Options & { email: string; message?: string },
  variables: object,
  path: string
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: Number(process.env.MAILTRAP_PORT),
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  })

  const templateFileContent = fs.readFileSync(path).toString('utf-8')
  const mailTemplateParse = handlebars.compile(templateFileContent)
  const html = mailTemplateParse(variables)

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html
  }

  await transporter.sendMail(message)
}

export default sendEmail
