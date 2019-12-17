const mix = require('laravel-mix');

// broserSync() => Hot reload
// js() => compile js files
// sass() => compile sass files
// version() => make valid versioning
mix.browserSync('vuesplash.test')
  .js('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css')
  .version();
