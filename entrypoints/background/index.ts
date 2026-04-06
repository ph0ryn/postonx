import { browser, defineBackground, type Browser } from "#imports";

import { QUOTE_SELECTED_TEXT_MENU_ID, SHARE_PAGE_MENU_ID } from "./constants";
import { ensureContextMenus, isShareContextMenuId } from "./context-menus";
import { quoteSelectedText, sharePage } from "./share";

function resolvePageUrl(
  info: Browser.contextMenus.OnClickData,
  tab?: Browser.tabs.Tab,
): string | undefined {
  return info.pageUrl ?? tab?.url;
}

async function handleContextMenuClick(
  info: Browser.contextMenus.OnClickData,
  tab?: Browser.tabs.Tab,
): Promise<void> {
  const { menuItemId } = info;

  if (!isShareContextMenuId(menuItemId)) {
    return;
  }

  const pageUrl = resolvePageUrl(info, tab);

  switch (menuItemId) {
    case SHARE_PAGE_MENU_ID: {
      const didShare = await sharePage(pageUrl);

      if (!didShare) {
        console.warn("Skipped page share because no supported page URL was found.");
      }

      return;
    }

    case QUOTE_SELECTED_TEXT_MENU_ID: {
      const didShare = await quoteSelectedText(info.selectionText, pageUrl);

      if (!didShare) {
        console.warn("Skipped quote share because text or page URL could not be resolved.");
      }

      return;
    }
  }
}

async function handleToolbarActionClick(tab?: Browser.tabs.Tab): Promise<void> {
  const didShare = await sharePage(tab?.url);

  if (!didShare) {
    console.warn("Skipped page share because no supported page URL was found.");
  }
}

export default defineBackground(() => {
  const registerContextMenus = () => {
    void ensureContextMenus().catch((error) => {
      console.error("Failed to register context menus.", error);
    });
  };

  browser.runtime.onInstalled.addListener(registerContextMenus);
  browser.runtime.onStartup?.addListener(registerContextMenus);

  browser.action.onClicked.addListener((tab) => {
    void handleToolbarActionClick(tab).catch((error) => {
      console.error("Failed to handle the toolbar action.", error);
    });
  });

  browser.contextMenus.onClicked.addListener((info, tab) => {
    void handleContextMenuClick(info, tab).catch((error) => {
      console.error("Failed to handle the context menu action.", error);
    });
  });

  registerContextMenus();
});
