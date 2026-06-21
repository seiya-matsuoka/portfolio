# UI Tokens（色トークン / featured / ボタン規約）

このドキュメントは、ポートフォリオサイトの CSS 変数（トークン）中心のルールをまとめたメモです。  
更新手順は [`01_content-guide.md`](01_content-guide.md)、 設計は [`02_architecture.md`](02_architecture.md) を参照してください。

---

## 1. トークンの方針

- **色はできるだけ意味で持つようにする**  
  例：`--color-fg`（本文文字） / `--color-border`（枠線） / `--color-accent`（主要CTA） など  
  → Tailwind の固定色（`text-slate-800` 等）を部品内で増やしすぎない

- **ライト/ダークはトークン差し替えで対応**  
  → TSX 側はなるべく同じ実装のまま、`.theme-dark` の変数だけ変える

---

## 2. 定義場所

- トークン定義：`src/index.css`
  - `:root`（ライト）
  - `.theme-dark`（ダーク）
  - ユーティリティ：`::selection`, `.focus-ring`, `.btn-secondary`

---

## 3. テーマ切替の仕組み（class）

- `body` にクラスを付け替えてテーマを切り替えます
  - ダーク：`body.theme-dark`

---

## 4. 色トークン一覧（主要）

### 4-1. Surfaces（背景/面/枠）

- `--color-bg`：ページ全体の背景
- `--color-surface`：表面（モーダルやコントロールの背景に使う想定）
- `--color-card`：カード背景
- `--color-border`：境界線

### 4-2. Text（文字）

- `--color-fg`：主要テキスト
- `--color-muted`：補助テキスト（説明文など）

### 4-3. Accent（強調/主要CTA）

- `--color-accent`：主要CTA背景（Demoなど）
- `--color-accent-hover`：主要CTA hover
- `--color-accent-contrast`：主要CTA上の文字色
- `--color-ring`：focus ring（アウトライン）

### 4-4. Status（フィルタ/バッジ）

- `--status-done-fg`
- `--status-wip-fg`

---

## 5. ボタン規約（CTA）

### 5-1. Primary（Demo等：アクセント系）

**方針：主要CTAは `--color-accent` を使う（背景＋文字色）**

- 背景：`--color-accent`
- 文字：`--color-accent-contrast`
- hover：`--color-accent-hover`
- focus：`--color-ring`

### 5-2. Secondary（GitHub：ニュートラル系）

**方針：GitHub ボタンは primary と誤認しないよう 別系統の色＋トークン化**

`index.css` に secondary 用のトークンがあります：

- `--btn-sec-bg`
- `--btn-sec-fg`
- `--btn-sec-border`
- `--btn-sec-bg-hover`

---

## 6. Featured（控えめな強調）のトークン

featured は「色を増やしすぎず、アクセントを少量混ぜて強調」する方針です。  
以下のトークンを `ProjectCard` が参照します。

- `--featured-card-bg`：カード背景（accent を数%だけ混ぜる）
- `--featured-card-border`：枠線色（accent を混ぜる）
- `--featured-badge-bg`：サムネ左上のバッジ背景
- `--featured-badge-fg`：バッジ文字色

> featured の視覚要素は「色」だけでなく、**影を+1段・hoverの持ち上がり**なども併用して強調します。

---

## 7. トークンの変更手順

1. `src/index.css` の `:root`（ライト）で調整
2. `.theme-dark`（ダーク）も同じ意図で追従調整
3. 変更後に確認する箇所
   - 一覧カード（通常/featured）
   - モーダル（本文/ボタン/矢印）
   - フィルタとテーマセレクト

---

## 8. 注意点（デザインの一貫性）

- `--color-accent` は Demo ボタンやフィルタ等で使っているため、**ここを変えるとサイト全体の印象が変わります**
