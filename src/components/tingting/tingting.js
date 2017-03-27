import React, {Component} from 'react'
import './tingting.css'
import {connect} from 'react-redux'
import {getSearchMusicList} from '../../redux/actions.js'
class Tingting extends Component{
  constructor(props){
    super(props)
    this.state={
      type: 'tingting',
      category: '1',
      userInput:''
    }
  }
  render(){
    return (
      <div className='tingting'>
        <div className='media-search tingting-search'>
          <p><span>已选歌曲列表</span></p>
          <p>
            <select
              onChange={this.handleType.bind(this)}
              value={this.state.type}
              >
              <option value='tingting'>葡萄听听</option>
              <option value='insight'>insight库</option>
            </select>
            <input type='text' placeholder='请输入歌曲名称／歌曲ID'
              onChange={this.handleInput.bind(this)}
              value={this.state.userInput}
              />
            <input type='button' value='搜索已选歌曲'
              onClick={this.handleSearch.bind(this)}
              />
          </p>
        </div>
        <ul className='tingting-scope'>
          <li>
            <span>分类</span>
            <select
              onChange={this.handleCategory.bind(this)}
              value={this.state.category}
              >
              <option value='1'>故事</option>
              <option value='2'>儿歌</option>
              <option value='3'>音乐</option>
            </select>
          </li>
          <li>
            <span>类型</span>
            <select>
              <option value=''>全部</option>
            </select>
          </li>
          <li>
            <span>来源</span>
            <select>
              <option value=''>全部</option>
            </select>
          </li>
          <li>
            <span>歌曲ID</span>
            <input type='text' placeholder='请输入歌曲ID'/>
          </li>
        </ul>
        <table className='media-list'>
          <tr>
            <td>编号</td>
            <td>类型</td>
            <td>歌曲名称</td>
            <td>歌曲时长</td>
            <td>播放次数</td>
            <td>歌词</td>
            <td>适合年龄</td>
            <td>上架</td>
            <td>来源</td>
            <td>上传时间</td>
            <td>操作</td>
          </tr>
        </table>
      </div>
    )
  }
  handleSearch(){
    const {type,category,tingting_id,name} = this.state
    this.props.getSearchMusicList({type,category,tingting_id,name})
  }
  handleCategory(e){
    this.setState({category: e.target.value})
  }
  handleType(e){
    this.setState({type: e.target.value})
  }
  handleInput(e){
    this.setState({type: e.target.value})
  }
}
function mapStateToProps (state) {
  return {
    searchMusicList: state.mediaData.searchMusicList
  }
}
export default connect()(Tingting)
