import { TRACKING_QUERY_PARAM_NAMES, TRACKING_QUERY_PARAM_PREFIXES } from "./constants";

const SHAREABLE_PROTOCOLS = new Set(["http:", "https:"]);

export function sanitizeShareUrl(rawUrl: string | undefined): string | null {
  if (rawUrl == null || rawUrl.length === 0) {
    return null;
  }

  const parsedUrl = parseUrl(rawUrl);

  if (parsedUrl == null) {
    return null;
  }

  if (!SHAREABLE_PROTOCOLS.has(parsedUrl.protocol)) {
    return null;
  }

  for (const paramName of Array.from(parsedUrl.searchParams.keys())) {
    const shouldStripParam =
      TRACKING_QUERY_PARAM_NAMES.has(paramName) ||
      TRACKING_QUERY_PARAM_PREFIXES.some((prefix) => paramName.startsWith(prefix));

    if (shouldStripParam) {
      parsedUrl.searchParams.delete(paramName);
    }
  }

  return parsedUrl.toString();
}

function parseUrl(rawUrl: string): URL | null {
  try {
    return new URL(rawUrl);
  } catch {
    return null;
  }
}
