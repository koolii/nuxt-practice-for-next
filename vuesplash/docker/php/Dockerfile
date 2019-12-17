FROM php:7.3-fpm
COPY php.ini /usr/local/etc/php/

RUN apt-get update \
  # ↓ libzip-dev を追加
  # && apt-get install -y zlib1g-dev libzip-dev mysql-client \
  && apt-get install -y zlib1g-dev libzip-dev default-mysql-client \
  && docker-php-ext-install zip pdo_mysql

# Composer install
# https://getcomposer.org/download/ でバージョンを指定できるようにならないと次回のイメージ作成に失敗してしまう
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'baf1608c33254d00611ac1705c1d9958c817a1a33bce370c0595974b342601bd80b92a3f46067da89e3b06bff421f182') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

ENV COMPOSER_ALLOW_SUPERUSER 1

ENV COMPOSER_HOME /composer

ENV PATH $PATH:/composer/vendor/bin

WORKDIR /var/www

RUN composer global require "laravel/installer"