/**
 * Remove tudo que não for dígito
 */
export function onlyDigits(value: string): string {
  return value.replace(/\D+/g, '');
}

/**
 * Formata CPF como ###.###.###-##
 */
export function formatCPF(raw?: string): string | null {
  if (!raw) return null;
  const digits = onlyDigits(raw);
  if (digits.length !== 11) return raw; 
  return digits.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    '$1.$2.$3-$4'
  );
}

/**
 * Formata RG como ##.###.###-#  (suporta 8 ou 9 dígitos)
 */
export function formatRG(raw?: string): string | null {
  if (!raw) return null;
  const digits = onlyDigits(raw);
  if (digits.length === 9) {
    return digits.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{1})$/,
      '$1.$2.$3-$4'
    );
  }
  if (digits.length === 8) {
    return digits.replace(
      /^(\d{1})(\d{3})(\d{3})(\d{1})$/,
      '$1.$2.$3-$4'
    );
  }
  return raw;
}

/**
 * Formata CNPJ como ##.###.###/####-##
 */
export function formatCNPJ(raw?: string): string | null {
  if (!raw) return null;
  const digits = onlyDigits(raw);
  if (digits.length !== 14) return raw;
  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

/**
 * Formata CNH como ###.###.###-##
 */
export function formatCNH(raw?: string): string | null {
  if (!raw) return null;
  const digits = onlyDigits(raw);
  if (digits.length !== 11) return raw;
  return digits.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    '$1.$2.$3-$4'
  );
}
