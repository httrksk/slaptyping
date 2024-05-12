# SLAPタイピングタスク (SLAP Typing Task)

SLAPタイピングタスクは、2人のプレイヤーが1台のコンピュータと1つのキーボードを共有し、協力して特定の文字列を入力するタイピングゲームです。このタスクは、実験環境において、チームワーク、コミュニケーション、問題解決能力などの「チームワーク」を測定するために開発されたツールです。

このタスクの概要、理論的基礎、実装、使用方法から応用例についての詳細は、以下の論文をご覧ください。

> Hattori, Keisuke, SLAP Typing Task: A New Experimental Paradigm for Teamwork Research (May 11, 2024). Available at SSRN: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4824958
> 

## タスクの概要

- **目的**: チームワーク、コミュニケーション、問題解決能力を評価する協力タスク
- **方法**:
    - 2人1組でペアを組み、1つのキーボードを共有する
    - 一方のプレイヤーが「S」と「A」、もう一方が「L」と「P」のキーを担当し、交互にキー入力することで「SLAP」という文字列を入力する
    - 所定の制限時間（初期設定は60秒）以内に「SLAP」という文字列をできるだけ多く入力する
- **セッション**: 全3回の入力セッションが行われ、各セッション間には、次回のセッションでの高得点をとるために、ペアでコミュニケーションを取る作戦タイム（初期設定は90秒）が設けられている
- **評価項目**:
    
    各セッションにおける
    
    - 「SLAP」の正しい入力回数（”SLAPs typed”）
    - ミスタイプの数（”Mistypes”）
    - 得点（”Score”）
    
    得点（Score）は、SLAP入力回数（SLAPs typed）から、ミスタイプ（”Mistypes”）の個数に応じたペナルティを引いたもので定義され、研究者側が自由にこのペナルティの大きさを設定することができる（初期設定では、ミスタイプ5個につき1点の減点）
    
- **Google Spreadsheetへのスコアの自動送信：**
    
    インターネット回線と適切な設定により、タスクのデータは自動的に研究者自身のGoogle Spreadsheetに自動送信されます。
    
- **参加者のチートを検出する機能:**
    
    入力セッションにおいて、参加者がコピー&ペーストなどの機能を不正に利用した場合には、それが研究者側に通知される機能（参加者には知らされたことは伝わりません）があります。これにより、チートなどの不正行為を検出するような実験デザインの研究にも使用することができます。
    

## タスクの体験

以下のデモサイトにて、実際にタスクを体験することができます。

日本語版: https://httrksk.github.io/slaptyping/jp/

英語版: https://httrksk.github.io/slaptyping/en/

## タスクの意義

SLAPタイピングタスクは、以下の4つの重要な要素を象徴しています:

1. **Synchronization (同期)**: メンバー間での入力タイミングの同期
2. **Learning (学習)**: 協調のリズムやタイミングの学習と改善
3. **Adaptability (適応能力)**: 様々な状況への迅速な適応と対応
4. **Persistence (継続性)**: 諦めずタスクに取り組む粘り強さ

このタスクでは、単にキーボード入力能力だけでなく、ペアで動作を同期・調整させるといった非言語的コミュニケーションや、問題の認識、学習、そして問題に対する迅速な適応、作戦タイムでの効率的な問題解決のためのコミュニケーション、さらにはチームの粘り強さが不可欠です。「SLAP」という単語自体が、これらの要素の頭文字を取って構成されています。

## 開発者情報

- 服部 圭介 (Keisuke Hattori)
- 青山学院大学 経営学部 教授
- [hattori@busi.aoyama.ac.jp](mailto:hattori@busi.aoyama.ac.jp)
- https://httrksk.github.io/

## ライセンスと使用条件

このプログラムは、MITライセンスのもとで公開されています。以下の条件に従い、誰でも自由に本ソフトウェアを使用、複製、改変、結合、出版、配布、サブライセンスおよび/または販売することができます。また、本ソフトウェアを提供された人々に対しても、これらの権利を同様に与えることができます。

本ソフトウェアは「現状のまま」提供され、いかなる明示または暗黙の保証も行われません。商業的な利用や特定の目的への適合性の保証を含む、一切の保証が除外されます。詳細は、MITライセンスをご確認ください。

**このタスクを使って研究、執筆、記事を発表する場合には、必ず以下の文献を引用してください。**

> Hattori, Keisuke, SLAP Typing Task: A New Experimental Paradigm for Teamwork Research (May 11, 2024). Available at SSRN: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4824958
> 

## インストール方法

1. このリポジトリをクローンまたはダウンロードします。英語版を使用したい場合は /en/ フォルダを、日本語版を使用したい場合は /jp/ フォルダをダウンロードしてください。
2. `index.html`、`script.js`、`style.css` をウェブサーバー上の適切なディレクトリに配置します。
3. `script.js` を開いて、先頭部分にある設定を適宜変更します。
4. `index.html` をWebブラウザで開いてください。

