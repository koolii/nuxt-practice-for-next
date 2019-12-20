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

[VueRouter] RouterLink は RouterView と一緒で VueRouter のコンポーネント
レンダリングは a タグのアンカーリンクだが、普通のアンカーリンクと違うのは通常の画面遷移はせずに VueRouter によるコンポーネントの切り替わりが発生するだけ

必ず RouterLink を使って画面遷移すること

[psql] migrate
root@d2f92141d898:/var/www# php artisan migrate
Migration table created successfully.
Migrating: 2014_10_12_000000_create_users_table
Migrated: 2014_10_12_000000_create_users_table
Migrating: 2014_10_12_100000_create_password_resets_table
Migrated: 2014_10_12_100000_create_password_resets_table

[psql] Postgresql にログインして、DB 選択

```sql
> docker-compose exec workspace psql -U default -h postgres
Password for user default:

        ^
default=# \c vuesplash;
default=# \q
```

[PHP] 作り途中だったから理解をするまでにかなり時間がかかったが、laravel_session にはログインしたユーザの情報が cookie として登録されている。これがあると、再度ユーザ登録しようとしてもエラーとなりリダイレクトするようになる、なのでログアウト時にはこの値を削除するような処理を加えなければならない(これ本当に数時間かかった)

[PHP/Vuejs] なぜかわからないが、ちゃんと実装していてもステータス 422 や 419 が帰ってくるときがある。419 は XSRF の設定がおかしいから Cookie を確認して、リロードしまくれば OK。422 は本当にわからない、curl ではレスポンスが返るが、画面からはエラーになったり、これもリロードしまくって治った.ソースコードは何も悪くなかった

[Ngix,PHP-fpm] nginx から fastcgi_pass で Laravel へリクエストをプロキシさせていたが、api 側へのリクエストをプロキシさせるまでにかなり時間を要した。直したのは、 `location / {}` の箇所を try_file でリクエストを飛ばすようにした

```nginx
  location / {
    # root /var/www/public;
    # index  index.html index.php;
    try_files $uri $uri/ /index.php$is_args$args;
  }
```

[PHP] `RedirectIfAuthenticated.php` のミドルウェアはログイン状態で非ログイン状態でのみアクセスできる機能にリクエストを送信した場合に `/home` へデフォルトでリダイレクトが返却される。
今回は SPA なので HTML を返したくないから `/api/user` に変える

[Vuejs] アプリ起動時になにか処理をしたいなら `new Vue()` の前に処理を記載する。非同期が必要なら async 関数を作成して呼び出せば良い(app.js)

[Vuejs]\(非)ログイン状態の時に特定のフロントの URL にアクセス制御したい場合はナビゲーションガードを行うと良い。(`router.jsのbeforeEnter`)

[Vuejs] あるストアモジュールから別のモジュールのミューテーションを commit する場合は第三引数に { root: true } を追加します。

```js
context.commit("error/setCode", response.status, { root: true });
```

[Vuejs] 全体のエラー(errorCode)を App.vue で管理・監視して、システムエラー画面へ遷移するようにした。
理解が難しい箇所なので、下記の画像を見ながら確認。

```
Login.vue
=> auth.js
=> (throw new Error())
=> error.js
=> App.vue(errorCode を監視)
=> SystemError.vue(エラー画面)
```

![img1](./doc/fig-system-error.jpg)

[Vuex] vuex の mapState を使うと更に書きやすくなる

コンポーネントの算出プロパティとストアのステートをマッピングする関数で、
自分の書きやすいように書けば良い(`Login.vue`)

```js
import { mapState } from "vuex";

export default {
  computed: {
    // apiStatus() {
    //   return this.$store.state.auth.apiStatus;
    // },
    // loginErrors() {
    //   return this.$store.state.auth.loginErrorMessages;
    // }
    ...mapState({
      apiStatus: state => state.auth.apiStatus,
      loginErrors: state => state.auth.loginErrorMessages
    })
}
```

[Vuejs] モーダルボックスの表示には `v-model` を渡して、 `v-show` 判定を行っている (Navbar.vue, PhotoForm.vue)

[Vuejs]ファイルプレビューは HTML5 の FileReaderAPI を用いる

[Vuejs]ファイルアップロードは PhotoForm.vue がとても参考になる。
が、ここでは、イメージファイルのアップロードなので CSV とかはまた改良が必要。
参考: https://qiita.com/WallyNegima/items/67a16915fbd77e2e0f03

[Vuejs] watch.\$route は該当するページへ遷移してきた時に処理を加えることが出来る
Paging するコンポーネントを想定していて、同じコンポーネントが何度も呼ばれることになる。Vue はコンポーネントを流用する仕様なので、create()ライフサイクル時に呼ぶと移行でハンドラがフックされないので要注意

ただハンドラがあるだけだと、コンポーネントをレンダリング時には呼び出されないので、初回のときにも呼び出されるように immediate: true を設定

```js
export default {
    watch: {
        // ページがココに切り替わった時に、fetchPhotos()が実行される
        // immediate:trueなのでコンポーネントが生成されたタイミングでも実行される
        // created()で呼ぶとVueのコンポーネントを使い回す性質から次ページからfetchPhotos()が呼ばれない
        $route: {
            // これだけだと初めて <PhotoList> をレンダリングする時に実行されない
            async handler() {
                await this.fetchPhotos();
            },
            // 初回レンダリング用に immedaite: true を設定する
            immediate: true
        }
    }
};
```

[Vuejs] クエリパラメータを使った処理は router.js でパラメータを取得し、それを return すると該当するコンポーネントの props で値を使用できる(router.js, PhotoList.vue) 今回は pagination で使用した

[VueRouter] 単純に VueRouter を使うと、ページが切り替わってもスクロールの位置が同じ高さになってしまう。これを回避するために、scrollBehavior を使う

```js
const router = new VueRouter({
    mode: "history",
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes
});
```

[Vuejs] 基本的な所だが、Vuejs で子要素の state を変更した場合は親からレンダリングをしてもらう必要があるから、this.\$emit()を使って促す。
v-for とか使ってるやつはわかりやすい。(Photo.vue, PhotoList.vue)

また、単独のコンポーネントを更新する場合は、this.\$set()を使って更新を仲介する(PhotoDetail.vue)
