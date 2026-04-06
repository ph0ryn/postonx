# ts-base

ph0ryn's typescript base template

## requirement

- pnpm (package manager)

## script

`pnpm run <script>`

```json
{
  "format": "pnpm run lint --fix . ; oxfmt . ; eslint --fix .",
  "lint": "oxlint --type-aware --type-check",
  "precommit": "pnpm run format"
}
```

## Linter

- [ESLint](./eslint.config.mjs)
  - typescript-eslint
  - @stylistic/eslint-plugin
- [oxlint](./oxlint.config.ts)
  - @stylistic/eslint-plugin

## Formatter

- [oxfmt](./.oxfmtrc.jsonc)
