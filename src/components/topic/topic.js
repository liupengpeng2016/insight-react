import React,{Component} from 'react'
import {Link} from 'react-router'
import AddTo from '../addTo/addTo.js'

class Topic extends Component{
  constructor(props){
    super(props)
    this.state={
      showAllButton:true
    }
  }
  render(){
    return (
      <div className='topic'>
        <div className='media-search'>
          <p><span>已选歌曲列表</span></p>
          <p>
            <input type='text' placeholder='请输入歌曲名称、专题名称'/>
            <input type='button' value='搜索已选歌曲'/>
          </p>
        </div>
        <ul className='media-scope'>
          <li>
            <span>位置</span>
            <select>
              <option value=''>全部</option>
            </select>
          </li>
          <li>
            <span>专题播放排序</span>
            <select>
              <option value=''>全部</option>
            </select>
          </li>
        </ul>
        <table className='media-list'>
          <tbody>
            <tr>
              <td>编号</td>
              <td>专题名称</td>
              <td>位置</td>
              <td>权重</td>
              <td>上架</td>
              <td>上传时间</td>
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
          <p><Link to='/addTopic'>新增专题</Link></p>
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
export default Topic
