import React,{Component} from 'react'
import {Link} from 'react-router'
import AddTo from '../addTo/addTo.js'

class Banner extends Component{
  constructor(props){
    super(props)
    this.state={
      showAllButton:true
    }
  }
  render(){
    return (
      <div className='album'>
        <div className='media-search'>
          <p><span>banner列表</span></p>
          <p>
            <input type='text' placeholder='请输入歌曲名称、banner名称'/>
            <input type='button' value='搜索已选歌曲'/>
          </p>
        </div>
        <ul className='media-scope'>
          <li>
            <span>头图播放顺序</span>
            <select>
              <option value=''>全部</option>
            </select>
          </li>
        </ul>
        <table className='media-list'>
          <tbody>
            <tr>
              <td>编号</td>
              <td>图片</td>
              <td>链接</td>
              <td>描述</td>
              <td>点击量</td>
              <td>权重</td>
              <td>操作</td>
            </tr>
          </tbody>
        </table>
        <div className='batch-process'>
          <ul style={this.state.showAllButton? {display:'none'}: null}>
            <li>批量下架</li>
            <li>批量上架</li>
            <li>批量删除</li>
            <li onClick={this.chooseAll.bind(this)}>全选</li>
          </ul>
          <p><Link to='/addBanner'>新增banner</Link></p>
          <h1
            onClick={this.toggleButton.bind(this)}
            style={!this.state.showAllButton? {display:'none'}: null}
          >批量处理</h1>
        </div>
        <AddTo/>
      </div>
    )
  }
  chooseAll(){

  }
  toggleButton(){
    this.setState({showAllButton:false})
  }
}
export default Banner
