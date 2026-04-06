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

export function truncateSelectedText(text: string, maxLength: number): string {
  const characters = Array.from(text);

  if (characters.length <= maxLength) {
    return text;
  }

  return `${characters.slice(0, maxLength - 3).join("")}...`;
}

export function toQuotedBlock(text: string): string {
  return text
    .split("\n")
    .map((line) => {
      if (line.length === 0) {
        return ">";
      }

      return `> ${line}`;
    })
    .join("\n");
}
