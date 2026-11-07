# 我がサイト
作ったもの置いたりハマってるものを置いたり、記事配置したり...
モバイルファーストで作成する。
基本的に各セクションを表示画面最大幅で。
サイト全体のイメージは冒険者の手記。

## 構造
モバイルもPCも基本的に上から下に流れていく。
### ロード画面
未定。
### Hero
一番最初に出てくる画面。
soraiの文字と雲のsvgを2つくらい配置する。

#### 天気連動について
初期段階は雲固定で。
サイト完成後、昼、夜、晴れ、雨、曇の差分や組み合わせロジックを用意してAPI連動にする。
### Sign
目次。
モバイルだと他セクションと同じで画面サイズ最大だが、PC等のある程度大きい画面ならそれ以降常に画面左に常駐するような形にする。
### Works
これまで作ったものを配置する。
#### 必須項目
- タイトル
- 制作期間
- 作品画像（公開リンク）
- 説明（どれくらい細かく書くか...）
- 使用スタック
- GitHubリポジトリ
#### デザイン案
- 冒険者の手記。スクラップブックとか達成した依頼記録的な。
- 折りたたまれた依頼目録を展開する形に
  - 作品の全項目を縦積みするとサイト全体が縦長に間延びしてしまうため、初期は各依頼の要点のみを一覧化し、展開時に詳細が現れるように作成。
- できれば
  - 他セクションの骨組みが整った段階でページめくる方式を試したい。
#### 設計方針
- デザインを色々試したくなると思うので変更に開いた設計を意識
  - データ層（作品情報の型定義・データ配列）とプレゼンテーション層（アコーディオン等のUIコンポーネント）の関心事を明確に分離する。
  - コンポーネントを独立させ、表示形式の変更やデザインの拡張が容易な構造にしておく。

### Articles
これまで投稿した記事を飾る。
現状使っているのがQiitaなのでAPIで情報を取ってきたい。
サイト自体が冒険者の手記をイメージしているのでノートにかいた本棚の落書きみたいな感じ。

<img width="500" height="auto" alt="Scan_20261107_205733" src="https://github.com/user-attachments/assets/32d9365f-3c65-4a9a-958e-b1ae139b4920" />

#### 本棚
svgコンポーネントで作成して、その中に本棚を配置する。
#### Qiitaから取ってくるデータ
### Profile
私について。
所属や活動歴、ハマってる曲やOSとかトピックとかgithubの草表示したり...
#### GitHubの草
サイトの基礎ができてから実装。
最初は`react-github-calendar`でいいかも。
頃合いをみて自作のSVGでアレンジしたものに置き換える。
## レスポンシブ
モバイルファーストで開発する。
### モバイル
- sign以降のセクションが表示されている場合、いつでもsignに戻れるボタンを置いておく
- 画面サイズがモバイルになったらSignセクションが左にフェードアウトする
### PC
- Hero、Signは全画面
- Sign→Works（直後のセクション）に行く場合のみSignが左にズレてその余白に左から次のセクションが入ってくる感じに
  - それ以降はまた下にスクロール
- 画面サイズがPCになった場合、signが左からフェードインしてくる
## バックエンド？
自分のラズパイをサーバーとして使用。
使うか分からないけどQiitaとかのOGPを取得するようだったりAPIから取ってきたものを記録する用に使う...？

メインが完成してからで。
## 使用技術
- React
- Type Script
- CSS Modules
- SVG
- Qiita API
### SVG
ベースとなる.svgを`src/assets/svg`に入れる。汎用性を高めるため、SVG内の色の指定は`stroke="var(--colour, base)`もしくは`currentColor`（親要素の色を参照）のように書き、`src/ui`内でコンポーネントとして統合する。
動的な処理を設けなくてはいけない場合、uiパーツと捉え、ベースの.svgを設けずに`/ui`のコンポーネントとしてreturnにインラインで書き込む。
画像サイズとしてのwidth, heightは使わず、viewBoxを使用する。
命名：foobarGraphicかfoobarIconの形とする。
## アセット
弊サイトで使用するSVGはすべて自作する。
## デザイン案
### モバイル
<img width="400" height="auto" alt="my-site-mobileprototype" src="https://github.com/user-attachments/assets/57d4a554-8e6b-4e28-a08c-958298a4f29c" />

