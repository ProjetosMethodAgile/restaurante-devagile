/**
 * Converte "DD/MM/YYYY" em ISO "YYYY-MM-DD", montando um Date às 12:00 local
 * para evitar shift de timezone.
 */
export function formatDateToISO(dmy?: string): string | null {
  if (!dmy) return null;

  const parts = dmy.trim().split('/');
  if (parts.length !== 3) return null;

  const [dia, mes, ano] = parts.map(p => p.padStart(2, '0'));
  if (isNaN(+dia) || isNaN(+mes) || isNaN(+ano)) return null;

  const dt = new Date(
    +ano,
    +mes - 1,
    +dia,
    12,  // hora
    0,   // minuto
    0    // segundo
  );

  return dt.toISOString().split('T')[0];
}
/**
 * Converte uma string no formato "YYYY-MM-DD" para "DD/MM/YYYY" para exibição.
 * @param ymd — string ISO date no formato ano-mês-dia
 * @returns string no formato dia/mês/ano ou null se inválido
 */
export function formatDateToView(ymd?: string): string | null {
  if (!ymd) return null;

  const parts = ymd.trim().split('-');
  if (parts.length !== 3) return null;

  const [ano, mes, dia] = parts;

  const dd = dia.padStart(2, '0');
  const mm = mes.padStart(2, '0');
  const yyyy = ano;

  if (isNaN(+dd) || isNaN(+mm) || isNaN(+yyyy)) return null;

  return `${dd}/${mm}/${yyyy}`;
}
