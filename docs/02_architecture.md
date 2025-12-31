# Architecture（アーキテクチャ概要）

このドキュメントは、ポートフォリオサイトの設計（構造、状態管理、URL同期）を、まとめたものです。  
更新手順は [`01_content-guide.md`](01_content-guide.md)、UIトークンは [`03_ui-tokens.md`](03_ui-tokens.md) を参照してください。

---

## 1. 全体像

- **Vite + React（SPA / CSR）** の1ページ構成
- 作品データは **静的データ（`src/data/projects.ts`）**
- **URLクエリ（`?p=slug` / `?status=` / `?kind=`）** で状態共有

---

## 2. ディレクトリと責務

- `src/main.tsx`
  - エントリポイント（`<App />` を render）
- `src/App.tsx`
  - 一覧ページ（ヒーロー・フィルタ・グリッド・モーダル制御）
  - **状態管理と URL 同期の中心**
- `src/components/*`
  - `Filters.tsx`：Status / Kind の絞り込みUI（折りたたみ）
  - `Header.tsx`：サイト上部（名前・リンク・テーマ切替）
  - `ProjectCard.tsx`：一覧カード（サムネ・バッジ・CTA）
  - `ProjectModal.tsx`：詳細モーダル（ギャラリー・説明・CTA）
  - `ThemeControls.tsx`：テーマ（Light/Dark/Auto）選択UI
- `src/data/projects.ts`
  - Project 型 / projects 配列（表示のソース）
- `src/lib/asset.ts`
  - `asset(path)`：`BASE_URL` を考慮してアセットパスを生成
- `src/lib/theme.ts`
  - テーマモード適用（`theme-dark` class 付与）と localStorage 永続化
  - Auto（system）は `matchMedia` で追随

---

## 3. 画面構成（コンポーネント階層）

`App.tsx` をトップに、概ね次の構成です。

- `<Header />`
- `<main>`
  - ヒーロー（タイトル / 概要）
  - `<Filters />`（折りたたみ）
  - グリッド（`<ProjectCard />` の繰り返し）
- `<ProjectModal />`（`selectedSlug !== null` のとき表示）

---
