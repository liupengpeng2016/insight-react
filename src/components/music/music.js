import React, {Component} from 'react'
import './music.css'
import AddTo from '../addTo/addTo.js'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {formTime} from '../../plugs/plugs.js'
import PageCtr from '../pageCtr/pageCtr.js'
import {
  delMusicItem, toggleMusicStatus,
  getLinkAlbumList, linkToAlbum,getMusicList
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
      showAllButton:false,
      buttonMode:'1',
      userInput:''
    }
    this.checkbox={}
  }
  render(){
    const {musicList} = this.props
    return (
      <div className='music-list'>
        <div className='media-search'>
          <p><span>已选歌曲列表</span></p>
          <p>
            <input type='text' placeholder='请输入专题名或歌曲名'
              onChange={this.handleUserInput.bind(this)}
              value={this.state.userInput}
              />
            <input type='button' value='搜索已选歌曲'
              onClick={this.searchMusic.bind(this)}
              />
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
                <td>{parseInt(val.status, 10) === 1 ? '是'  : '否'}</td>
                <td>{val.origin}</td>
                <td>{val.created_at.slice(0,10)}</td>
                <td><OperateButtons
                  mode={this.state.buttonMode}
                  editorTo={{pathname:'/media/editorMusic',state:{id: val.id}}}
                  handleDel={this.handleDel.bind(this,[val.id])}
                  handleStatus={this.handleStatus.bind(this,val.status,[val.id])}
                  handleAdd={this.handleAdd.bind(this,val.id)}
                  status={val.status}
                  checked={this.state.checkbox[val.id]}
                  toggleChecked={this.toggleChecked.bind(this,val.id)}
                  />
                </td>
              </tr>
              )
            )}
          </tbody>
        </table>
        <div className='batch-process'>
          <ul style={!this.state.showAllButton? {display:'none'}: null}>
            <li onClick={this.offAll.bind(this)}>批量下架</li>
            <li onClick={this.onAll.bind(this)}>批量上架</li>
            <li onClick={this.delAll.bind(this)}>批量删除</li>
            <li onClick={this.chooseAll.bind(this)}>全选</li>
          </ul>
          <p><Link to='/addMusic'>新增歌曲</Link></p>
          <h1
            onClick={this.toggleButton.bind(this)}
            style={this.state.showAllButton? {display:'none'}: null}
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
          <PageCtr total='15' buttons='10' changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
  changePage(page){
    this.props.dispatch(getMusicList({page,category:this.state.category}))
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getMusicList())
  }
  componentDidMount(){
    this.setState({checkbox:obj})
  }
  toggleButton(){
    this.setState({showAllButton: true, buttonMode: 2})
  }
  //用户搜索
  searchMusic(){
    this.props.dispatch(getMusicList({keywords:this.state.userInput}))
  }
  //批量处理按钮
  filterIds(obj){
    const keys=Object.keys(obj)
    const ids=[]
    for(let i of keys){
      obj[i]? ids.push(i) : undefined
    }
    return ids
  }
  delAll(){
    this.props.dispatch(delMusicItem({ids: this.filterIds(this.checkbox)}))
  }
  onAll(){
    this.props.dispatch(toggleMusicStatus({ids: this.filterIds(this.checkbox), status: 1}))
  }
  offAll(){
    this.props.dispatch(toggleMusicStatus({ids: this.filterIds(this.checkbox), status: 0}))
  }
  chooseAll(){
    const checkbox=this.checkbox
    const keys=Object.keys(checkbox)
    let checked = undefined
    for(let i of keys){
      checked === undefined ? (checked = !checkbox[i]) : ''
      checkbox[i]= checked
    }
    this.setState({checkbox})
  }
  hidePanle(){
    this.setState({showPanel:false})
  }
  //处理用户输入
  handleUserInput(e){
    this.setState({userInput: e.target.value})
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
    return this.props.dispatch(toggleMusicStatus({ids,status}))
  }
  toggleChecked(id, checked){
    const checkbox=Object.assign(this.checkbox,{[id]: checked})
    this.setState({checkbox})
  }

  dispatchLinkToAlbum(id, album_id){
    this.props.dispatch(linkToAlbum({id, album_id}))
  }
  handleCategory(e){
    this.setState({category: e.target.value})
    this.props.dispatch(getMusicList({category: e.target.value}))
  }
}
function mapStateToProps(state){
  return {
    musicList: state.mediaData.musicList.list,
    linkAlbumList: state.mediaData.linkAlbumList
  }
}
export default connect(mapStateToProps)(Music)
