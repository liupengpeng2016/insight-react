import React, {Component} from 'react'
import './media.css'
import {Link} from 'react-router'
import {connect} from 'react-redux'
class Media extends Component{
  constructor(props){
    super(props)
    this.editorOne=(
      <p>
        <span className='meida-editor'>编辑</span>
        <span className='media-del'>删除</span>
        <span className='meida-status'>上架</span>
        <span className='meida-add'>添加</span>
      </p>
    )
    this.editorAll=(
      <p>
        <span>编辑</span>
        <input className='meida-choose' type='checkbox'/>
      </p>
    )
  }
  render(){
    const activeCSS = {
      borderBottom: '4px solid #5cc1df'
    }
    return (
      <div className='content'>
        <h1>葡萄听听</h1>
        <h2>葡萄听听</h2>
        <ul className='sub-tab'>
          <li><Link to='/media/music' activeClassName='a-link-active' activeStyle={activeCSS}>我的歌曲</Link></li>
          <li><Link to='/media/album' activeClassName='a-link-active' activeStyle={activeCSS}>专辑列表</Link></li>
          <li><Link to='/media/topic' activeClassName='a-link-active' activeStyle={activeCSS}>专题列表</Link></li>
          <li><Link to='/media/banner' activeClassName='a-link-active' activeStyle={activeCSS}>banner列表</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
function mapStateToProps(state){
    return {

    }
}
export default connect(mapStateToProps)(Media)
