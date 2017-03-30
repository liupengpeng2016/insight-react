import React,{Component} from 'react'
import {Link} from 'react-router'
import AddTo from '../addTo/addTo.js'
import {getAlbumList} from '../../../redux/actions.js'
import { connect } from 'react-redux'
import OperateButtons from '../operateButtons/operateButtons.js'
import PageCtr from '../pageCtr/pageCtr.js'
import {
  getLinkTopicList, delAlbumItem,
  toggleAlbumStatus, linkToTopic
} from '../../../redux/actions.js'
class Album extends Component{
  constructor(props){
    super(props)
    this.state={
      showPanel:false,
      showAllButton:false,
      checkbox:{},
      page:1,
      category:0,
      buttonMode:'1'
    }
    this.checkbox={}
  }
  render(){
    const {albumList} = this.props
    return (
      <div className='album'>
        <div className='media-search'>
          <p><span>已选歌曲列表</span></p>
          <p>
            <input type='text' placeholder='请输入歌曲名称、专辑名称'/>
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
        </ul>
        <table className='media-list'>
          <tbody>
            <tr>
              <td>编号</td>
              <td>类型</td>
              <td>专辑名称</td>
              <td>歌曲数量</td>
              <td>权重</td>
              <td>适合年龄</td>
              <td>上架</td>
              <td>上传时间</td>
              <td>操作</td>
            </tr>
            {(albumList||[]).map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{val.id}</td>
                    <td>{val.category === '1'? '儿童':(val.category ==='2' ? '音乐': '教育')}</td>
                    <td>{val.name}</td>
                    <td>{val.music_count}</td>
                    <td>{val.sort}</td>
                    <td>{val.age}</td>
                    <td>{val.status === 1 ? '是'  : '否'}</td>
                    <td>{val.created_at.slice(0,10)}</td>
                    <td>
                      <OperateButtons
                        mode={this.state.buttonMode}
                        editorTo={{pathname:'/media/editorAlbum',state:{id:val.id}}}
                        handleDel={this.handleDel.bind(this,[val.id])}
                        handleStatus={this.handleStatus.bind(this,val.status,[val.id])}
                        handleAdd={this.handleAdd.bind(this, val.id)}
                        status={val.status}
                        checked={this.state.checkbox[val.id]}
                        toggleChecked={this.toggleChecked.bind(this,val.id)}
                        />
                    </td>
                  </tr>
                )
            })}
          </tbody>
        </table>
        <div className='batch-process'>
          <ul style={!this.state.showAllButton? {display:'none'}: null}>
            <li onClick={this.offAll.bind(this)}>批量下架</li>
            <li onClick={this.onAll.bind(this)}>批量上架</li>
            <li onClick={this.delAll.bind(this)}>批量删除</li>
            <li onClick={this.chooseAll.bind(this)}>全选</li>
          </ul>
          <p><Link to='/addAlbum'>新增专辑</Link></p>
          <h1
            onClick={this.toggleButton.bind(this)}
            style={this.state.showAllButton? {display:'none'}: null}
          >批量处理</h1>
        </div>
        <AddTo
          target='专题'
          isShow={this.state.showPanel}
          hidePanle={this.hidePanel.bind(this)}
          addId={this.state.addId}
          options={this.props.linkTopicList}
          addTo={this.dispatchLinkToTopic.bind(this)}
          />
        <PageCtr total={this.props.total} buttons='10' changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
  changePage(page){
    this.props.dispatch(getAlbumList({page,category:this.state.category}))
    this.setState({page})
  }
  //获取列表
  getAlbumList(){
    const {page, category} = this.state
    this.props.dispatch(getAlbumList({page, category}))
  }
  toggleButton(){
    this.setState({showAllButton: true, buttonMode: 2})
  }
  //可控表单
  handleCategory(e){
    this.setState({category: e.target.value})
  }
  //addto面板
  hidePanel(){
    this.setState({showPanel:false})
  }
  dispatchLinkToTopic(id, subject_id){
    this.props.dispatch(linkToTopic({id, subject_id}))
  }
  //初始数据
  componentWillMount(){
    this.getAlbumList()
  }
  //编辑按钮
  handleAdd(id){
    this.props.dispatch(getLinkTopicList({id}))
    this.setState({showPanel:true, addId: id})
  }
  handleDel(ids){
    this.props.dispatch(delAlbumItem({ids}))
    setTimeout(this.getAlbumList.bind(this),150)
  }
  handleStatus(status, ids){
    status = status === 1 ? 0 : 1
    this.props.dispatch(toggleAlbumStatus({ids,status}))
    setTimeout(this.getAlbumList.bind(this),150)
    return
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
    this.props.dispatch(delAlbumItem({ids: this.filterIds(this.checkbox)}))
    setTimeout(this.getAlbumList.bind(this),150)
  }
  onAll(){
    this.props.dispatch(toggleAlbumStatus({ids: this.filterIds(this.checkbox), status: 1}))
    setTimeout(this.getAlbumList.bind(this),150)
  }
  offAll(){
    this.props.dispatch(toggleAlbumStatus({ids: this.filterIds(this.checkbox), status: 0}))
    setTimeout(this.getAlbumList.bind(this),150)
  }
  chooseAll(){
    const checkbox=this.checkbox
    const keys=Object.keys(checkbox)
    let checked = undefined
    for(let i of keys){
      if(checked === undefined){
        checked = !checkbox[i]
      }
      checkbox[i]= checked
    }
    this.setState({checkbox})
  }
  toggleChecked(id, checked){
    const checkbox=Object.assign(this.checkbox,{[id]: checked})
    this.setState({checkbox})
  }
}
function mapStateToProps(state){
  return {
    albumList:state.mediaData.albumList.list,
    linkTopicList: state.mediaData.linkTopicList,
    total:state.mediaData.albumList.pages
  }
}
export default connect(mapStateToProps)(Album)
