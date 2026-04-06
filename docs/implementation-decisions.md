# 実装判断メモ

本書は、初期版の実装で具体的に固定した事項を整理するための補足文書である。
要求そのものは `docs/requirements.md` を正とし、本書はその実装具体化を扱う。

## 1. 採用技術

- Manifest V3 拡張の基盤として WXT を採用する
- options UI には React を採用し、WXT React template の構成に寄せる
- スタイリングは CSS のまま維持し、追加の UI フレームワークは導入しない

## 2. 画面と遷移

- 拡張機能アイコン押下時は action popup を出さず、options ページを開く
- options ページは `options_ui.open_in_tab = true` とし、タブで表示する
- X の投稿画面は新規タブで開く

## 3. 共有時の加工ルール

### URL

- `http:` と `https:` のみ共有対象とする
- 以下のクエリパラメータは共有前に除去する
  - `fbclid`
  - `gclid`
  - `igshid`
  - `mc_cid`
  - `mc_eid`
  - `ref`
  - `si`
- `utm_` で始まるクエリパラメータは除去する

### 選択テキスト

- 改行は `\n` に正規化する
- 各行の前後空白は除去する
- 3 連続以上の改行は 2 連続に畳む
- 引用時の最大長は 240 文字とする
- 上限超過時は末尾を `...` に置き換える
- 引用テンプレートでは各行の先頭に `>` を付与する

## 4. ディレクトリ方針

- `src/` は使わず、WXT の慣例に合わせて `entrypoints/` を基点にする
- options 画面は `entrypoints/options/App.tsx` と `main.tsx` に集約する
- background 関連の helper は `entrypoints/background/` 配下へ寄せる
- 目的は、WXT React template の構造にできるだけ寄せつつ、この拡張に必要
  な最小構成を保つことにある

## 5. 初期版で採らないもの

- action popup
- content script
- 永続設定用の `storage`
- ユーザー向けエラー通知 UI
