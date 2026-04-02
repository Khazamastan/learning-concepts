import crypto from 'node:crypto';

export class FeatureFlagClient {
  constructor(flags = {}) {
    this.flags = { ...flags };
  }

  updateFlag(flag, config) {
    this.flags[flag] = { ...config };
  }

  removeFlag(flag) {
    delete this.flags[flag];
  }

  isEnabled(flag, context = {}) {
    const definition = this.flags[flag];
    if (!definition) {
      return false;
    }

    const { enabled = false, rollout = 1, segments } = definition;
    if (!enabled) {
      return false;
    }

    if (Array.isArray(segments) && segments.length > 0) {
      const matchesSegment = segments.some((segment) =>
        segment(context)
      );
      if (!matchesSegment) {
        return false;
      }
    }

    const normalizedRollout = Math.min(Math.max(Number(rollout) || 0, 0), 1);
    if (normalizedRollout === 1) {
      return true;
    }

    const seed = `${flag}:${context.id ?? context.email ?? context.session ?? Math.random()}`;
    const hash = crypto.createHash('sha256').update(seed).digest('hex');
    const bucket = parseInt(hash.slice(0, 8), 16) / 0xffffffff;
    return bucket < normalizedRollout;
  }
}
