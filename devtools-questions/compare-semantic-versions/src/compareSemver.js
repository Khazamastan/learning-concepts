const SEMVER_REGEX =
  /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-(?<prerelease>(?:0|[1-9A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9A-Za-z-][0-9A-Za-z-]*))*))?(?:\+(?<build>[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

export function parseSemver(version) {
  if (typeof version !== "string") {
    throw new TypeError("Version must be a string");
  }

  const match = version.trim().match(SEMVER_REGEX);
  if (!match || !match.groups) {
    throw new Error(`"${version}" is not a valid semantic version`);
  }

  const { major, minor, patch, prerelease = "", build = "" } = match.groups;
  return {
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
    prerelease: prerelease ? prerelease.split(".") : [],
    build,
    input: version.trim(),
  };
}

export function compareSemver(a, b) {
  const left = typeof a === "string" ? parseSemver(a) : a;
  const right = typeof b === "string" ? parseSemver(b) : b;

  for (const key of ["major", "minor", "patch"]) {
    if (left[key] > right[key]) return 1;
    if (left[key] < right[key]) return -1;
  }

  const leftPre = left.prerelease;
  const rightPre = right.prerelease;

  if (leftPre.length === 0 && rightPre.length === 0) return 0;
  if (leftPre.length === 0) return 1; // normal > prerelease
  if (rightPre.length === 0) return -1;

  const maxLength = Math.max(leftPre.length, rightPre.length);
  for (let i = 0; i < maxLength; i += 1) {
    const leftIdentifier = leftPre[i];
    const rightIdentifier = rightPre[i];

    if (leftIdentifier === undefined) return -1;
    if (rightIdentifier === undefined) return 1;

    const leftIsNumber = isNumericIdentifier(leftIdentifier);
    const rightIsNumber = isNumericIdentifier(rightIdentifier);

    if (leftIsNumber && rightIsNumber) {
      const leftNum = Number(leftIdentifier);
      const rightNum = Number(rightIdentifier);
      if (leftNum > rightNum) return 1;
      if (leftNum < rightNum) return -1;
    } else if (leftIsNumber && !rightIsNumber) {
      return -1;
    } else if (!leftIsNumber && rightIsNumber) {
      return 1;
    } else {
      if (leftIdentifier > rightIdentifier) return 1;
      if (leftIdentifier < rightIdentifier) return -1;
    }
  }

  return 0;
}

function isNumericIdentifier(identifier) {
  return /^\d+$/.test(identifier);
}
