import React,{Component} from 'react'
import {Link} from 'react-router'
import AddTo from '../addTo/addTo.js'
import {connect} from 'react-redux'
import {getBannerList, toggleBannerStatus, delBannerItem} from '../../redux/actions.js'
import OperateButtons from '../operateButtons/operateButtons.js'

class Banner extends Component{
  constructor(props){
    super(props)
    this.state={
      showAllButton:true,
      showPanel:false,
      page:1
    }
  }
  render(){
    const {bannerList} = this.props
    return (
      <div className='album'>
        <div className='media-search'>
          <p><span>banner列表</span></p>
          <p>
            <input type='text' placeholder='请输入歌曲名称、banner名称'/>
            <input type='button' value='搜索已选歌曲'/>
          </p>
        </div>
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
                      <OperateButtons
                        mode='3'
                        editorTo={{pathname:'/media/editorTopic',state:{id: val.id}}}
                        handleDel={this.handleDel.bind(this,[val.id])}
                        handleStatus={this.handleStatus.bind(this,val.status,[val.id])}
                        status={val.status}
                      />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className='batch-process'>
          <ul style={this.state.showAllButton? {display:'none'}: null}>
            <li>批量下架</li>
            <li>批量上架</li>
            <li>批量删除</li>
            <li onClick={this.chooseAll.bind(this)}>全选</li>
          </ul>
          <p><Link to='/addBanner'>新增banner</Link></p>
          <h1
            onClick={this.toggleButton.bind(this)}
            style={!this.state.showAllButton? {display:'none'}: null}
          >批量处理</h1>
        </div>
        <AddTo isShow={this.state.showPanel} hidePanel={this.hidePanel.bind(this)}/>
      </div>
    )
  }
  chooseAll(){

  }
  toggleButton(){
    this.setState({showAllButton:false})
  }
  hidePanel(){
    this.setState({showPanel:false})
  }
//初始化数据
  componentWillMount(){
    this.props.dispatch(getBannerList({page:this.state.page}))
  }
  //button按钮事件
    handleDel(ids){
      this.props.dispatch(delBannerItem({ids}))
    }
    handleStatus(status, ids){
      status = status === 1 ? 0 : 1
      return this.props.dispatch(toggleBannerStatus({ids,status}))
    }
}
function mapStateToProps(state){
  return {
    bannerList: state.mediaData.bannerList.list
  }
}
export default connect(mapStateToProps)(Banner)
