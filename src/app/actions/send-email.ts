"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  try {
    const data = await resend.emails.send({
      from: "Site Loading Technology <contato@loadingtechnology.com>",
      to: "suporte@chopphub.com",
      replyTo: email,
      subject: `[Novo Contato] ${subject}`,
      text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`,
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Erro ao enviar e-mail" };
  }
}
