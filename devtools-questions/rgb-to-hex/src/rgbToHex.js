export function rgbToHex(r, g, b) {
  const clamp = (value) => Math.max(0, Math.min(255, Number(value)));
  return [clamp(r), clamp(g), clamp(b)]
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}
