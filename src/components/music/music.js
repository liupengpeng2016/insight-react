import React, {Component} from 'react'
import './music.css'
import AddTo from '../addTo/addTo.js'
import {connect} from 'react-redux'
import {getMusicList} from '../../redux/actions.js'
import {Link} from 'react-router'
import {formTime} from '../../plugs/plugs.js'
import {
  delMusicItem, toggleMusicState,
  getLinkAlbumList, linkToAlbum
} from '../../redux/actions.js'
import OperateButtons from '../operateButtons/operateButtons.js'
const obj={}
class Music extends Component{
  constructor(props){
    super(props)
    this.state={
      checkbox:{},
      showPanel:false,
      addId:'',
      category:'0',
      page:1
    }
  }
  render(){
    const {musicList} = this.props
    return (
      <div className='music-list'>
        <div className='media-search'>
          <p><span>已选歌曲列表</span></p>
          <p>
            <input type='text' placeholder='请输入歌曲id,或歌名'/>
            <input type='button' value='搜索已选歌曲'/>
          </p>
        </div>
        <ul className='media-scope'>
          <li>
            <span>类型</span>
            <select
              onChange={this.handleCategory.bind(this)}
              value={this.state.category}
              >
              <option value='0'>全部</option>
              <option value='1'>儿童</option>
              <option value='2'>音乐</option>
              <option value='3'>教育</option>
            </select>
          </li>
          {
            /*
            <li>
              <span>来源</span>
              <select>
                <option value='1'>葡萄</option>
                <option value='2'>蜻蜓</option>
                <option value='3'>喜马拉雅</option>
                <option value='4'>自营</option>
              </select>
            </li>

            */
          }
        </ul>
        <table className='media-list'>
          <tbody>
            <tr>
              <td>编号</td>
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
                <td>{val.name}</td>
                <td>{formTime(val.duration)}</td>
                <td>{val.play_times}</td>
                <td>{val.lyric}</td>
                <td>{val.age}</td>
                <td>{parseInt(val.status) === 1 ? '是'  : '否'}</td>
                <td>{val.origin}</td>
                <td>{val.created_at.slice(0,10)}</td>
                <td><OperateButtons
                  mode='1'
                  editorTo={{pathname:'/media/editorMusic',state:{id: val.id}}}
                  handleDel={this.handleDel.bind(this,[val.id])}
                  handleStatus={this.handleStatus.bind(this,val.status,[val.id])}
                  handleAdd={this.handleAdd.bind(this,val.id)}
                  status={val.status}
                  />
                </td>
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
          <p><Link to='/addMusic'>新增歌曲</Link></p>
          <h1
            onClick={this.toggleButton.bind(this)}
            style={!this.state.showAllButton? {display:'none'}: null}
          >批量处理</h1>
        </div>
        <AddTo
          target='专辑'
          isShow={this.state.showPanel}
          hidePanle={this.hidePanle.bind(this)}
          addId={this.state.addId}
          options={this.props.linkAlbumList}
          addTo={this.dispatchLinkToAlbum.bind(this)}
          />
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
    const obj=this.state.checkbox
    Object.assign(obj, {[id]: e.target.checked})
    this.setState({checkbox:obj})
  }
  chooseAll(){
    const obj=Object.assign({}, this.state.checkbox)
    const keys = Object.keys(obj)
    for(let i of keys){
      obj[i] = true
    }
    this.setState({checkbox: obj})
  }
  hidePanle(){
    this.setState({showPanel:false})
  }

  //编辑按钮操作
  handleAdd(id){
    this.props.dispatch(getLinkAlbumList({id}))
    this.setState({showPanel:true, addId: id})
  }
  handleDel(ids){
    this.props.dispatch(delMusicItem({ids}))
  }
  handleStatus(status, ids){
    status = status === 1 ? 0 : 1
    return this.props.dispatch(toggleMusicState({ids,status}))
  }

  dispatchLinkToAlbum(id, album_id){
    this.props.dispatch(linkToAlbum({id, album_id}))
  }
  handleCategory(e){
    this.setState({category: e.target.value})
  }
}
function mapStateToProps(state){
  return {
    musicList: state.mediaData.musicList.list,
    linkAlbumList: state.mediaData.linkAlbumList
  }
}
export default connect(mapStateToProps)(Music)
