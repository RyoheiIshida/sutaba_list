# スターバックス店舗情報アプリ

スターバックスの店舗情報を管理・閲覧するWebアプリケーション。

## 機能

- 店舗情報のCRUD操作（作成、読み取り、更新、削除）
- 詳細な検索・フィルタリング機能
- 画像アップロード（店内マップ）
- Google Mapsでの店舗表示
- レスポンシブデザイン

## 技術スタック

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- SQLite (better-sqlite3)
- Zod (バリデーション)
- React Hook Form
- Google Maps JavaScript API

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、Google Maps APIキーを設定します：

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

Google Maps APIキーの取得方法：
1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成
3. API & Services > Credentials でAPIキーを作成
4. API & Services > Library で「Maps JavaScript API」と「Geocoding API」を有効化

### 3. データベースの初期化

```bash
npm run seed
```

これによりSQLiteデータベースが作成され、サンプルデータが挿入されます。

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

## プロジェクト構成

```
sutaba_list/
├── app/
│   ├── api/
│   │   ├── stores/          # 店舗APIルート
│   │   └── upload/          # 画像アップロードAPI
│   ├── stores/              # 店舗ページ
│   │   ├── page.tsx         # 一覧ページ
│   │   ├── [id]/            # 詳細・編集ページ
│   │   └── new/             # 新規作成ページ
│   ├── layout.tsx
│   ├── page.tsx             # トップページ
│   └── globals.css
├── components/
│   ├── ui/                  # 基本UIコンポーネント
│   ├── stores/              # 店舗関連コンポーネント
│   └── maps/                # マップコンポーネント
├── lib/
│   ├── db/                  # データベース関連
│   ├── types/               # TypeScript型定義
│   └── utils/               # ユーティリティ関数
├── data/
│   └── stores.db            # SQLiteデータベース
└── public/
    └── images/stores/       # 画像保存場所
```

## 使用方法

### 店舗一覧

- `/stores` にアクセス
- 検索・フィルタリング機能を使用して店舗を検索
- 各店舗のカードをクリックして詳細を表示

### 新規店舗の登録

- 「新規店舗を登録」ボタンをクリック
- 必要情報を入力
- 「登録」ボタンをクリック

### 店舗情報の編集

- 店舗詳細ページで「編集」ボタンをクリック
- 情報を更新
- 「更新」ボタンをクリック

### 店舗の削除

- 店舗詳細ページで「削除」ボタンをクリック
- 確認ダイアログで「削除」を選択

## スクリプト

```bash
npm run dev      # 開発サーバーを起動
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバーを起動
npm run lint     # ESLintを実行
npm run seed     # サンプルデータを挿入
```

## データベーススキーマ

```sql
CREATE TABLE stores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_hours TEXT NOT NULL,
  access TEXT NOT NULL,
  floor TEXT,
  area_feel TEXT,
  toilet_congestion TEXT,
  map_image_url TEXT,
  has_power_outlet INTEGER DEFAULT 0,
  latitude REAL,
  longitude REAL,
  station_distance TEXT,
  cigarette_smell TEXT,
  has_nearby_water INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## ライセンス

ISC
