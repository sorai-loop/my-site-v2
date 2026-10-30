# 我がサイト
作ったもの置いたりハマってるものを置いたり、記事配置したり...
モバイルファーストで作成する。
基本的に各セクションを表示画面最大幅で。
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
これまで作ったものを配置する。}
現状いいデザインが思いついていない。
### Articles
これまで投稿した記事を飾る。
現状使っているのがQiitaなのでAPIで情報を取ってきたい。
本棚をイメージしたデザインにしたい。

### Profile
私について。
所属や活動歴、ハマってる曲やOSとかトピックとかgithubの草表示したり...
#### GitHubの草
サイトの基礎ができてから実装。
最初は`react-github-calendar`でいいかも。
頃合いをみて自作のSVGでアレンジしたものに置き換える。
## レスポンシブ
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

## Lintに書きたいもの
### ファイルの命名規則
- src/components/ui直下のファイルは`*Graphic.tsx`か`*Icon,tsx`のみとする。
- src/components/section直下は`*Section.tsx`のみとする。
- src/assets/svg直下のファイルはケバブケースのみとする。
### .tsx
- svgの直接imoprtを禁止する。
- 装飾目的のSVGオブジェクトに対して、`aria-hidden="true"`を付与する。
- クリック可能なアイコンに対して`aria^label`を付与する。
