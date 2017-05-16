import React, {Component} from 'react'
import './aside.css'
import home from '../../images/home.png'
import media from '../../images/media.png'
import habit from '../../images/habit.png'
import voice from '../../images/voice.png'
import toy from '../../images/toy.png'
import putao from '../../images/putao.png'
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
          <img src={putao} alt=''/>
        </p>
        <ul className='tab'>
          <li><Link to='/home' activeStyle={activeCSS}><img src={home} alt=''/>首页</Link></li>
          <li><Link to='/media' activeStyle={activeCSS}><img src={media} alt=''/>多媒体库</Link></li>
          <li><Link to='/habit' activeStyle={activeCSS}><img src={habit} alt=''/>习惯养成</Link></li>
          <li><Link to='/voice' activeStyle={activeCSS}><img src={voice} alt=''/>语料系统</Link></li>
          <li><Link to='/toy' activeStyle={activeCSS}><img src={toy} alt=''/>玩偶设置</Link></li>
        </ul>
      </div>
    )
  }
}
export default Aside
