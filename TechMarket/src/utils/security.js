export function sanitizarTexto(texto) {

  return texto
    .replace(/[<>]/g, "")
    .trim();

}