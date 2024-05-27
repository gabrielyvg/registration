import mail from "../lib/mail";

export default {
  key: 'RegistrationMail',
  async handle({ data }) {
    const { user } = data;

    await mail.sendMail({
      from: 'Test <test@mail.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de usuário',
      html: `Olá ${user.name}, seja bem-vindo`
    })
  }

}