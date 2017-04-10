import React, {Component} from 'react'
import './home.css'
import {connect} from 'react-redux'
import {getDataSituation, getUserList} from '../../../redux/actions.js'
import LookMembers from '../lookMembers/lookMembers.js'
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
      membersShow: true
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
          handleClick={this.toggleMembers.bind(this)}
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
            <span onClick={() => this.handleSearch.bind(this)}>搜索</span>
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
              <option value=''>请选择时间</option>
              <option value='1'>2016/09/30至2017/09/10</option>
              <option value='2'></option>
              <option value='3'></option>
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
                      <td style={{color: '#5cc1df', cursor: 'pointer'}}>查看</td>
                      <td>{val.phone}</td>
                      <td>{val.baby_nick}</td>
                      <td>{parseInt(val.nick,10) === 1 ? '男' : '女'}</td>
                      <td>{val.age}</td>
                      <td style={{color: '#5cc1df', cursor: 'pointer'}}>查看</td>
                      <td>{(
                          <ul className='home-list-members'>
                            {
                              (val.members||[]).map((mem,i)=>{
                                return <li key={i}
                                  onClick={this.toggleMembers.bind(this)}
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
      </div>
    )
  }
  componentDidMount(){
    this.searchUserList()
    this.props.dispatch(getDataSituation())
  }
  searchUserList(params= null){
    const {dispatch} = this.props
    let {page, age, gender, activeTime, searchType, userInput} = this.state
    const newParams= Object.assign({
      page,
      gender,
      min_age: age.split('-')[0]||'',
      max_age: age.split('-')[1]||'',
      active_begin: activeTime.split('-')[0]||'',
      active_end: activeTime.split('-')[1]||''
    }, {[searchType]: userInput},params)
      dispatch(getUserList(newParams))
  }
  handleSearch(){
  }
  handleUserInput(e){
    this.setState({userInput: e.target.value})
  }
  handleActiveTime(e){
    const activeTime = e.target.value
    this.setState({activeTime})
    this.searchUserList({active_begin: activeTime.split('-')[0] || '', max_age: activeTime.split('-')[1] || ''})
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
    this.setState({searchList: e.target.value})
  }
  toggleMembers(){
    this.setState({membersShow: !this.state.membersShow})
  }
}
function mapStateToProps(state){
  return {
    dataSituation: state.homeData.dataSituation,
    userList: state.homeData.userList
  }
}
export default connect(mapStateToProps)(Home)
