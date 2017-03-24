import React, {Component} from 'react'
import './music.css'
import {connect} from 'react-redux'
import {getMusicList} from '../../redux/actions.js'
const formTime = time => {
  const m = parseInt(time/1000/60, 10);
  const s = time/1000%60;
  return m + '分' + s + '秒';
}
const obj={}
class Music extends Component{
  constructor(props){
    super(props)
    const editorButtonAll= val => (
      <ul className='editor-button-all'>
        <li>编辑</li>
        <li>删除</li>
        <li>上架</li>
        <li>添加</li>
      </ul>
    )
    const editorButtonPart = val => {
      obj = Object.assign({},this.state.checkbox, {[val.id]: false})
      return (
              <p className='editor-button-part'>
                <span>编辑</span>
                <input type='checkbox'
                  onChange={this.checkbox.bind(this,val.id)}
                  checked={this.state.checkbox}
                  />
              </p>
      )
    }
    const showAllButton = true;
    const checkbox = {}
    this.state={
      editorButtonAll,
      editorButtonPart,
      showAllButton,
      checkbox
    }
  }
  render(){
    const {musicList} = this.props
    return (
      <div className='music-list'>
        <p><span>已选歌曲列表</span></p>
        <p><input type='text' placeholder='请输入歌曲id,或歌名'/><input type='button' value='搜索已选歌曲'/></p>
        <ul className='choose-scope'>
          <li>
            <span>类型</span>
            <select>
              <option value='1'>儿童</option>
              <option value='2'>音乐</option>
              <option value='3'>教育</option>
            </select>
          </li>
          <li>
            <span>来源</span>
            <select>
              <option value='1'>葡萄</option>
              <option value='2'>蜻蜓</option>
              <option value='3'>喜马拉雅</option>
              <option value='4'>自营</option>
            </select>
          </li>
        </ul>
        <table className='media-list'>
          <tbody>
            <tr>
              <td>编号</td>
              <td>故事</td>
              <td>歌曲名称</td>
              <td>歌曲时长</td>
              <td>播放次数</td>
              <td>歌词</td>
              <td>适合年龄</td>
              <td>是否上架</td>
              <td>来源</td>
              <td>上传时间</td>
              <td>操作</td>
            </tr>
            {(musicList||[]).map((val, i) => (
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
            )}
          </tbody>
        </table>
        <div className='batch-process'>
          <ul style={this.state.showAllButton? {display:'none'}: null}>
            <li>批量下架</li>
            <li>批量上架</li>
            <li>批量删除</li>
            <li onClick={this.chooseAll.bind(this)}>全选</li>
          </ul>
          <p>新增歌曲</p>
          <h1
            onClick={this.toggleButton.bind(this)}
            style={!this.state.showAllButton? {display:'none'}: null}
          >批量处理</h1>
        </div>
      </div>
    )
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getMusicList())
  }
  componentDidMount(){
    this.setState({checkbox:obj})
  }
  toggleButton(){
    this.setState({showAllButton: false})
  }
  checkbox(id,e){
    var obj=this.state.checkbox
    Object.assign(obj, {[id]: e.target.checked})
    this.setState({checkbox:obj})
    console.log(this.state.checkbox)
  }
  chooseAll(){
    var obj=Object.assign({}, this.state.checkbox)
    const keys = Object.keys(obj)
    for(let i of keys){
      obj[i] = true
    }
    this.setState({checkbox: obj})
    console.log(this.state.checkbox)

  }
}
function mapStateToProps(state){
  return {
    musicList: state.mediaData.musicList.list
  }
}
export default connect(mapStateToProps)(Music)
