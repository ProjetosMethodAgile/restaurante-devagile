type ValidationResult = {
  error: boolean;
  field?: "usuario" | "senha";
  message: string;
};
export function verifyInputLogin(
  usuario: string,
  senha: string
): ValidationResult {
  if (!usuario) {
    return {
      error: true,
      field: "usuario",
      message: "Preencha o usuário",
    };
  }
  if (usuario.length < 3) {
    return {
      error: true,
      field: "usuario",
      message: "nome muito curto",
    };
  }
  if (!senha) {
    return {
      error: true,
      field: "senha",
      message: "Preencha a senha",
    };
  }
  if (senha.length < 3) {
    return {
      error: true,
      field: "senha",
      message: "Senha muito fraca",
    };
  }
  return {
    error: false,
    message: "",
  };
}
