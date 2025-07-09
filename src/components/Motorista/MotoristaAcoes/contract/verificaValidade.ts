export function isExpired(dateStr: string): boolean {
  // Date.parse retorna number (ms desde 1970) ou NaN se for inválido
  const ts = Date.parse(dateStr);
  return !isNaN(ts) && ts < Date.now();
}