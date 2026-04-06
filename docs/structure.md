# Structure

`docs/requirements.md` を前提に、WXT の React template に可能な限り寄せた
初期版構成。

具体的な実装判断は `docs/implementation-decisions.md` を参照する。

## Directory Layout

```text
entrypoints/
  background/
    constants.ts
    context-menus.ts
    index.ts
    share.ts
    templates.ts
    text.ts
    url.ts
  options/
    App.tsx
    index.html
    main.tsx
    style.css

wxt.config.ts
```

## `entrypoints/`

### `background/index.ts`

- WXT background entrypoint for the MV3 service worker
- Registers context menus on install/startup
- Shares the current page when the toolbar action is clicked
- Dispatches context menu clicks to the share helpers

### `background/context-menus.ts`

- Defines menu metadata
- Creates `Share page on X`
- Creates `Quote selected text on X`

### `background/share.ts`

- Validates input before sharing
- Builds compose text
- Opens the X compose tab

### `background/templates.ts`

- Page share template
- Quote share template

### `background/text.ts`

- Normalizes selected text
- Truncates long selections and appends `...`
- Prefixes quoted lines with `>`

### `background/url.ts`

- Rejects unsupported protocols
- Removes common tracking query parameters while preserving page identity

### `options/index.html`

- WXT HTML entrypoint for the options page
- Declares `manifest.open_in_tab`
- Loads the React options UI

### `options/App.tsx`

- Defines the React options screen
- Keeps the page content colocated with the entrypoint, following the WXT React
  template style

### `options/main.tsx`

- Mounts the React options app with `ReactDOM.createRoot`
- Wraps the tree in `React.StrictMode`, matching the WXT React template

### `options/style.css`

- Styles the options page without adding another UI framework on top of React

## `wxt.config.ts`

- Defines the extension name and description
- Enables the `@wxt-dev/module-react` module
- Declares the minimum permissions:
  - `contextMenus`
  - `activeTab`
  - `tabs`
- Leaves popup UI undefined so the action click is handled in the background

## Why This Shape

- WXT owns manifest generation and entrypoint wiring
- Entry points stay explicit without reintroducing a custom build setup
- Background helpers stay colocated with the background entrypoint
- Options rendering follows the WXT React template's `App.tsx` + `main.tsx`
  split
- React is introduced only for the options UI
- No `content_scripts` are needed for v1 because the context menu click event
  already provides the selected text
- No persistent settings are added because storage is still out of scope

## Not Added Yet

- `content-scripts/`
- `popup/`
- `storage.ts`

Add them only when the requirements actually need them.
