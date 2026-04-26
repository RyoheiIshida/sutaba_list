# スターバックス店舗情報アプリ 実装計画

## Context

スターバックスの店舗情報を管理するWebアプリケーションを構築します。公式情報（店舗名、住所、電話番号、営業時間、アクセス）に加えて、独自の付加情報（階数、広さ、トイレ混雑度、店内マップ、電源有無、駅からの距離、タバコ臭、近隣の水分補給スポット有無）も管理・閲覧できるようにします。

**要件**:
- 技術スタック: Next.js + TypeScript（将来のスマホアプリ開発も視野）
- データベース: SQLite
- アプリ種類: Webアプリ（ブラウザ）
- データ取得: サンプルデータからスタート

---

## 実装アプローチ

### 1. プロジェクト初期設定

**使用パッケージ**:
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "better-sqlite3": "^9.4.0",
    "zod": "^3.23.0",
    "react-hook-form": "^7.51.0",
    "lucide-react": "^0.378.0",
    "@googlemaps/js-api-loader": "^1.16.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/better-sqlite3": "^7.6.10",
    "typescript": "^5.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

**ディレクトリ構成**:
```
sutaba_list/
├── app/
│   ├── api/
│   │   └── stores/
│   │       ├── route.ts          # GET, POST
│   │       └── [id]/route.ts     # GET, PUT, DELETE
│   ├── stores/
│   │   ├── page.tsx              # 一覧表示
│   │   ├── [id]/page.tsx         # 詳細表示
│   │   └── new/page.tsx          # 新規作成フォーム
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                       # 再利用可能UIコンポーネント
│   ├── stores/                   # 店舗関連コンポーネント
│   └── layout/                   # レイアウトコンポーネント
├── lib/
│   ├── db/                       # データベース関連
│   ├── types/                    # TypeScript型定義
│   └── utils/                    # ユーティリティ関数
├── data/
│   └── stores.db                 # SQLiteデータベース
└── public/
    └── images/                   # 店内マップ画像など
```

---

### 2. データベース設計

**テーブル構成**:
```sql
CREATE TABLE stores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_hours TEXT NOT NULL,
  access TEXT NOT NULL,
  floor TEXT,                    -- 階数
  area_feel TEXT,                -- 広さ: 'large' | 'medium' | 'small'
  toilet_congestion TEXT,        -- トイレの混雑度: 'low' | 'medium' | 'high'
  map_image_url TEXT,            -- 店内マップ画像URL
  has_power_outlet INTEGER DEFAULT 0,  -- 電源有無: 0=なし, 1=あり
  latitude REAL,                 -- 緯度（マップ表示用）
  longitude REAL,                -- 経度（マップ表示用）
  station_distance TEXT,         -- 駅からの距離（感覚的表現）
  cigarette_smell TEXT,          -- タバコ臭: 'none' | 'light' | 'medium' | 'heavy'
  has_nearby_water INTEGER DEFAULT 0,  -- 近隣の水分補給スポット: 0=なし, 1=あり
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**サンプルデータ（5件）**:
- スターバックス コーヒー 大阪梅田店（2階、広い、混雑度中、電源あり、駅から近い、タバコ臭軽い、水分補給あり、緯度: 34.6989, 経度: 135.4954）
- スターバックス コーヒー 心斎橋店（1階、狭い、混雑度高、電源なし、駅から近い、タバコ臭なし、水分補給なし、緯度: 34.6690, 経度: 135.5006）
- スターバックス コーヒー 難波公园店（3階、広い、混雑度低、電源あり、駅から普通、タバコ臭中程度、水分補給あり、緯度: 34.6675, 経度: 135.5012）
- スターバックス コーヒー 天神店（1階、普通、混雑度中、電源あり、駅から近い、タバコ臭軽い、水分補給あり、緯度: 33.5905, 経度: 130.4017）
- スターバックス コーヒー 博多駅店（2階、広い、混雑度高、電源なし、駅から近い、タバコ臭強い、水分補給なし、緯度: 33.5869, 経度: 130.4204）

---

### 3. APIルート設計

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/api/stores` | 店舗一覧取得（検索・フィルタリング対応） |
| POST | `/api/stores` | 店舗新規作成 |
| GET | `/api/stores/[id]` | 店舗詳細取得 |
| PUT | `/api/stores/[id]` | 店舗情報更新 |
| DELETE | `/api/stores/[id]` | 店舗削除 |
| POST | `/api/upload` | 画像アップロード（店内マップ用） |

