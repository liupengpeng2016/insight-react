export const formTime = time => {
  const m = parseInt(time/1000/60, 10);
  const s = parseInt(time/1000%60, 10);
  return m + '分' + s + '秒';
}
export const valid= (target, rules) => {
  const keys= Object.keys(rules)
  for(let i of keys){
    if(typeof rules[i]=== 'string'){
      switch(rules[i]){
        case 'require':
        if(!/\s+/.test(target)){
          return i
        }
        break;
        case 'number':
        if(!/^\d+$/.test(target)){
          return i
        }
        break
        default: break
      }
    }else{
      if(!rules[i].test(target)){
        return i
      }
    }
  }
  return ''
}
