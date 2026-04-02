/**
 * Distribute a prize pool across participants based on their relative weights.
 * @param {number} prizePool - Total prize amount to distribute.
 * @param {{id: string, weight: number}[]} participants - Participants with associated weights.
 * @returns {{id: string, share: number, amount: number}[]}
 */
export function calculatePrizeDistribution(prizePool, participants) {
  if (prizePool < 0 || !Number.isFinite(prizePool)) {
    throw new Error('Prize pool must be a finite non-negative number.');
  }

  const sanitized = participants
    .filter((p) => p && typeof p.id === 'string' && Number(p.weight) > 0)
    .map((p) => ({ id: p.id, weight: Number(p.weight) }));

  const totalWeight = sanitized.reduce((sum, { weight }) => sum + weight, 0);
  if (totalWeight === 0) {
    return sanitized.map(({ id }) => ({ id, share: 0, amount: 0 }));
  }

  return sanitized.map(({ id, weight }) => {
    const share = weight / totalWeight;
    return {
      id,
      share,
      amount: Number((prizePool * share).toFixed(2)),
    };
  });
}
