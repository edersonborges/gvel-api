declare namespace Express {
  export interface User {
    id: string;
    nome: string;
    telefone: string;
    tipo: int;
  }

  export interface Request {
    user_id: string;
    user?: User;
  }
}
