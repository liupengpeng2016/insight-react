import React,{Component} from 'react'
import {Link} from 'react-router'
import AddTo from '../addTo/addTo.js'
import {connect} from 'react-redux'
import {getTopicList, toggleTopicStatus, delTopicItem} from '../../../redux/actions.js'
// import OperateButtons from '../operateButtons/operateButtons.js'
import PageCtr from '../pageCtr/pageCtr.js'

class Topic extends Component{
  constructor(props){
    super(props)
    this.state={
      showPanel:false,
      page:1,
      buttonMode:1,
      checkbox:{}
    }
  }
  render(){
    const {topicList} = this.props
    return (
      <div className='topic'>
        <div className='media-search'>
          <p><span>已选歌曲列表</span></p>
          <p>
            <input type='text' placeholder='请输入歌曲名称、专题名称'/>
            <input type='button' value='搜索已选歌曲'/>
          </p>
        </div>
        <ul className='media-scope'>
          <li>
            <span>位置</span>
            <select>
              <option value=''>全部</option>
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
                    <td>{val.name}</td>
                    <td>{this.formLocation(val.location)}</td>
                    <td>{val.sort}</td>
                    <td>{parseInt(val.status, 10) === 1 ? '是'  : '否'}</td>
                    <td>{val.created_at.slice(0,10)}</td>
                    <td>
                      {/*<OperateButtons
                        mode={this.state.buttonMode}
                        editorTo={{pathname:'/media/editorTopic',state:{id: val.id}}}
                        handleDel={this.handleDel.bind(this,[val.id])}
                        handleStatus={this.handleStatus.bind(this,val.status,[val.id])}
                        status={val.status}
                        checked={this.state.checkbox[val.id]}
                        toggleChecked={this.toggleChecked.bind(this,val.id)}
                      />*/}
                      {
                        this.state.buttonMode?(
                          <ul className='operate-buttons'>
                            <li ><Link to={{pathname:'/media/editorTopic',state:{id:val.id}}} style={{color:'#76cbe5'}}>编辑</Link></li>
                            <li onClick={this.handleDel.bind(this,[val.id])} style={{color:'#fe6434'}}>删除</li>
                            <li onClick={this.handleStatus.bind(this,val.status,[val.id])} style={{color:'#50ca71'}}>
                              {parseInt(val.status, 10)===1?<span style={{color:'#aaa'}}>下架</span>:<span>上架</span>}
                            </li>
                          </ul>
                        ):(
                          <ul className='operate-buttons'>
                            <li ><Link to={{pathname:'/media/editorTopic',state:{id:val.id}}} style={{color:'#76cbe5'}}>编辑</Link></li>
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
  getTopicList(){
    const {page} = this.state
    this.props.dispatch(getTopicList({page}))
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
//button按钮事件
  handleDel(ids){
    this.props.dispatch(delTopicItem({ids}))
    setTimeout(this.getTopicList.bind(this),150)
  }
  handleStatus(status, ids){
    status = status === 1 ? 0 : 1
    this.props.dispatch(toggleTopicStatus({ids,status}))
    setTimeout(this.getTopicList.bind(this),150)
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
    this.props.dispatch(delTopicItem({ids: this.filterIds(this.state.checkbox)}))
    setTimeout(this.getTopicList.bind(this),150)
  }
  onAll(){
    this.props.dispatch(toggleTopicStatus({ids: this.filterIds(this.state.checkbox), status: 1}))
    setTimeout(this.getTopicList.bind(this),150)
  }
  offAll(){
    this.props.dispatch(toggleTopicStatus({ids: this.filterIds(this.state.checkbox), status: 0}))
    setTimeout(this.getTopicList.bind(this),150)
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
