# Laravel + Vuejs

Laravel は標準でフロントエンドのビルド環境があり、これは Laravel Mix という。(webpack でビルドされている)

=> `webpack.mix.js`

Docker コンテナ上で BrowserSync を使いたいなら

=> 3000 番ポートの疎通が正常に出来るように Docker を設定する

[PHP]RouteServiceProvider はアプリケーションの起動時にルート定義を読み込むためのクラス

[PHP]ミドルウェアグループの定義は app/Http/Kernel.php

[PHP]api ミドルウェアグループでは本来、外部のアプリケーションから呼び出されるようなステートレスな Web API（Twitter API や Google Map API などをイメージしてください）が想定されている(app/Http/Kernel.php の\$middlewareGroups 変数)

[PHP] `php artisan make:test RegisterApiTest` で RegisterApiTest のテストクラスを作成することが出来る

[PHP] `./vendor/bin/phpunit --testdox` で単体テストを実行することができる

[PHP] Illuminate\Foundation\Http\Request と Illuminate\Http\Request は大違いだから本当に間違えないように注意。
じゃないと API のメソッドに渡ってくる値に違いが出て、response_status_code がおかしくなる。だいたい 500 になる。

[PHP] 単体テストはメソッド名の先頭に `test` を必ずつけること
