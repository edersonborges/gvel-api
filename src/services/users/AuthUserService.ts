import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../../configs/config';

interface AuthRequest {
  email: string;
  senha: string;
}

class AuthUserService {
  async execute({ email, senha }: AuthRequest) {
    const usuario = await prismaClient.usuario.findFirst({
      where: {
        email,
        deletedAt: null
      }
    });

    if (!usuario || !(await compare(senha, usuario.senha))) {
      return 'Usuário ou senha incorretos. Tente novamente.';
    }

    if (usuario.deletedAt !== null) {
      return 'Usuário não encontrado.';
    }

    const jwtSecret = JWT_SECRET;

    if (!jwtSecret) {
      return 'Chave secreta JWT não definida.';
    }

    const token = sign(
      {
        nome: usuario.nome,
        email: usuario.email, // Incluindo email no payload
        tipo: usuario.tipo, // Incluindo tipo
      },
      jwtSecret,
      {
        subject: usuario.id.toString(),
        expiresIn: '1d',
      }
    );

    return {
      message: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email, // Retornar email em vez de telefone
        token: token,
      }
    };
  }
}

export { AuthUserService };
