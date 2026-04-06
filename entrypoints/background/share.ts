import { browser } from "#imports";

import { X_COMPOSE_URL, X_MAX_WEIGHTED_LENGTH, X_TRUNCATION_SUFFIX } from "./constants";
import { buildPageShareText, buildQuoteShareText } from "./templates";
import { normalizeSelectedText, truncateTextToFitXLimit } from "./text";
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

  const truncatedText = truncateTextToFitXLimit(normalizedText, {
    buildText: (text) => buildQuoteShareText(text, sanitizedUrl),
    maxWeightedLength: X_MAX_WEIGHTED_LENGTH,
    omission: X_TRUNCATION_SUFFIX,
  });

  await openComposeScreen(buildQuoteShareText(truncatedText, sanitizedUrl));

  return true;
}
