import React, {Component} from 'react'
import './aside.css'
import {Link} from 'react-router'
class Aside extends Component{
  render(){
    const activeCSS={
      display:"block",
      widith:'100%',
      height:'100%',
      background:'#37405a'
    }
    return (
      <div className='aside'>
        <p className='user-img'>
          <span>userName</span>
        </p>
        <ul className='tab'>
          <li><Link to='/home' activeStyle={activeCSS}>首页</Link></li>
          <li><Link to='/media' activeStyle={activeCSS}>多媒体库</Link></li>
          <li><Link to='/habit' activeStyle={activeCSS}>习惯养成</Link></li>
          <li><Link to='/product' activeStyle={activeCSS}>哄宝神器</Link></li>
          <li><Link to='/toy' activeStyle={activeCSS}>玩偶设置</Link></li>
        </ul>
      </div>
    )
  }
}
export default Aside
