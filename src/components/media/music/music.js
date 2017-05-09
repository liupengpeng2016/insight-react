import React, {Component} from 'react'
import './music.css'
import AddTo from '../addTo/addTo.js'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {formTime} from '../../../plugs/plugs.js'
import PageCtr from '../pageCtr/pageCtr.js'
import {
  delMusicItem, toggleMusicStatus,
  getLinkAlbumList, linkToAlbum,getMusicList
} from '../../../redux/actions.js'
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
      userInput:'',
      page:1,
    }
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
                <td>{this.formOrigin(val.origin)}</td>
                <td>{val.created_at.slice(0,10)}</td>
                <td>
                {
                  this.state.buttonMode?(
                    <ul className='operate-buttons'>
                      <li ><Link to={{pathname:'/media/editorMusic',state: val}} style={{color:'#76cbe5'}}>编辑</Link></li>
                      <li onClick={this.handleDel.bind(this,[val.id])} style={{color:'#fe6434'}}>删除</li>
                      <li onClick={this.handleStatus.bind(this,val.status,[val.id])} style={{color:'#50ca71'}}>
                        {parseInt(val.status, 10)===1?<span style={{color:'#aaa'}}>下架</span>:<span>上架</span>}
                      </li>
                      <li onClick={this.handleAdd.bind(this, val.id)} style={{color:'#76cbe5'}}>添加</li>
                    </ul>
                  ):(
                    <ul className='operate-buttons'>
                      <li ><Link to={{pathname:'/media/editorMusic',state:val}} style={{color:'#76cbe5'}}>编辑</Link></li>
                      <li >
                        <input type='checkbox'
                          onChange={this.handleChecked.bind(this,val.id)}
                          checked={this.state.checkbox[val.id]||false}
                          />
                      </li>
                    </ul>
                  )

                }
                </td>
              </tr>
              )
            )}
          </tbody>
        </table>
        <div className='batch-process'>
          <ul style={this.state.buttonMode? {display:'none'}: null}>
            <li onClick={this.offAll.bind(this)}>批量下架</li>
            <li onClick={this.onAll.bind(this)}>批量上架</li>
            <li onClick={this.delAll.bind(this)}>批量删除</li>
            <li onClick={this.chooseAll.bind(this)}>全选</li>
            <li onClick={()=> this.setState({buttonMode:1})}>退出</li>
          </ul>
          <p><Link to='/media/addMusic'>新增歌曲</Link></p>
          <h1
            onClick={this.toggleButton.bind(this)}
            style={!this.state.buttonMode? {display:'none'}: null}
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
        <PageCtr total={this.props.total} buttons='10' changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
  formOrigin(origin){
    switch(origin){
      case 1 :
      return '葡萄'
      case 2 :
      return '蜻蜓'
      case 3 :
      return '喜马拉雅'
      case 4 :
      return '自营'
      default: return '其它'
    }
  }
  changePage(page){
    this.props.dispatch(getMusicList({page,category:this.state.category}))
    this.setState({page})
  }
  componentDidMount(){
    this.getMusicList()
  }
  componentWillReceiveProps(nextProps){
    const {musicList} = nextProps
    if(musicList){
      const checkbox= {}
      for(let i of musicList){
        Object.assign(checkbox, {[i.id]: false})
      }
      this.setState({checkbox})
    }
  }
  toggleButton(){
    this.setState({buttonMode: 0})
  }
  //用户搜索
  searchMusic(){
    this.props.dispatch(getMusicList({keywords:this.state.userInput}))
  }
  //获取列表
  getMusicList(){
    const {page, category} = this.state
    this.props.dispatch(getMusicList({page, category}))
  }
  //批量处理按钮
  filterIds(obj){
    const keys=Object.keys(obj)
    const ids=[]
    for(let i of keys){
      if(obj[i]){
        ids.push(i)
      }
    }
    return ids
  }
  delAll(){
    this.props.dispatch(delMusicItem({ids: this.filterIds(this.state.checkbox)},this.getMusicList.bind(this)))
  }
  onAll(){
    this.props.dispatch(toggleMusicStatus({ids: this.filterIds(this.state.checkbox), status: 1},this.getMusicList.bind(this)))
  }
  offAll(){
    this.props.dispatch(toggleMusicStatus({ids: this.filterIds(this.state.checkbox), status: 0},this.getMusicList.bind(this)))
  }
  chooseAll(){
    const checkbox= Object.assign({},this.state.checkbox)
    const keys= Object.keys(checkbox)
    let checked = !checkbox[keys[0]]
    for(let i of keys){
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
    this.props.dispatch(delMusicItem({ids},this.getMusicList.bind(this)))
  }
  handleStatus(status, ids){
    status = status === 1 ? 0 : 1
    this.props.dispatch(toggleMusicStatus({ids,status},this.getMusicList.bind(this)))
    return
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
  handleChecked(id,e){
    const checkbox= Object.assign({},this.state.checkbox, {[id]: e.target.checked})
    this.setState({checkbox})
  }
}
function mapStateToProps(state){
  return {
    musicList: state.mediaData.musicList.list,
    linkAlbumList: state.mediaData.linkAlbumList,
    total:state.mediaData.musicList.pages
  }
}
export default connect(mapStateToProps)(Music)