## プログラムの設定方法

### パラメータの設定

`script.js` の先頭部分でタスクのパラメータを設定できます。

```jsx
// グローバル設定
let penaltyThreshold = 5; // ミスタイプのペナルティ閾値
let typingDuration = 60; // 入力セッションの秒数
let strategyDuration = 90; // 作戦タイムの秒数
let googleSpreadsheetUrl = "YOUR_WebAPP_URL"; // Google SpreadsheetのウェブアプリURL

//設定はここまで
```

- `penaltyThreshold`: ミスタイプの減点ペナルティの閾値を設定します。初期設定は 5 （つまり、5個のミスタイプにつき、SLAP入力回数から1が減点されたものが得点となります）。
- `typingDuration`: 各入力セッションの制限時間(秒)を設定します。初期設定は 60秒です。このタイムを調整することで、チームタスクが、どの程度継続性（persistence）を重視するものなのかを調整できます。
- `strategyDuration`: セッション間の作戦タイムの長さ(秒)を設定します。初期設定は 90秒です。このタイムを調整することで、チームタスクが、どの程度チーム内コミュニケーションを重視するものなのかを調整できます。
- `googleSpreadsheetUrl`: あなたのGoogle SpreadsheetのウェブアプリケーションURLを設定（後述）することで、参加者のパフォーマンスデータを自動で回収することができます。

### Google Spreadsheetの設定

SLAPタイピングタスクでは、参加者のパフォーマンスデータをGoogle Spreadsheetに自動的に保存することができます。この機能を利用するためには、以下の手順に従ってGoogle Apps Scriptを設定する必要があります：

1. Googleドライブ上に新しいスプレッドシートを作成し、第一行目に列（変数）名である `ID1`, `ID2`, `SLAP1`, `TC1`, `SCORE1`, `CHEATED1`, `SLAP2`, `TC2`, `SCORE2`, `CHEATED2`, `SLAP3`, `TC3`, `SCORE3`, `CHEATED3`, `TIMESTAMP` と設定する。
2. スプレッドシート内で「ツール」>「スクリプトエディタ」を選択し、Google Apps Scriptのエディタを開く。
3. エディタ内に、以下のコードを入力する（最初から入っているコードは消して上書きする形で）。
    
    ```jsx
    function doPost(e) {
      var sheet = SpreadsheetApp.getActiveSheet();
      var data = JSON.parse(e.postData.contents);
      var rowData = [
        data.id1,
        data.id2,
        data.slap1,
        data.tc1,
        data.score1,
        data.cheated1,
        data.slap2,
        data.tc2,
        data.score2,
        data.cheated2,
        data.slap3,
        data.tc3,
        data.score3,
        data.cheated3,
        new Date(),
      ];
      sheet.appendRow(rowData);
      return ContentService.createTextOutput(
        JSON.stringify({ result: "success" })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    ```
    
4. スクリプトを保存し、「デプロイ」>「新しいデプロイ」を選択する。
5. 「デプロイ」ダイアログで、「ウェブアプリ」を選択し、「次のユーザーとして実行」を自分（YOUR_NAME@gmail.com）、「アクセスできるユーザー」を「全員」に設定する。
6. 「デプロイ」ボタンをクリックし、表示されたウェブアプリケーションのURLをコピーする。
7. `script.js`ファイルのgoogleSpreadsheetUrl変数に、コピーしたウェブアプリケーションURLを貼り付ける。

以上の手順を完了すると、タスクの結果がGoogle Spreadsheetに自動的に保存されるようなり、研究者は、スプレッドシート上でデータの集計や分析を行うことができます。タスクの結果は3回の入力セッションが終了後に3回分のスコアデータ全てが送信されます。

送信されるデータは、`ID1`, `ID2`がそれぞれ参加者ID1および2であり、`SLAP1`, `TC1`, `SCORE1`, `CHEATED1` はそれぞれ、第1入力セッションにおけるSLAP入力数、総入力数（Total Characters）、スコア、およびコピー＆ペースト使用履歴（使用すれば1が入る）であり、`SLAP2`, `SLAP3`などはそれぞれ第2, 3セッションでのデータを意味する。`CHEATED`は、そのセッションにおいて、1度でもコピー&ペーストが用いられた場合には1を、用いられていない場合には0が格納されます。

## 謝辞

このプログラムの作成にあたり、明海大学の山田麻以氏からのアドバイスを得ました。また、青山学院大学の作者のゼミに所属する学生さんたちには、デバッグや最適な入力・作戦タイムやペナルティの設計のために、何度もタスクに参加していただきました。感謝いたします。
