import { toQuotedBlock } from "./text";

export function buildPageShareText(url: string): string {
  return `読んでる\n${url}`;
}

export function buildQuoteShareText(text: string, url: string): string {
  return `\n\n${toQuotedBlock(text)}\n${url}`;
}
