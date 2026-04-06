# postonx

A WXT-based browser extension that opens the X compose screen from the context
menu with the current page URL or selected text prefilled.

## Requirements

- pnpm

## Local Development

1. Install dependencies with `pnpm install`
2. Start the dev builder with `pnpm run dev`
3. Load the generated extension from `.output/chrome-mv3/`

## Tooling

- [WXT](https://wxt.dev/)
- [ESLint](./eslint.config.mjs)
- [oxlint](./oxlint.config.ts)
- [oxfmt](./.oxfmtrc.jsonc)
