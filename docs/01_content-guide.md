# Content Guide（更新ガイド）

このドキュメントはポートフォリオサイトの中身（掲載プロジェクト情報・画像）を更新するための手順メモです。  
設計は [`02_architecture.md`](02_architecture.md)、UIトークンは [`03_ui-tokens.md`](03_ui-tokens.md) を参照してください。

---

## 更新の入口

- **掲載プロジェクトの追加/編集**：`src/data/projects.ts`
- **画像の追加**：`public/images/projects/<slug>/`
- **サイトURL**：`VITE_SITE_URL`（環境変数）

---

## 1. プロジェクト情報の更新（src/data/projects.ts）

### 1-1. 追加/編集の基本手順

1. `projects: Project[]` にオブジェクトを追加 / 既存を編集
2. 必要なら画像を `public/images/projects/<slug>/` に配置
3. `npm run dev` で表示確認（カード表示 / モーダル / 画像 / リンク / フィルタ）

---

### 1-2. Project 型（更新対象フィールド）

`Project` は以下のフィールドで構成されています。

#### 必須

- `slug: string`
  - URL・画像パス・モーダル直リンク（`?p=<slug>`）のキーになります
  - **ユニーク**にすること
- `title: string`
- `summary: string`（カードにも表示される短い説明）
- `status: 'DONE' | 'WIP'`
- `kind: 'Game' | 'Web App' | 'Tool'`
- `tech: string[]`（技術タグ）
- `repoUrl: string`（GitHubリンク）

#### 任意（必要なプロジェクトだけ）

- `liveUrl?: string`（デモURL。無い場合はDemoボタンが表示されない）
- `thumb?: string`
  - 例：`images/projects/<slug>/thumb.webp`
- `description?: string`
  - モーダル用の詳細説明（未指定なら `summary` を使用）
  - 改行を入れたい場合は `\n` を入れてOK（モーダルは改行を保持して表示）
- `features?: string[]`
  - モーダル内の箇条書き（主な機能・要点）
- `images?: string[]`
  - 追加スクショ（thumb の後にスライドとして表示）
  - 例：`images/projects/<slug>/1.webp`, `2.webp` ...
- `featured?: boolean`
  - `true` のものはカード上で控えめに強調（並び順も優先）
- `updatedAt?: string`
  - 更新日ソートに使用（未指定だと `0` 扱いになり下に回りやすい）
  - 推奨：`YYYY-MM-DD` 形式

---

### 1-3. 表示・並び順のルール

一覧の並びは次の優先度です。

1. `featured: true` が先頭
2. `updatedAt` の降順（新しいものが先）
3. それでも同じなら `title` の辞書順

「上に出したい」なら `featured: true` または `updatedAt` を最新にしてください。

---
