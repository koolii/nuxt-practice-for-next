import {
  getCookieValue
} from './util'

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

// Ajsxリクエストであることを示すヘッダーを付与する
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// TODO 一応参考の通りに下記の処理を追加しているが、
// このファイルの周りを見ると自動的にCSRFトークンが添付されているようないないような
// この辺りは調べたほうが良さそう。バージョンアップで対応不要になった可能性もある
// クッキーからトークンを取り出してヘッダーに添付
// これによりLaravelはフォームではなくヘッダを見てCSRFチェックを行う
window.axios.interceptors.request.use(config => {
  config.headers['X-XSRF-TOKEN'] = getCookieValue('XSRF-TOKEN');
  return config;
});

// * このresponseインターセプターはレスポンスを受けた後の処理を上書きする
// 第一引数: 成功時の処理
// 第二引数: 失敗時の処理
// 第二引数を以下のように変えたことで各api呼び出し時にcatchステートメントで
// 同じことを書かなくなって良い
window.axios.interceptors.response.use(
  response => response,
  error => error.response || error
)


/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

// ここはエラーが出るので今はコメントアウトにて対応
// let token = document.head.querySelector('meta[name="csrf-token"]');

// if (token) {
//   window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
// } else {
//   console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
// }

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
