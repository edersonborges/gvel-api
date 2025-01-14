import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EMAIL, EMAIL_PORT, EMAIL_HOST, PSW_EMAIL } from '../configs/config';

// Configuração do transport com as variáveis corretas
const transporter = nodemailer.createTransport({
    host: EMAIL_HOST, // Correção: usar EMAIL_HOST aqui
    port: Number(EMAIL_PORT), // Correção: usar EMAIL_PORT aqui
    secure: true, // true para 465, false para outras portas
    auth: {
        user: EMAIL,
        pass: PSW_EMAIL
    },
    debug: true // Habilita logs detalhados para verificar a conexão
} as SMTPTransport.Options);

export const sendEmail = async (to: string, subject: string, html: string, text?: string) => {
    try {
        // Verifica se as variáveis de ambiente estão sendo carregadas
        console.log('Configurações de e-mail:', { EMAIL, EMAIL_PORT, EMAIL_HOST, PSW_EMAIL });

        const info = await transporter.sendMail({
            from: EMAIL,
            to,
            subject,
            html,
            text
        });

        console.log('E-mail enviado com sucesso:', info.response);
        return info;
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        throw error;
    }
};
