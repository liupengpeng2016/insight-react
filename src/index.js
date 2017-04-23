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
render(<Provider store={store}>{router}</Provider>,document.querySelector('#root'))
