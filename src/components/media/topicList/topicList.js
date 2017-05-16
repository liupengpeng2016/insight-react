import React,{Component} from 'react'
import {Link} from 'react-router'
import AddTo from '../addTo/addTo.js'
import {connect} from 'react-redux'
import {getTopicList, toggleTopicStatus,
 delTopicItem, setVisibility} from '../../../redux/actions.js'
import PageCtr from '../pageCtr/pageCtr.js'

class Topic extends Component{
  constructor(props){
    super(props)
    this.state={
      showPanel:false,
      page:1,
      buttonMode:1,
      location:'0',
      checkbox:{}
    }
  }
  render(){
    const {topicList} = this.props
    return (
      <div className='topic'>
        <ul className='media-scope'>
          <li>
            <span>位置</span>
            <select
              onChange={this.handleLocation.bind(this)}
              value={this.state.location}
              >
              <option value='0'>全部</option>
              <option value='1'>首页</option>
              <option value='2'>故事</option>
              <option value='3'>儿歌</option>
              <option value='4'>音乐</option>
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
            {
              (topicList||[]).map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{val.id}</td>
                    <td>
                      <Link to={{pathname:'/media/mediaList/topic/albumOfTopic', state:{id: val.id, name: val.name}}}
                        style={{color:'#5cc1df'}}
                      >{val.name}
                      </Link>
                    </td>
                    <td>{this.formLocation(val.location)}</td>
                    <td>{val.sort}</td>
                    <td>{parseInt(val.status, 10) === 1 ? '是'  : '否'}</td>
                    <td>{val.created_at.slice(0,10)}</td>
                    <td>
                        {this.state.buttonMode?(
                          <ul className='operate-buttons'>
                            <li ><Link to={{pathname:'/media/editorTopic',state:val, query:{location: val.location}}} style={{color:'#76cbe5'}}>编辑</Link></li>
                            <li onClick={this.handleDel.bind(this,[val.id])} style={{color:'#fe6434'}}>删除</li>
                            <li onClick={this.handleStatus.bind(this,val.status,[val.id])} style={{color:'#50ca71'}}>
                              {parseInt(val.status, 10)===1?<span style={{color:'#aaa'}}>下架</span>:<span>上架</span>}
                            </li>
                          </ul>
                        ):(
                          <ul className='operate-buttons'>
                            <li ><Link to={{pathname:'/media/editorTopic',state:val}} style={{color:'#76cbe5'}}>编辑</Link></li>
                            <li >
                              <input type='checkbox'
                                onChange={this.handleChecked.bind(this, val.id)}
                                checked={this.state.checkbox[val.id]||false}
                                />
                            </li>
                          </ul>
                        )
                      }
                    </td>
                  </tr>
                )
              })
            }
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
          <p><Link to='/media/addTopic'>新增专题</Link></p>
          <h1
            onClick={this.toggleButton.bind(this)}
            style={!this.state.buttonMode ? {display:'none'}: null}
          >批量处理</h1>
        </div>
        <AddTo isShow={this.state.showPanel} hidePanle={this.hidePanel.bind(this)}/>
        <PageCtr total={this.props.total} buttons='10' changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
  formLocation(loc){
    switch (parseInt(loc, 10)){
      case 1:
      return '首页';
      case 2:
      return '故事';
      case 3:
      return '儿歌';
      case 4:
      return '音乐';
      default: return '';
    }
  }
  toggleButton(){
    this.setState({buttonMode: 0})
  }
  hidePanel(){
    this.setState({showPanel:false})
  }
  changePage(page){
    this.props.dispatch(getTopicList({page}))
    this.setState({page})
  }
  //获取列表
  getTopicList(params= {}){
    const {page, location} = this.state
    params= Object.assign({page, location}, params)
    this.props.dispatch(getTopicList(params))
  }

//初始化数据
  componentWillMount(){
    this.getTopicList()
  }
  componentWillReceiveProps(nextProps){
    const {topicList} = nextProps
    if(topicList){
      const checkbox= {}
      for(let i of topicList){
        Object.assign(checkbox, {[i.id]: false})
      }
      this.setState({checkbox})
    }
  }
  handleLocation(e){
    this.setState({location:e.target.value})
    this.getTopicList({location:e.target.value})
  }
//button按钮事件
  handleDel(ids){
    this.props.dispatch(delTopicItem({ids},this.getTopicList.bind(this)))
  }
  handleStatus(status, ids){
    status = status === 1 ? 0 : 1
    this.props.dispatch(toggleTopicStatus({ids,status},this.getTopicList.bind(this)))
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
    this.props.dispatch(delTopicItem({ids},this.getTopicList.bind(this)))
  }
  onAll(){
    const ids= this.filterIds(this.state.checkbox)
    if(!ids.length){
      return this.props.dispatch(setVisibility({name:'FETCH_NOTICE', show: true, msg:'请选择一个或多个内容！'}))
    }
    this.props.dispatch(toggleTopicStatus({ids, status: 1},this.getTopicList.bind(this)))
  }
  offAll(){
    const ids= this.filterIds(this.state.checkbox)
    if(!ids.length){
      return this.props.dispatch(setVisibility({name:'FETCH_NOTICE', show: true, msg:'请选择一个或多个内容！'}))
    }
    this.props.dispatch(toggleTopicStatus({ids, status: 0},this.getTopicList.bind(this)))
  }
  chooseAll(){
    const checkbox= Object.assign({},this.state.checkbox)
    const keys=Object.keys(checkbox)
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
}
function mapStateToProps(state){
  return {
    topicList: state.mediaData.topicList.list,
    total:state.mediaData.topicList.pages

  }
}
export default connect(mapStateToProps)(Topic)
