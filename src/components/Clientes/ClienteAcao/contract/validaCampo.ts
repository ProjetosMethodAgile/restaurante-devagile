export const validaAlteracao = <T extends object>(
  antigo: T,
  novo: Partial<T>,
): boolean =>
  Object.entries(novo).some(
    ([chave, valor]) =>
      valor !== undefined && (antigo as any)[chave] !== valor
  )
