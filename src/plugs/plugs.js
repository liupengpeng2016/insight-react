export const formTime = time => {
  const m = parseInt(time/1000/60, 10);
  const s = time/1000%60;
  return m + '分' + s + '秒';
}
