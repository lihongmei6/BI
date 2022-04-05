export function fontSize(res: number) {
  let clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (!clientWidth) return;
  let fontSize = 100 * (clientWidth / 1920);
  if (res * fontSize < 10) {
    return 10;
  }
  return res * fontSize;
}
