export const formTime = time => {
  const m = parseInt(time/1000/60, 10);
  const s = parseInt(time/1000%60, 10);
  return m + '分' + s + '秒';
}
export const valid= (target, rules) => {
  if(rules instanceof Array){
    for(let i of rules){
      if(i === 'require'&& !/\S+/.test(target)){
        return '内容不能为空！'
      }
      if(i=== 'number'&& !/^\d+$/.test(target)){
        return '只能为数字!'
      }
    }
    return ''
  }else{
    const keys= Object.keys(rules)
    for(let i of keys){
      if(!rules[i].test(target)){
        return i
      }
    }
    return ''
  }
}
export const validFile= (target, rules)=> {
  if(target=== 'ignore'){
    return ''
  }
  if(!target){
    return '请选择文件！'
  }
  const keys= Object.keys(rules)
  for(let i of keys){
    switch(i){
      case 'size':
      if(target[i]>=rules[i]){
        return '文件大小超出范围！'
      }
      break;
      case 'name':
      for(let k of rules[i]){
        if(k.test(target.name)){
          return ''
        }
      }
      return '图片格式不符合要求！'
      default: return ''
    }
  }
}
