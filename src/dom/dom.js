export const $ = function(select, type) {
  if (typeof select !== 'string') return console.error('select 是个字符串');
  if (!type) {
    return document.querySelector(select);
  } else {
    return document.querySelectorAll(select);
  }
};

export const offset = function(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return {
    left: left,
    top: top
  };
};
