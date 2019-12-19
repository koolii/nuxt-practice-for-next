// name=12345;token=67890;key=abcde
export function getCookieValue(target) {
  if (typeof target === 'undefined') {
    return '';
  }

  // こういう配列の中から合致するものを一件だけ返すみたいなやり方ってどうやるんだっけ
  const array = document.cookie.split(';').filter(cookie => {
    const [key, value] = cookie.split('=');
    if (key === target) {
      return value;
    }
  });

  if (array.length !== 1) {
    return '';
  }

  return array[0].split('=')[1];
}

export const PHOTO = [{
  id: 1,
  url: 'https://pbs.twimg.com/media/D-rnILoU4AAzt2I.jpg',
}, {
  id: 2,
  url: 'https://img21.shop-pro.jp/PA01392/072/product/142396934.jpg?cmsp_timestamp=20190602000357',
}, {
  id: 3,
  url: 'https://times.abema.tv/files/topics/7030217_ext_col_03_2.jpg'
}];


export const CODE = {
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};
