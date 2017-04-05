import React, {Component} from 'react'
import './planEvent.css'
import CtrButtons from '../ctrButtons/ctrButtons.js'
import {delHabitPlanEvent} from '../../../redux/actions.js'
import {Link} from 'react-router'
import {connect} from 'react-redux'
class PlanEvent extends Component {
  constructor(props){
    super(props)
    this.state={
      mode:'1',
      checkbox:{}
    }
    this.checkbox={}
  }
  render(){
    const {planEvent} = this.props
    return (
      <div className='sleep-plan-list'>
        <h1>睡眠习惯养成计划</h1>
        <table>
          <tbody>
            <tr>
              <td>序号</td>
              <td>图标</td>
              <td>事件名称</td>
              <td>音乐</td>
              <td>玩偶语音</td>
              <td>是否打开</td>
              <td>提醒时间</td>
              <td>权重</td>
              <td>操作</td>
            </tr>
            {
              (planEvent || []).map((val,i)=>{
              return (
                <tr key={i}>
                  <td>{val.id}</td>
                  <td><img src={val.icon} alt=''/></td>
                  <td>{val.name}</td>
                  <td>{val.voice_name}</td>
                  <td><voice src={val.voice_url}></voice></td>
                  <td>{val.status === 1 ? '是' : '否'}</td>
                  <td>{val.time}</td>
                  <td>{val.sort}</td>
                  <td>
                    <CtrButtons
                      mode={this.state.mode}
                      path='/habit/addEvent'
                      del={this.delItem.bind(this, val.id)}
                      checked={this.state.checkbox[val.id]||false}
                      activeId={this.props.activeId}
                      change={this.handleChange.bind(this, val.id)}
                    />
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        <div className='habit-control-buttons'>
          <ul style={this.state.mode === '1' ? {display: 'none'} : null}>
            <li onClick={this.delAll.bind(this)}>批量删除</li>
            <li onClick={this.chooseAll.bind(this)}>全选</li>
          </ul>
          <h1 onClick={this.changeMode.bind(this)}
            style={this.state.mode === '1' ? null : {display: 'none'}}
          >批量管理</h1>
        <h2><Link to='/habit/addEvent'>新增提醒</Link></h2>
        </div>
      </div>
    )
  }
  //props
  delItem(id){
    this.props.dispatch(delHabitPlanEvent({default_plan_event_ids:id}))
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.activeId !== this.props.activeId){
      this.checkbox={}
      this.setState({checkbox: {}, mode:'1'})
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.activeId !== this.props.activeId){
      this.setState({checkbox: this.checkbox})
    }
  }
  handleChange(id, checked){
    console.log(id)
    Object.assign(this.checkbox, {[id]: checked})
    this.setState({checkbox: this.checkbox})
  }
  componentDidMount(){
    this.setState({checkbox: this.checkbox})
  }
  //ctr
  chooseAll(){
    const keys=Object.keys(this.checkbox)
    const checked=  !this.checkbox[keys[0]] ? true : false
    for(let i of keys){
      this.checkbox[i]= checked
    }
    this.setState({checkbox: this.checkbox})
  }
  delAll(){
    const obj= Object.assign({}, this.state.checkbox)
    let ids= ''
    const keys=Object.keys(obj)
    for(let i of keys){
      if(obj[i]){
        ids+= i+ ','
      }
    }
    ids.slice(0, -1)
    this.props.dispatch(delHabitPlanEvent({default_plan_event_ids:ids}))
    setTimeout(()=>{
      this.props.refresh()
    },150)
  }
  changeMode(){
    this.setState({mode: '2'})
  }
}
export default connect()(PlanEvent)