**検索パラメータ**:
- `search`: キーワード検索（店舗名・住所）
- `hasPowerOutlet`: 電源有無フィルタ
- `toiletCongestion`: トイレ混雑度フィルタ
- `areaFeel`: 広さフィルタ（large/medium/small）
- `cigaretteSmell`: タバコ臭フィルタ（none/light/medium/heavy）
- `hasNearbyWater`: 水分補給スポット有無フィルタ
- `stationDistance`: 駅からの距離フィルタ（near/medium/far）

**画像アップロード仕様**:
- 保存場所: `public/images/stores/`
- 許可形式: JPEG, PNG, WebP
- 最大サイズ: 5MB
- ファイル名: UUID + タイムスタンプで一意に生成（例: `a1b2c3d4-1714147200000.jpg`）
- データベース: `/images/stores/ファイル名` の形式でパスを保存

**マップ表示仕様**:
- Google Maps JavaScript APIを使用
- 全店舗のマーカーを表示
- マーカーをクリックすると店舗情報の吹き出しを表示
- 吹き出しに表示する情報: 店舗名、駅からの距離、タバコ臭、水分補給スポット有無
- 吹き出しから店舗詳細ページへ遷移可能
- 店舗一覧とマップを同時に表示（レスポンシブ対応）
- 店舗登録・編集時はマップをクリックして緯度・経度を設定
- デフォルトで日本全体を表示、フィルタ結果に合わせて表示範囲を調整

---

### 4. 実装手順

1. **プロジェクト初期化**
   - Next.jsプロジェクト作成: `npx create-next-app@latest sutaba_list --typescript --tailwind --app`
   - 必要パッケージのインストール
   - ディレクトリ構造の作成

2. **データベース設定**
   - SQLite接続管理の実装（[lib/db/sqlite.ts](lib/db/sqlite.ts)）
   - テーブル作成スクリプトの実装
   - サンプルデータ挿入スクリプトの作成

3. **型定義とバリデーション**
   - TypeScript型定義: [lib/types/store.ts](lib/types/store.ts)
   - Zodバリデーションスキーマ: [lib/utils/validation.ts](lib/utils/validation.ts)

4. **APIルート実装**
   - [app/api/stores/route.ts](app/api/stores/route.ts) - GET, POST
   - [app/api/stores/[id]/route.ts](app/api/stores/[id]/route.ts) - GET, PUT, DELETE

5. **UIコンポーネント実装**
   - 基本UIコンポーネント（Button, Input, Select, Card）
   - StoreCard, StoreList, StoreDetail, StoreFormコンポーネント

6. **ページ実装**
   - 店舗一覧ページ: [app/stores/page.tsx](app/stores/page.tsx)
   - 店舗詳細ページ: [app/stores/[id]/page.tsx](app/stores/[id]/page.tsx)
   - 店舗新規作成ページ: [app/stores/new/page.tsx](app/stores/new/page.tsx)

7. **画像アップロード機能**
   - 画像アップロードAPIの実装（[app/api/upload/route.ts](app/api/upload/route.ts)）
   - 画像のバリデーション（サイズ、形式）
   - ファイル名の重複回避処理
   - StoreFormコンポーネントへの画像アップロードUIの追加

**Google Maps API設定**:
- Google Cloud ConsoleでAPIキーを取得
- `.env.local`ファイルに `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` を設定
- Maps JavaScript API, Geocoding APIを有効化

**環境変数設定例** (`.env.local`):
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

