import { browser, type Browser } from "#imports";

import {
  QUOTE_SELECTED_TEXT_MENU_ID,
  SHARE_PAGE_MENU_ID,
  SUPPORTED_PAGE_PATTERNS,
} from "./constants";

export type ShareContextMenuId = typeof SHARE_PAGE_MENU_ID | typeof QUOTE_SELECTED_TEXT_MENU_ID;

const contextMenuItems: Browser.contextMenus.CreateProperties[] = [
  {
    contexts: ["page"],
    documentUrlPatterns: SUPPORTED_PAGE_PATTERNS,
    id: SHARE_PAGE_MENU_ID,
    title: "Share page on X",
  },
  {
    contexts: ["selection"],
    documentUrlPatterns: SUPPORTED_PAGE_PATTERNS,
    id: QUOTE_SELECTED_TEXT_MENU_ID,
    title: "Quote selected text on X",
  },
];

export async function ensureContextMenus(): Promise<void> {
  await browser.contextMenus.removeAll();

  for (const item of contextMenuItems) {
    browser.contextMenus.create(item);
  }
}

export function isShareContextMenuId(value: string | number): value is ShareContextMenuId {
  return value === SHARE_PAGE_MENU_ID || value === QUOTE_SELECTED_TEXT_MENU_ID;
}
