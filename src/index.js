import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './redux/reductor.js'
import logger from 'redux-logger'
const store = createStore(reducer, applyMiddleware(thunk,logger))
import router from './router/router.js'
window.addEventListener("hashchange", function(){
  window.scrollTo(0,0)
})
function setSize(){
  const c_width= window.innerWidth
  if(c_width>1200){
    document.querySelector('html').style.fontSize= c_width+ 'px'
  }
}
setSize()
window.onresize= setSize
render(<Provider store={store}>{router}</Provider>,document.querySelector('#root'))
var a= 6;
if(a%2== 0){
  alert(a+ '是一个偶数')
}else{
  alert(a+ '是一个奇数')
}
