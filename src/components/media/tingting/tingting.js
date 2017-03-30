import React, {Component} from 'react'
import './tingting.css'
import {connect} from 'react-redux'
import {getSearchMusicList} from '../../../redux/actions.js'
const formTime = time => {
  const m = parseInt(time/1000/60, 10);
  const s = time/1000%60;
  return m + '分' + s + '秒';
}
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
    const {searchMusicList} = this.props
    return (
      <div className='tingting'>
        {
          /*
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
          */
        }
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
            <select
              onChange={this.handleType.bind(this)}
              value={this.state.type}
              >
              <option value='tingting'>葡萄听听</option>
              <option value='insight'>insight库</option>
            </select>
          </li>
          {
            /*
            <li>
              <span>来源</span>
              <select>
                <option value=''>全部</option>
              </select>
            </li>

            */
          }
          <li>
            <span>歌曲ID/歌名</span>
            <input type='text' placeholder='请输入歌曲ID／歌名'
              onChange={this.handleUserInput.bind(this)}
              value={this.state.userInput}
              />
            <span className='search-button'
              onClick={this.handleSearch.bind(this)}
              >搜索已选歌曲</span>
          </li>
        </ul>
        <table className='media-list'>
          <tbody>
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
            {(searchMusicList || []).map((val, i) => {
              return (
                <tr key={i}>
                  <td>{val.id}</td>
                  <td>{val.type}</td>
                  <td>{val.name}</td>
                  <td>{formTime(val.duration)}</td>
                  <td>{val.play_times}</td>
                  <td>{val.lyric}</td>
                  <td>{val.age}</td>
                  <td>{val.status === 1 ? '是'  : '否'}</td>
                  <td>{val.origin}</td>
                  <td>{val.created_at.slice(0,10)}</td>
                  <td>{this.state.showAllButton ? this.state.editorButtonAll(val) : this.state.editorButtonPart(val)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
  handleSearch(){
    const {type,category,userInput} = this.state
    const formNum = Number(userInput)
    const input =  typeof formNum === 'number' ? 'tingting_id' : 'name'
    this.props.dispatch(getSearchMusicList({type,category,[input]: userInput}))
  }
  handleCategory(e){
    this.setState({category: e.target.value})
  }
  handleType(e){
    this.setState({type: e.target.value})
  }
  handleUserInput(e){
    this.setState({userInput: e.target.value})
  }
}
function mapStateToProps (state) {
  return {
    searchMusicList: state.mediaData.searchMusicList
  }
}
export default connect(mapStateToProps)(Tingting)
