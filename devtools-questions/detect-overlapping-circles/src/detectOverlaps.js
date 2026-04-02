/**
 * Determine if any circles overlap and get the overlapping pairs.
 * @param {{ id: string, x: number, y: number, radius: number }[]} circles
 * @returns {{ hasOverlap: boolean, overlaps: [string, string][] }}
 */
export function detectOverlappingCircles(circles) {
  const overlaps = [];

  for (let i = 0; i < circles.length; i += 1) {
    for (let j = i + 1; j < circles.length; j += 1) {
      const a = circles[i];
      const b = circles[j];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance < a.radius + b.radius) {
        overlaps.push([a.id, b.id]);
      }
    }
  }

  return {
    hasOverlap: overlaps.length > 0,
    overlaps,
  };
}
