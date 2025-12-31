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
