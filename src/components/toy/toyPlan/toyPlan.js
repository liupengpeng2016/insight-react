import React, {Component} from 'react'
import './toyPlan.css'
import {Link} from 'react-router'
import {getToyPlan} from '../../../redux/actions.js'
import ToyPlanItem from '../toyPlanItem/toyPlanItem.js'
import {connect} from 'react-redux'
class ToyPlan extends Component{
  render(){
    const activeCss={borderBottom: '5px solid #5cc1df'}
    return (
      <div className='toy-plan'>
        <h1>玩偶设置</h1>
        <h2>动作设置</h2>
        <ul className='toy-plan-tabs'>
          <li><Link to='/toy/toyPlan/shake' activeStyle={activeCss}>摇一摇</Link></li>
          <li><Link to='/toy/toyPlan/pat' activeStyle={activeCss}>拍一下</Link></li>
          <li><Link to='/toy/toyPlan/wakeup' activeStyle={activeCss}>唤醒</Link></li>
        </ul>
        <ToyPlanItem
          itemData={this.getItemData()}
          />
      </div>
    )
  }
  componentDidMount(){
    this.props.dispatch(getToyPlan())
  }
  getItemData(){
    const {shake, pat, wakeup, params} = this.props
    switch(params.id){
      case 'shake':
      return shake
      case 'pat':
      return pat
      case 'wakeup':
      return wakeup
      default :
      return []
    }
  }
}
function mapStateToProps(state){
  return {
    shake: (state.toyData.toyPlan.actions||[]).shake,
    pat: (state.toyData.toyPlan.actions||[]).pat,
    wakeup: (state.toyData.toyPlan.actions||[]).wakeup
  }
}
export default connect(mapStateToProps)(ToyPlan)
