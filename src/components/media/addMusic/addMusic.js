import React, {Component} from 'react'
import './addMusic.css'
import {Link} from 'react-router'
class AddMusic extends Component{
  render(){
    const activeCSS = {
      borderBottom: '4px solid #5cc1df'
    }
    return (
      <div className='root-media-list'>
        <h1>葡萄听听>歌曲列表</h1>
        <h2>选择歌曲来源</h2>
        <ul className='sub-tabs'>
          <li><Link to='/media/addMusic/tingting' activeClassName='a-link-active' activeStyle={activeCSS}>葡萄听听</Link></li>
          <li><Link to='/media/addMusic/other' activeClassName='a-link-active' activeStyle={activeCSS}>其他平台</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
export default AddMusic
