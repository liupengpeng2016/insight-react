import React,{Component} from 'react'
import { connect } from 'react-redux'
import PageCtr from '../pageCtr/pageCtr.js'
import {Link} from 'react-router'
import AddTo from '../addTo/addTo.js'
import './musicOfAlbum.css'
import {
  getMusicOfAlbum, delMusicItem, toggleMusicStatus, getLinkAlbumList, linkToAlbum
} from '../../../redux/actions.js'
import {formTime} from '../../../plugs/plugs.js'
class Album extends Component{
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
      page:1
    }
  }
  render(){
    const {musicOfAlbum, location}= this.props
    const {name} = location.state
    return (
      <div className='music-of-album'>
        <div className='album-desc'>
          <p>专辑{'"'+ name+'"'}下歌曲列表</p>
        </div>
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
            {(musicOfAlbum.list||[]).map((val, i) => (
              <tr key={i}>
                <td>{val.music_id}</td>
                <td>{val.name}</td>
                <td>{formTime(val.duration)}</td>
                <td>{val.play_times}</td>
                <td>{val.lyric? '是': '否'}</td>
                <td>{val.age}</td>
                <td>{parseInt(val.status, 10) === 1 ? '是'  : '否'}</td>
                <td>{this.formOrigin(val.origin)}</td>
                <td>{val.created_at.slice(0,10)}</td>
                <td>
                {
                  this.state.buttonMode?(
                    <ul className='operate-buttons'>
                      <li ><Link to={{pathname:'/media/editorMusic',state: val}} style={{color:'#76cbe5'}}>编辑</Link></li>
                      <li onClick={this.handleDel.bind(this,[val.music_id])} style={{color:'#fe6434'}}>删除</li>
                      <li onClick={this.handleStatus.bind(this,val.status,[val.music_id])} style={{color:'#50ca71'}}>
                        {parseInt(val.status, 10)===1?<span style={{color:'#aaa'}}>下架</span>:<span>上架</span>}
                      </li>
                      <li onClick={this.handleAdd.bind(this, val.music_id)} style={{color:'#76cbe5'}}>添加</li>
                    </ul>
                  ):(
                    <ul className='operate-buttons'>
                      <li ><Link to={{pathname:'/media/editorMusic',state:val}} style={{color:'#76cbe5'}}>编辑</Link></li>
                      <li >
                        <input type='checkbox'
                          onChange={this.handleChecked.bind(this,val.music_id)}
                          checked={this.state.checkbox[val.music_id]||false}
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
          </ul>
          <p onClick={()=> history.back()} style={{cursor:'pointer'}}>返回上级</p>
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
        <PageCtr total={this.props.musicOfAlbum.pages} buttons='10' changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
  getMusicOfAlbum(params= null){
    const {page}= this.state
    const id= this.props.location.state.id
    params= Object.assign({page, id}, params)
    this.props.dispatch(getMusicOfAlbum(params))
  }
  changePage(page){
    this.getMusicOfAlbum({page})
  }
  //初始化数据
  componentDidMount(){
    this.getMusicOfAlbum()
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
  componentWillReceiveProps(nextProps){
    const {musicOfAlbum} = nextProps
    if(musicOfAlbum){
      const checkbox= {}
      for(let i of musicOfAlbum.list){
        Object.assign(checkbox, {[i.music_id]: false})
      }
      this.setState({checkbox})
    }
  }
  toggleButton(){
    this.setState({buttonMode: 0})
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
    this.props.dispatch(delMusicItem({ids: this.filterIds(this.state.checkbox)},this.getMusicOfAlbum.bind(this)))
  }
  onAll(){
    this.props.dispatch(toggleMusicStatus({ids: this.filterIds(this.state.checkbox), status: 1},this.getMusicOfAlbum.bind(this)))
  }
  offAll(){
    this.props.dispatch(toggleMusicStatus({ids: this.filterIds(this.state.checkbox), status: 0},this.getMusicOfAlbum.bind(this)))
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
  //编辑按钮操作
  handleAdd(id){
    this.props.dispatch(getLinkAlbumList({id}))
    this.setState({showPanel:true, addId: id})
  }
  handleDel(ids){
    this.props.dispatch(delMusicItem({ids},this.getMusicOfAlbum.bind(this)))
  }
  handleStatus(status, ids){
    status = status === 1 ? 0 : 1
    this.props.dispatch(toggleMusicStatus({ids,status},this.getMusicOfAlbum.bind(this)))
    return
  }
  toggleChecked(id, checked){
    const checkbox=Object.assign(this.checkbox,{[id]: checked})
    this.setState({checkbox})
  }

  dispatchLinkToAlbum(id, album_id){
    this.props.dispatch(linkToAlbum({id, album_id}))
  }
  handleChecked(id,e){
    const checkbox= Object.assign({},this.state.checkbox, {[id]: e.target.checked})
    this.setState({checkbox})
  }

}
function mapStateToProps({mediaData}){
  return {
    musicOfAlbum: mediaData.musicOfAlbum,
    linkAlbumList: mediaData.linkAlbumList
  }
}
export default connect(mapStateToProps)(Album)
