import React, {Component} from 'react'
import './planIntroduce.css'
import {Link} from 'react-router'
class PlanIntroduce extends Component{
  render(){
    const {planIntroduce} = this.props
    return (
      <div className='sleep-plan-introduce'>
        <h1>计划简介</h1>
        <ul>
          <li><span>睡眠习惯养成计划</span></li>
          <li><span>图标</span><img src={planIntroduce.icon} alt=''/></li>
          <li><span>计划名称</span>{planIntroduce.name}</li>
          <li><span>计划描述</span>{planIntroduce.desc}</li>
          <li><span>权重值</span>{planIntroduce.sort}</li>
          <li><span>间隔时间</span>{planIntroduce.time_interval}</li>
          <li><span>上架状态</span>{planIntroduce.status}</li>
        </ul>
        <p
          onClick={this.handleEditor.bind(this)}
          ><Link to='/habit/editorPlan'>编辑信息</Link></p>
      </div>
    )
  }
  handleEditor(){

  }
}
export default PlanIntroduce