### PC
<img width="400" height="auto" alt="my-site-pcprototype" src="https://github.com/user-attachments/assets/317430fd-66d5-4238-98c2-6b30f67398d1" />

### All
<img width="400" height="auto" alt="my-site-concept" src="https://github.com/user-attachments/assets/869e165a-af72-4bbf-93ed-5cf61828baee" />

## メモ帳風罫線の設計
メモ帳のような横線を背景やテキスト周りに取り入れる際の設計方針。

### 基本比率
- 1行の高さ : 上部余白 ＝ 1 : 3
  - 例: 1行が `24px` / `1.5rem` なら、上余白は `72px` / `4.5rem`
- 線の太さは `1px`（または `0.5px`）

### テキスト同期の仕組み
- 1枚絵の大きなSVGを敷くのではなく、1行分のSVGを用意する。
- CSS変数をハブにし、テキストの `line-height` と背景の `background-size`に同じ `rem` 値を指定して完全同期させる。
- 背景を固定（`fixed`）にせず、コンテンツ要素自身の背景としてスクロールと一緒に流れるようにする。

## コンポーネント
### StampGraphic
その名の通り、印鑑・スタンプ風のバッジを描画するSVGコンポーネント（`src/components/ui/StampGraphic.tsx`）。
`src/assets/svg/Stamp.svg` をベースに、動的なテキスト描画、朱文・白文の切り替え、輪郭のにじみおよびインクの色ムラのテクスチャを備える。

#### 仕様
- 印種（朱文・白文）
  - `type={0}`（デフォルト）: 朱文。外枠と文字にインクが乗り、背景は透過。
  - `type={1}`: 白文（陰刻）。朱文と同じ最大外周線 + 隙間を設けた内側ベタ塗りブロックから文字をくり抜くデザイン。
- スタイル継承
  - インク色: 親要素の文字色（`currentColor`）を継承。親要素の `color` や CSSクラスで変更可能。
  - フォント: 親要素の `font-family` を継承。
  - サイズ: デフォルトは `height: 1.25rem; width: auto; aspect-ratio: 52 / 19;`。親要素や `className` の `height` を指定すれば、拡大・縮小可能。
  - 文字長自動調整: 7文字を超える場合は `textLength` と `lengthAdjust` により自動で枠内に収まるよう水平圧縮される。
- テクスチャ
  - 輪郭のブレ・歪み（`bleed={false}` で無効化可能）。
  - 色ムラ。

#### Props定義
| Prop | 型 | デフォルト | 説明 |
| :--- | :--- | :--- | :--- |
| `text` | `string` | 必須 | スタンプ内に表示するテキスト |
| `type` | `0 \| 1` | `0` | スタンプの形式（`0`: 朱文 / `1`: 白文） |
| `bleed` | `boolean` | `true` | 輪郭のにじみ・歪みフィルターの有無 |
| `className` | `string` | `undefined` | サイズや配置調整用の追加CSSクラス名 |
| `aria-hidden`| `boolean \| 'true' \| 'false'` | `true` | アクセシビリティ用属性 |

#### 呼び出し方法
```tsx
import { StampGraphic } from '@/components/ui/StampGraphic';

// 1. 基本的な呼び出し（朱文・デフォルトサイズ）
<StampGraphic text="SAMPLE" />

// 2. 白文（陰刻）
<StampGraphic text="COMPLETED" type={1} />

// 3. にじみオフ
<StampGraphic text="DRAFT" bleed={false} />

// 4. CSSクラスでインク色やサイズを指定
// CSS側: .redStamp { color: #d32f2f; height: 2rem; }
<StampGraphic text="REJECTED" type={1} className={styles.redStamp} />

// 5. 親要素から色やフォントを継承させる
<div style={{ color: '#2e7d32', fontFamily: 'serif' }}>
  <StampGraphic text="ACCEPTED" type={0} />
</div>
```

## Lintに書きたいもの
### ファイルの命名規則
- src/components/ui直下のファイルは`*Graphic.tsx`か`*Icon.tsx`のみとする。
- src/components/section直下は`*Section.tsx`のみとする。
- src/assets/svg直下のファイルはパスカルケースのみとする。
### .tsx
- svgの直接importを禁止する。
- 装飾目的のSVGオブジェクトに対して、`aria-hidden="true"`を付与する。
- クリック可能なアイコンに対して`aria-label`を付与する。
### .module.css
- 存在しないクラス名を.tsxで参照した場合、エラーとする。
