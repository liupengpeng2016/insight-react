import React, {Component} from 'react'
import './home.css'
import {connect} from 'react-redux'
import {getDataSituation, getUserList} from '../../../redux/actions.js'
import LookMembers from '../lookMembers/lookMembers.js'
import LookDeviceInfo from '../lookDeviceInfo/lookDeviceInfo.js'
import PageCtr from '../../media/pageCtr/pageCtr.js'
function formTime(time){
  time= String(time)||''
  let length= time.length
  const arr= []
  for(let i= 0; i<parseInt(time.length/4, 10); i++){
    arr.push(time.substr(-4*(i+1), 4))
  }
  arr.reverse()
  time = time.slice(0, time.length%4)
  if(length>=4){
    if(!time.length){
      return arr.join(',')
    }
    return time + ',' + arr.join(',')
  }
  if(length<4){
    return time
  }
}
function computedTime(val){
  const time= new Date()
  const seconds= time.getTime()
  function setTime(seconds){
    time.setTime(seconds)
    return time
  }
  function formMonthAndDate(num){
    if(String(num).length === 1){
      return '0'+String(num)
    }
    return String(num)
  }
  const nowTime= String(setTime(seconds).getFullYear())+
  formMonthAndDate(setTime(seconds).getMonth()+1)+
  formMonthAndDate(setTime(seconds).getDate())
  switch(val){
    case '1':
    return [
      nowTime,
      String(setTime(seconds-24*60*60*1000*365).getFullYear())+
      formMonthAndDate(setTime(seconds-24*60*60*1000*365).getMonth()+1)+
      formMonthAndDate(setTime(seconds-24*60*60*1000*365).getDate())
    ]
    case '2':
    return [
      nowTime,
      String(setTime(seconds-24*60*60*1000*30).getFullYear())+
      formMonthAndDate(setTime(seconds-24*60*60*1000*30).getMonth()+1)+
      formMonthAndDate(setTime(seconds-24*60*60*1000*30).getDate())
    ]
    case '3':
    return [
      nowTime,
      String(setTime(seconds-24*60*60*1000*7).getFullYear)+
      formMonthAndDate(setTime(seconds-24*60*60*1000*7).getMonth()+1)+
      formMonthAndDate(setTime(seconds-24*60*60*1000*7).getDate())
    ]
    default: return []
  }
}
class Home extends Component{
  constructor(props){
    super(props)
    this.state= {
      page: '1',
      activeTime:'',
      age:'',
      gender:'',
      userInput:'',
      searchType:'',
      membersShow: false,
      deviceInfoShow: false,
      userInfo:{},
      device: {}
    }
  }
  render(){
    let {dataSituation, userList} = this.props
    dataSituation = dataSituation || {}
    userList = userList.list || []
    return (
      <div className='home content'>
        <LookMembers
          isShow={this.state.membersShow}
          handleClick={this.hideMembers.bind(this)}
          userInfo={this.state.userInfo}
          />
        <LookDeviceInfo
          isShow={this.state.deviceInfoShow}
          handleClick={this.hideDeviceInfo.bind(this)}
          device={this.state.device}
          />
        <h1>首页</h1>
        <h2>数据信息概况</h2>
        <ul className='data-situation'>
          <li>
            <h1>日活跃用户</h1>
            <p>{formTime(dataSituation.dau)}</p>
          </li>
          <li>
            <h1>周活跃用户</h1>
            <p>{formTime(dataSituation.wau)}</p>
          </li>
          <li>
            <h1>月活跃用户</h1>
            <p>{formTime(dataSituation.mau)}</p>
          </li>
          <li>
            <h1>注册总人数</h1>
            <p>{formTime(dataSituation.reg_count)}</p>
          </li>
          <li>
            <h1>设备激活量</h1>
            <p>{formTime(dataSituation.device_count)}</p>
          </li>
        </ul>
        <div className='user-situation'>
          <h1
            onChange={this.handleUserInput.bind(this)}
            value={this.state.userInput}
            >用户信息概况
            <span onClick={this.handleSearch.bind(this)}>搜索</span>
            <input type='text' placeholder='输入微信昵称、宝宝昵称、设备ID'/>
            <select
              onChange={this.handleSearchType.bind(this)}
              value={this.state.searchType}
              >
              <option value=''>请选择搜索类型</option>
              <option value='baby_nick'>孩子昵称</option>
              <option value='wechat_nick'>微信昵称</option>
              <option value='device_id'>设备id</option>
            </select>
          </h1>
          <p className='home-search-scope'>
            <span>时间</span>
            <select
              onChange={this.handleActiveTime.bind(this)}
              value={this.state.activeTime}
              >
              {

              }
              <option value=''>请选择时间</option>
              <option value='1'>最近一年</option>
              <option value='2'>最近一月</option>
              <option value='3'>最近一周</option>
            </select>
            <span>年龄</span>
            <select
              onChange={this.handleAge.bind(this)}
              value={this.state.age}
              >
              <option value=''>请选择年龄</option>
              <option value='0-3'>0岁至3岁</option>
              <option value='3-6'>3岁至6岁</option>
              <option value='6-9'>6岁至9岁</option>
              <option value='9-12'>9岁至12岁</option>
            </select>
            <span>性别</span>
            <select
              onChange={this.handleGender.bind(this)}
              value={this.state.gender}
              >
              <option value=''>请选择性别</option>
              <option value='1'>男</option>
              <option value='2'>女</option>
            </select>
          </p>
          <table className='home-user-list'>
            <tbody>
              <tr>
                <td>设备信息</td>
                <td>手机号</td>
                <td>宝宝昵称</td>
                <td>宝宝性别</td>
                <td>宝宝年龄</td>
                <td>习惯养成</td>
                <td>已绑定用户</td>
                <td>激活时间</td>
              </tr>
              {
                userList.map((val, i) =>{
                  return (
                    <tr key={i}>
                      <td style={{color: '#5cc1df', cursor: 'pointer'}}
                        onClick={this.showDeviceInfo.bind(this, val.device)}
                        >查看</td>
                      <td>{val.phone}</td>
                      <td>{val.baby_nick}</td>
                      <td>{parseInt(val.gender,10) === 1 ? '男' : '女'}</td>
                      <td>{val.age}</td>
                      <td style={{color: '#5cc1df', cursor: 'pointer'}}>查看</td>
                      <td>{(
                          <ul className='home-list-members'>
                            {
                              (val.members||[]).map((mem,i)=>{
                                return <li key={i}
                                  onClick={this.showMembers.bind(this, mem.nick, mem.gender, mem.role, mem.is_admin)}
                                  >{mem.nick}</li>
                              })
                            }
                          </ul>
                        )}</td>
                      <td>{val.active_time.slice(0,10)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <PageCtr
          total={this.props.userList.pages}
          buttons='10'
          changePage={this.changePage.bind(this)}
          />
      </div>
    )
  }
  componentDidMount(){
    this.searchUserList()
    this.props.dispatch(getDataSituation())
  }
  changePage(page){
    this.searchUserList({page})
    this.setState({page})
  }
  searchUserList(params= null){
    const {dispatch} = this.props
    let {page, age, gender, activeTime, searchType, userInput} = this.state
    const newParams= Object.assign({
      page,
      gender,
      min_age: age.split('-')[0]||'',
      max_age: age.split('-')[1]||'',
      active_begin: computedTime(activeTime)[1]||'',
      active_end: computedTime(activeTime)[0]||''
    }, {[searchType]: userInput},params)
      dispatch(getUserList(newParams))
  }
  handleSearch(){
    this.searchUserList()
  }
  handleUserInput(e){
    this.setState({userInput: e.target.value})
  }
  handleActiveTime(e){
    const activeTime = e.target.value
    this.setState({activeTime})
    this.searchUserList({active_begin: computedTime(activeTime)[1]||'', active_end: computedTime(activeTime)[0]||''})
  }
  handleAge(e){
    const age = e.target.value
    this.setState({age})
    this.searchUserList({min_age: age.split('-')[0] || '', max_age: age.split('-')[1] || ''})
  }
  handleGender(e){
    this.setState({gender: e.target.value})
    this.searchUserList({gender: e.target.value})
  }
  handleSearchType(e){
    this.setState({searchType: e.target.value})
  }
  showMembers(nick, gender, role, is_admin){
    this.setState({
      membersShow: true,
      userInfo: {role, nick, gender, is_admin }
    })
  }
  hideMembers(){
    this.setState({
      membersShow: false
    })
  }
  showDeviceInfo(device){
    this.setState({
      deviceInfoShow: true,
      device
    })
  }
  hideDeviceInfo(){
    this.setState({deviceInfoShow: false})
  }
}
function mapStateToProps(state){
  return {
    dataSituation: state.homeData.dataSituation,
    userList: state.homeData.userList
  }
}
export default connect(mapStateToProps)(Home)
