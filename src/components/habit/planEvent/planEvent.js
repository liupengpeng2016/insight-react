import React, {Component} from 'react'
import './planEvent.css'
import {delHabitPlanEvent, setVisibility} from '../../../redux/actions.js'
import {Link} from 'react-router'
import {connect} from 'react-redux'
class PlanEvent extends Component {
  constructor(props){
    super(props)
    this.state={
      mode:1,
      checkbox:{}
    }
  }
  render(){
    const {planEvent} = this.props
    return (
      <div className='sleep-plan-list'>
        <h1>计划事件</h1>
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
              <td>提醒次数</td>
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
                  <td>
                    <audio src={val.voice_url}></audio>
                    <span
                      onClick={this.playVoice.bind(this)}
                      style={{cursor:'pointer', color:'#5ccdef'}}
                    >试听</span>
                  </td>
                  <td>{val.status === 1 ? '是' : '否'}</td>
                  <td>{val.time}</td>
                  <td>{
                      (()=>{
                        switch(val.loop){
                          case '0000000':
                          return '仅一次'
                          case '1111111':
                          return '每天'
                          case '1000000':
                          return '每周一'
                          case '0100000':
                          return '每周二'
                          case '0010000':
                          return '每周三'
                          case '0001000':
                          return '每周四'
                          case '0000100':
                          return '每周五'
                          case '0000010':
                          return '每周六'
                          case '0000001':
                          return '每周日'
                          default: return
                        }
                      })()
                    }</td>
                  <td>{val.sort}</td>
                  <td>
                    {
                      this.state.mode?(
                        <ul className='ctr-buttons'>
                          <li><Link
                             to={{pathname:'/habit/editorPlanEvent',
                             state: val}}
                            >编辑</Link></li>
                          <li onClick={this.delItem.bind(this, val.id)}>删除</li>
                        </ul>
                      ):(
                        <ul className='ctr-buttons'>
                          <li><Link
                            to={{pathname:'/habit/editorPlanEvent',
                            state: val.id}}
                            >编辑</Link></li>
                          <li>
                            <input type='checkbox' checked={this.state.checkbox[val.id]||false}
                              onChange={this.handleChange.bind(this, val.id)}
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
        <div className='habit-control-buttons'>
          <ul style={this.state.mode? {display: 'none'} : null}>
            <li onClick={this.delAll.bind(this)}>批量删除</li>
            <li onClick={this.chooseAll.bind(this)}>全选</li>
            <li onClick={()=> this.setState({mode:1})}>退出</li>
          </ul>
          <h1 onClick={this.changeMode.bind(this)}
            style={this.state.mode? null : {display: 'none'}}
          >批量管理</h1>
        <h2><Link to={this.props.activeId? {pathname:'/habit/addEvent', state: this.props.activeId}:''}>新增提醒</Link></h2>
        </div>
      </div>
    )
  }
  //props
  delItem(id){
    this.props.dispatch(delHabitPlanEvent({default_plan_event_ids:id},this.props.refresh))
  }
  componentWillReceiveProps(nextProps){
      let {planEvent} = nextProps
      planEvent= planEvent || []
      const checkbox= {}
      for(let i of planEvent){
          Object.assign(checkbox, {[i.id]: false})
      }
      this.setState({checkbox, mode: 1})
  }
  handleChange(id, e){
    const checkbox= Object.assign({},this.state.checkbox,{[id]: e.target.checked})
    this.setState({checkbox})
  }
  //ctr
  chooseAll(){
    const checkbox = Object.assign({}, this.state.checkbox)
    const keys=Object.keys(checkbox)
    const checked= !checkbox[keys[0]] ? true : false
    for(let i of keys){
      checkbox[i]= checked
    }
    this.setState({checkbox})
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
    ids= ids.slice(0, -1)
    if(!ids.length){
      return this.props.dispatch(setVisibility({name:'FETCH_NOTICE', show: true, msg:'请选择一个或多个内容！'}))
    }
    this.props.dispatch(delHabitPlanEvent({default_plan_event_ids:ids},this.props.refresh))
  }
  changeMode(){
    this.setState({mode: 0})
  }
  playVoice(e){
    e.target.previousSibling.play()
  }
}
export default connect()(PlanEvent)
