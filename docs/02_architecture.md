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

## 4. 状態管理

外部状態管理ライブラリは使わず、React の `useState` / `useMemo` / `useEffect` で管理します。

### App.tsx が持つ主な状態

- `selectedSlug: string | null`
  - モーダルの開閉と対象プロジェクトを決める
- `status: 'ALL' | 'DONE' | 'WIP'`
  - Status フィルタ
- `selectedKinds: Set<ProjectKind>`
  - Kind フィルタ（複数選択）
- `openedViaClickRef: boolean (ref)`
  - クリックで開いたか / 直リンクで開いたか を判定し、閉じ方を変える

### Filters.tsx が持つ状態

- `open: boolean`
  - 折りたたみの開閉（デフォルトは閉）

---

## 5. データフロー（projects.ts → 画面）

- `projects`（全件）を `App.tsx` が import
- `filtered`（status/kind 適用）を `useMemo` で生成
- `sorted`（featured → updatedAt → title）を `useMemo` で生成
- `sorted.map(...)` で `<ProjectCard />` を描画
- カードクリック or キーボードで `selectedSlug` をセット → `<ProjectModal />` 表示

---

## 6. URL 同期（共有できる状態）

### 6-1. 反映するクエリ

- `p=<slug>`：モーダル直リンク
- `status=DONE|WIP`（ALL は付けない）
- `?kind=Game%2CWeb+0App...`（未選択なら付けない）

### 6-2. URL → 状態（復元）

`App.tsx` 初期化時に `window.location.search` を読み、

- `p` が妥当なら `selectedSlug` をセット
- `status/kind` をパースして state を初期化

### 6-3. 状態 → URL（同期）

`status` / `selectedKinds` が変わるたびに、

- 既存URLとの差分があるときだけ `pushState` でクエリを更新します

---
