import React, {Component} from 'react'
import './planIntroduce.css'
import {Link} from 'react-router'
import {formTime} from '../../../plugs/plugs.js'
class PlanIntroduce extends Component{
  render(){
    const {planIntroduce} = this.props
    return (
      <div className='sleep-plan-introduce'>
        <h1>计划简介</h1>
        <ul>
          <li><span>图标</span><img src={planIntroduce.icon} alt=''/></li>
          <li><span>计划名称</span>{planIntroduce.name}</li>
          <li><span>计划描述</span>{planIntroduce.desc}</li>
          <li><span>权重值</span>{planIntroduce.sort}</li>
          <li><span>间隔时间</span>{formTime(planIntroduce.time_interval)}</li>
          <li><span>上架状态</span>{planIntroduce.status?'上架':'下架'}</li>
        </ul>
        <p>
          <Link to={planIntroduce.icon? {
            pathname:'/habit/editorPlan',
            state:planIntroduce
          }: ''}>编辑信息</Link>
        </p>
      </div>
    )
  }
}
export default PlanIntroduce
