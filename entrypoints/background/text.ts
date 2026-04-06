import twitterText from "twitter-text";

export function normalizeSelectedText(rawText: string | undefined): string | null {
  if (rawText == null || rawText.length === 0) {
    return null;
  }

  const normalizedText = rawText
    .replaceAll(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replaceAll(/\n{3,}/g, "\n\n")
    .trim();

  if (normalizedText.length === 0) {
    return null;
  }

  return normalizedText;
}

export function getXWeightedLength(text: string): number {
  return twitterText.parseTweet(text).weightedLength;
}

interface TruncateTextToWeightedLengthOptions {
  maxWeightedLength: number;
  omission?: string;
}

export function truncateTextToWeightedLength(
  text: string,
  { maxWeightedLength, omission = "..." }: TruncateTextToWeightedLengthOptions,
): string {
  if (getXWeightedLength(text) <= maxWeightedLength) {
    return text;
  }

  const characters = Array.from(text);
  let low = 0;
  let high = characters.length - 1;
  let bestCandidate = "";

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const candidate = `${characters.slice(0, middle).join("")}${omission}`;

    if (getXWeightedLength(candidate) <= maxWeightedLength) {
      bestCandidate = candidate;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  if (bestCandidate.length > 0) {
    return bestCandidate;
  }

  if (getXWeightedLength(omission) <= maxWeightedLength) {
    return omission;
  }

  return "";
}

export function toQuotedBlock(text: string): string {
  return text.replace(/^/gm, "> ");
}
