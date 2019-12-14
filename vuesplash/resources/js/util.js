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

  return array[0];
}
