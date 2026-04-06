import { browser } from "#imports";

import { MAX_QUOTED_TEXT_LENGTH, X_COMPOSE_URL } from "./constants";
import { buildPageShareText, buildQuoteShareText } from "./templates";
import { normalizeSelectedText, truncateSelectedText } from "./text";
import { sanitizeShareUrl } from "./url";

async function openComposeScreen(prefilledText: string): Promise<void> {
  const composeUrl = new URL(X_COMPOSE_URL);

  composeUrl.searchParams.set("text", prefilledText);

  await browser.tabs.create({
    active: true,
    url: composeUrl.toString(),
  });
}

export async function sharePage(rawUrl: string | undefined): Promise<boolean> {
  const sanitizedUrl = sanitizeShareUrl(rawUrl);

  if (sanitizedUrl == null) {
    return false;
  }

  await openComposeScreen(buildPageShareText(sanitizedUrl));

  return true;
}

export async function quoteSelectedText(
  rawText: string | undefined,
  rawUrl: string | undefined,
): Promise<boolean> {
  const sanitizedUrl = sanitizeShareUrl(rawUrl);
  const normalizedText = normalizeSelectedText(rawText);

  if (sanitizedUrl == null || normalizedText == null) {
    return false;
  }

  const truncatedText = truncateSelectedText(normalizedText, MAX_QUOTED_TEXT_LENGTH);

  await openComposeScreen(buildQuoteShareText(truncatedText, sanitizedUrl));

  return true;
}