8. **検索・フィルタリング機能**
   - StoreFiltersコンポーネントの実装
   - URLクエリパラメータでの状態管理

9. **マップ表示機能**
   - Google Mapsコンポーネントの実装（[components/maps/StoreMap.tsx](components/maps/StoreMap.tsx)）
   - マーカーの表示（各店舗の位置）
   - マーカークリックで店舗詳細を表示
   - 店舗一覧とマップの連動
   - StoreFormコンポーネントに地図選択機能を追加（クリックで緯度・経度を入力）

10. **レスポンシブ対応**
    - モバイルファーストのレイアウト調整
    - Tailwind CSSでのブレイクポイント設定

11. **エラーハンドリングとローディング**
    - APIエラーの表示
    - ローディング状態の表示
    - フォームバリデーションエラーの表示

12. **テストと修正**
    - 各機能の動作確認
    - レスポンシブデザインの確認
    - バグ修正と微調整

---

## Critical Files

以下のファイルから実装を開始します：

- **[lib/db/store-repository.ts](lib/db/store-repository.ts)** - データベース操作の中核
- **[lib/types/store.ts](lib/types/store.ts)** - アプリ全体で使用する型定義
- **[app/api/stores/route.ts](app/api/stores/route.ts)** - 店舗一覧・作成API
- **[app/api/upload/route.ts](app/api/upload/route.ts)** - 画像アップロードAPI
- **[components/maps/StoreMap.tsx](components/maps/StoreMap.tsx)** - Google Mapsコンポーネント
- **[components/stores/StoreForm.tsx](components/stores/StoreForm.tsx)** - 店舗情報の入力・編集フォーム
- **[lib/utils/validation.ts](lib/utils/validation.ts)** - Zodバリデーションスキーマ

---

## 検証方法

### 手動テスト

**CRUD操作**:
- [ ] 店舗一覧が正しく表示される
- [ ] 新規店舗が作成できる
- [ ] 店舗詳細が正しく表示される
- [ ] 店舗情報が更新できる
- [ ] 店舗が削除できる

**検索・フィルタリング**:
- [ ] キーワード検索が動作する
- [ ] 電源有無フィルタが動作する
- [ ] トイレ混雑度フィルタが動作する
- [ ] 広さフィルタが動作する
- [ ] タバコ臭フィルタが動作する
- [ ] 水分補給スポットフィルタが動作する
- [ ] 駅からの距離フィルタが動作する
- [ ] 複数フィルタの組み合わせが動作する

**バリデーション**:
- [ ] 必須項目未入力でエラーが表示される
- [ ] 電話番号の形式チェックが動作する
- [ ] URLの形式チェックが動作する

**画像アップロード**:
- [ ] 画像がアップロードできる
- [ ] アップロードした画像が表示される
- [ ] 不正なファイル形式でエラーが表示される
- [ ] ファイルサイズ制限が動作する

**マップ表示**:
- [ ] マップが正しく表示される
- [ ] 全店舗のマーカーが表示される
- [ ] マーカークリックで店舗詳細が表示される
- [ ] 店舗一覧とマップが連動する
- [ ] 店舗登録時にマップから位置を選択できる

**レスポンシブ**:
- [ ] モバイル（375px）で表示が崩れない
- [ ] タブレット（768px）でレイアウトが適切
- [ ] デスクトップ（1024px以上）で表示が最適

### サンプルデータでの確認

サンプルデータ5件を使って：
- [ ] 全店舗が一覧に表示される
- [ ] 各店舗の詳細が正しく表示される
- [ ] 独自情報（階数、広さ、トイレ混雑度、駅からの距離、タバコ臭、水分補給スポットなど）が正しく表示・編集できる
- [ ] 店内マップ画像が正しく表示される

---

## 将来のReact Native移行への配慮

- ビジネスロジックは`lib/`ディレクトリに集約（React Nativeでも再利用可能）
- 型定義は共通化
- UIコンポーネントはWebとReact Nativeで共通化可能な設計
- React Query/TanStack Queryの導入で容易に移行可能
