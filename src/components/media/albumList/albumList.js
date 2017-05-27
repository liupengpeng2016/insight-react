import React,{Component} from 'react'
import {Link} from 'react-router'
import AddTo from '../addTo/addTo.js'
import {getAlbumList} from '../../../redux/actions.js'
import { connect } from 'react-redux'
import PageCtr from '../pageCtr/pageCtr.js'
import {
  getLinkTopicList, delAlbumItem, setVisibility,
  toggleAlbumStatus, linkToTopic
} from '../../../redux/actions.js'
class Album extends Component{
  constructor(props){
    super(props)
    this.state={
      showPanel:false,
      checkbox:{},
      page:1,
      category:0,
      buttonMode:1,
      keywords:''
    }
  }
  render(){
    const {albumList} = this.props
    return (
      <div className='album'>
        <div className='media-search'>
          <p><span>已选歌曲列表</span></p>
          <p>
            <input type='text' placeholder='请输入专辑名称'
              onChange={ e => this.setState({keywords: e.target.value})}
              value={ this.state.keywords }
            />
            <input type='button' value='搜索专辑'
              onClick={this.handleSearch.bind(this)}
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
              <option value='1'>故事</option>
              <option value='2'>儿歌</option>
              <option value='3'>音乐</option>
            </select>
          </li>
        </ul>
        <table className='media-list'>
          <tbody>
            <tr>
              <td>编号</td>
              <td>类型</td>
              <td>专辑名称</td>
              <td>专辑图片</td>
              <td>歌曲数量</td>
              <td>权重</td>
              <td>适合年龄</td>
              <td>上架</td>
              <td>上传时间</td>
              <td>操作</td>
            </tr>
            {(albumList.list||[]).map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{val.id}</td>
                    <td>{val.category === 1? '故事':(val.category ===2 ? '儿歌': '音乐')}</td>
                    <td>
                      <Link to={{pathname:'/media/mediaList/album/musicOfAlbum', state:{id: val.id, name: val.name}}} style={{color:'#5cc1df'}}>{val.name}</Link>
                    </td>
                    <td><img src={val.cover} alt=''
                      style={{height:'30px',lineHeight:'normal',verticalAlign:'middle',display:'inline-block'}}
                      /></td>
                    <td>{val.music_count}</td>
                    <td>{val.sort}</td>
                    <td>{val.age}</td>
                    <td>{val.status === 1 ? '是'  : '否'}</td>
                    <td>{val.created_at.slice(0,10)}</td>
                    <td>
                        {
                          this.state.buttonMode?(
                            <ul className='operate-buttons'>
                              <li ><Link to={{pathname:'/media/editorAlbum',state: val}} style={{color:'#76cbe5'}}>编辑</Link></li>
                              <li onClick={this.handleDel.bind(this,[val.id])} style={{color:'#fe6434'}}>删除</li>
                              <li onClick={this.handleStatus.bind(this,val.status,[val.id])} style={{color:'#50ca71'}}>
                                {parseInt(val.status, 10)===1?<span style={{color:'#aaa'}}>下架</span>:<span>上架</span>}
                              </li>
                              <li onClick={this.handleAdd.bind(this, val.id)} style={{color:'#76cbe5'}}>添加</li>
                            </ul>
                          ):(
                            <ul className='operate-buttons'>
                              <li ><Link to={{pathname:'/media/editorAlbum',state:val}} style={{color:'#76cbe5'}}>编辑</Link></li>
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
            })}
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
          <p><Link to='/media/addAlbum'>新增专辑</Link></p>
          <h1
            onClick={this.toggleButton.bind(this)}
            style={!this.state.buttonMode? {display:'none'}: null}
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
        <PageCtr total={this.props.albumList.pages} buttons='10' changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
  changePage(page){
    this.props.dispatch(getAlbumList({page,category:this.state.category}))
    this.setState({page})
  }
  //获取列表
  getAlbumList(params= null){
    const {page, category, keywords} = this.state
    params= Object.assign({page, category, keywords}, params)
    this.props.dispatch(getAlbumList(params))
  }
  toggleButton(){
    this.setState({buttonMode: 0})
  }
  //可控表单
  handleCategory(e){
    this.setState({category: e.target.value})
    this.props.dispatch(getAlbumList({page:1, category:e.target.value}))
  }
  //addto面板
  hidePanel(){
    this.setState({showPanel:false})
  }
  dispatchLinkToTopic(id, subject_id){
    this.props.dispatch(linkToTopic({id, subject_id}))
  }
  //初始数据
  componentDidMount(){
    this.getAlbumList()
  }
  componentWillReceiveProps(nextProps){
    const {albumList} = nextProps
    if(albumList.list){
      const checkbox= {}
      for(let i of albumList.list){
        Object.assign(checkbox, {[i.id]: false})
      }
      this.setState({checkbox})
    }
  }
  //编辑按钮
  handleAdd(id){
    this.props.dispatch(getLinkTopicList({id}))
    this.setState({showPanel:true, addId: id})
  }
  handleDel(ids){
    this.props.dispatch(delAlbumItem({ids},this.getAlbumList.bind(this)))
  }
  handleStatus(status, ids){
    status = status === 1 ? 0 : 1
    this.props.dispatch(toggleAlbumStatus({ids,status},this.getAlbumList.bind(this)))
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
    const ids= this.filterIds(this.state.checkbox)
    if(!ids.length){
      return this.props.dispatch(setVisibility({name:'FETCH_NOTICE', show: true, msg:'请选择一个或多个内容！'}))
    }
    this.props.dispatch(delAlbumItem({ids},this.getAlbumList.bind(this)))
  }
  onAll(){
    const ids= this.filterIds(this.state.checkbox)
    if(!ids.length){
      return this.props.dispatch(setVisibility({name:'FETCH_NOTICE', show: true, msg:'请选择一个或多个内容！'}))
    }
    this.props.dispatch(toggleAlbumStatus({ids, status: 1},this.getAlbumList.bind(this)))
  }
  offAll(){
    const ids= this.filterIds(this.state.checkbox)
    if(!ids.length){
      return this.props.dispatch(setVisibility({name:'FETCH_NOTICE', show: true, msg:'请选择一个或多个内容！'}))
    }
    this.props.dispatch(toggleAlbumStatus({ids, status: 0},this.getAlbumList.bind(this)))
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
  toggleChecked(id, checked){
    const checkbox=Object.assign(this.checkbox,{[id]: checked})
    this.setState({checkbox})
  }
  handleChecked(id,e){
    const checkbox= Object.assign({},this.state.checkbox, {[id]: e.target.checked})
    this.setState({checkbox})
  }
  handleSearch(){
    this.getAlbumList()
  }
}
function mapStateToProps(state){
  return {
    albumList:state.mediaData.albumList,
    linkTopicList: state.mediaData.linkTopicList
  }
}
export default connect(mapStateToProps)(Album)
