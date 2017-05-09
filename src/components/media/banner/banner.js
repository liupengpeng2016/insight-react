import React,{Component} from 'react'
import {Link} from 'react-router'
import AddTo from '../addTo/addTo.js'
import {connect} from 'react-redux'
import {getBannerList, toggleBannerStatus, delBannerItem} from '../../../redux/actions.js'
import PageCtr from '../pageCtr/pageCtr.js'

class Banner extends Component{
  constructor(props){
    super(props)
    this.state={
      showPanel:false,
      page:1,
      buttonMode: 1,
      checkbox:{}
    }
  }
  render(){
    const {bannerList} = this.props
    return (
      <div className='album'>
        {/*
          <div className='media-search'>
            <p><span>banner列表</span></p>
            <p>
              <input type='text' placeholder='请输入歌曲名称、banner名称'/>
              <input type='button' value='搜索已选banner'/>
            </p>
          </div>
          */}
        <ul className='media-scope'>
          <li>
            <span>头图播放顺序</span>
            <select>
              <option value=''>全部</option>
            </select>
          </li>
        </ul>
        <table className='media-list'>
          <tbody>
            <tr>
              <td>编号</td>
              <td>图片</td>
              <td>链接</td>
              <td>描述</td>
              <td>点击量</td>
              <td>权重</td>
              <td>上架</td>
              <td>操作</td>
            </tr>
            {
              (bannerList||[]).map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{val.id}</td>
                    <td><img src={val.pic} alt=''  style={{width:'60px',margin:'0 auto'}}/></td>
                    <td>{val.url}</td>
                    <td>{val.desc}</td>
                    <td>{val.click_times}</td>
                    <td>{val.sort}</td>
                    <td>{parseInt(val.status, 10) === 1 ? '是'  : '否'}</td>
                    <td>
                      {
                        this.state.buttonMode?(
                          <ul className='operate-buttons'>
                            <li ><Link to={{pathname:'/media/editorBanner',state:val}} style={{color:'#76cbe5'}}>编辑</Link></li>
                            <li onClick={this.handleDel.bind(this,[val.id])} style={{color:'#fe6434'}}>删除</li>
                            <li onClick={this.handleStatus.bind(this,val.status,[val.id])} style={{color:'#50ca71'}}>
                              {parseInt(val.status, 10)===1?<span style={{color:'#aaa'}}>下架</span>:<span>上架</span>}
                            </li>
                          </ul>
                        ):(
                          <ul className='operate-buttons'>
                            <li ><Link to={{pathname:'/media/editorBanner',state:val}} style={{color:'#76cbe5'}}>编辑</Link></li>
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
          <p><Link to='/media/addBanner'>新增banner</Link></p>
          <h1
            onClick={this.toggleButton.bind(this)}
            style={!this.state.buttonMode? {display:'none'}: null}
          >批量处理</h1>
        </div>
        <AddTo isShow={this.state.showPanel} hidePanel={this.hidePanel.bind(this)}/>
        <PageCtr total={this.props.total} buttons='10' changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
  toggleButton(){
    this.setState({buttonMode: 0})
  }
  hidePanel(){
    this.setState({showPanel:false})
  }
  changePage(page){
    this.props.dispatch(getBannerList({page}))
    this.setState({page})
  }
  //获取列表
  getBannerList(){
    const {page} = this.state
    this.props.dispatch(getBannerList({page}))
  }
//初始化数据
  componentWillMount(){
    this.props.dispatch(getBannerList({page:this.state.page}))
  }
  componentWillReceiveProps(nextProps){
    const {bannerList} = nextProps
    if(bannerList){
      const checkbox= {}
      for(let i of bannerList){
        Object.assign(checkbox, {[i.id]: false})
      }
      this.setState({checkbox})
    }
  }
//button按钮事件
  handleDel(ids){
    this.props.dispatch(delBannerItem({ids},this.getBannerList.bind(this)))
  }
  handleStatus(status, ids){
    status = status === 1 ? 0 : 1
    this.props.dispatch(toggleBannerStatus({ids,status},this.getBannerList.bind(this)))
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
    this.props.dispatch(delBannerItem({ids: this.filterIds(this.state.checkbox)},this.getBannerList.bind(this)))
  }
  onAll(){
    this.props.dispatch(toggleBannerStatus({ids: this.filterIds(this.state.checkbox), status: 1},this.getBannerList.bind(this)))
  }
  offAll(){
    this.props.dispatch(toggleBannerStatus({ids: this.filterIds(this.state.checkbox), status: 0},this.getBannerList.bind(this)))
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
    bannerList: state.mediaData.bannerList.list,
    total:state.mediaData.bannerList.pages
  }
}
export default connect(mapStateToProps)(Banner)
