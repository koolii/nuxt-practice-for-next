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

export const CODE = {
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

export const PHOTO = [{
  id: 1,
  url: 'https://pbs.twimg.com/media/D-rnILoU4AAzt2I.jpg',
  owner: {
    name: "koolii"
  },
  likes_count: 1,
  liked_by_user: false
}, {
  id: 2,
  url: 'https://img21.shop-pro.jp/PA01392/072/product/142396934.jpg?cmsp_timestamp=20190602000357',
  owner: {
    name: "koolii2"
  },
  likes_count: 2,
  liked_by_user: false
}, {
  id: 3,
  url: 'https://times.abema.tv/files/topics/7030217_ext_col_03_2.jpg',
  owner: {
    name: "koolii3"
  },
  likes_count: 3,
  liked_by_user: false
}, {
  id: 4,
  url: 'https://www.shonenjump.com/j/rensai/img/main_kimetsu.jpg',
  owner: {
    name: "koolii4"
  },
  likes_count: 4,
  liked_by_user: false
}, {
  id: 5,
  url: 'https://kimetsu.com/anime/assets/img/top/img_main_sp.jpg',
  owner: {
    name: "koolii5"
  },
  likes_count: 5,
  liked_by_user: false
}, {
  id: 6,
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4jzipW_XcLVXdhs_YXpqDTu-bYK3poUxbABvYPYJ7KTSTHK4Q&s',
  owner: {
    name: "koolii6"
  },
  likes_count: 6,
  liked_by_user: false
}, {
  id: 7,
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4q99V1_4IZ7Ct7XuVyhPrExhPL0J71nlhzoAm7IRDKwxKz3us&s',
  owner: {
    name: "koolii7"
  },
  likes_count: 7,
  liked_by_user: false
}, {
  id: 8,
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUaO7Nzx2D7RryuWAVC5Vdl3UhqK0CB_gUXlQ4n9eBIqFouon9qw&s',
  owner: {
    name: "koolii8"
  },
  likes_count: 8,
  liked_by_user: false
}, {
  id: 9,
  url: 'https://times.abema.tv/files/topics/7030217_ext_col_03_2.jpg',
  owner: {
    name: "koolii9"
  },
  likes_count: 9,
  liked_by_user: false
}, {
  id: 10,
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsoAcN3nIUnGeGOJfD0oKWIV67awilNfhYna4WXr52NNR9dnuW&s',
  owner: {
    name: "koolii10"
  },
  likes_count: 10,
  liked_by_user: false
}, {
  id: 11,
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv7jEwbub3nvGprWydjIbyt1iCTOoz250rZqjKd5XGfnPMfDko4Q&s',
  owner: {
    name: "koolii11"
  },
  likes_count: 11,
  liked_by_user: false
}, {
  id: 12,
  url: 'http://phoenix-wind.com/common/img/OGP_60/character/kimetsu_sabito.jpg',
  owner: {
    name: "koolii12",
  },
  likes_count: 12,
  liked_by_user: false
}, {
  id: 13,
  url: 'http://phoenix-wind.com/common/img/OGP_60/character/kimetsu_sabito.jpg',
  owner: {
    name: "koolii12",
  },
  likes_count: 13,
  liked_by_user: false
}];
