export const formTime = time => {
  const m = parseInt(time/1000/60, 10);
  const s = parseInt(time/1000%60, 10);
  return m + '分' + s + '秒';
}
export const valid= (target, rules, notice= []) => {
  if(typeof(rules[0])=== 'string'){
    for(let i=0;i<rules.length; i++){
      if(rules[i] === 'require'&& !/\S+/.test(target)){
        return notice[i]||'内容不能为空！'
      }
      if(rules[i]=== 'number'&& !/^\d+$/.test(target)){
        return notice[i]||'只能为数字!'
      }
      if(rules[i]=== 'url'&& !/(^http:\/\/\S+)|(^https:\/\/\S+)/.test(target)){
        return notice[i]||'请输入正确网址！'
      }
      if(rules[i].match(/^maxLength/)){
        let length= Number(rules[i].split(':')[1])
        let reg= new RegExp('^.{0,'+length+'}$','u')
        console.log(length)
        if(!reg.test(target)){
          return notice[i]||'字符个数不能超过'+ length+ '个！'
        }
      }
    }
    return ''
  }else{
    for(let i= 0;i<rules.length; i++){
      if(!rules[i].test(target)){
        return notice[i]||''
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
      return '文件格式不符合要求！'
      default: return ''
    }
  }
}
