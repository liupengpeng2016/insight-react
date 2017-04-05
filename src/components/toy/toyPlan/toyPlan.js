import React, {Component} from 'react'
import './toyPlan.css'
import ToyPlanItem from '../toyPlanItem/toyPlanItem.js'
class ToyPlan extends Component{
  render(){
    let {toyPlan} = this.props
    toyPlan = toyPlan || []
    return (
      <div className='toy-plan'>
        <h1>玩偶设置</h1>
        <h2>动作设置</h2>
        <ul className='toy-plan-tabs'>
          <li>{(toyPlan.shake || []).name}</li>
          <li>{(toyPlan.pat || []).name}</li>
          <li>{(toyPlan.wakeup || []).name}</li>
          <li>新增计划</li>
        </ul>
        <ToyPlanItem/>
      </div>
    )
  }
}
export default ToyPlan
