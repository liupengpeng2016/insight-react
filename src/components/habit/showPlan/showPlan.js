import React, {Component} from 'react'
import './showPlan.css'
import {Link} from 'react-router'
import PlanIntroduce from '../planIntroduce/planIntroduce.js'
import PlanEvent from '../planEvent/planEvent.js'
import {connect} from 'react-redux'
import {getHabitPlan, getHabitPlanEvent} from '../../../redux/actions.js'
const activeCss = {borderBottom: '4px solid #5cc1df'}

class ShowPlan extends Component{
  constructor(props){
    super(props)
    this.state={
      activeId:undefined
    }
  }
  render(){
    const {habitPlan} = this.props
    return (
      <div className='content habit'>
        <h1>习惯养成</h1>
        <h2>系统计划</h2>
        <ul className='habit-tab'>
          {
            (habitPlan||[]).map((val, i) => {
              return (
                <li key={i}
                  onClick={this.handleClick.bind(this, val.id)}
                  style={this.state.activeId === val.id? activeCss : null}
                  >{val.name}</li>
              )
            })
          }
          <li><Link to='/habit/addPlan'>新增计划</Link></li>
        </ul>
        <PlanIntroduce
          planIntroduce={this.state.activeId ? this.filterHabitPlan(this.state.activeId)[0] : []}
          />
        <PlanEvent planEvent={this.props.habitPlanEvent}/>
      </div>
    )
  }
  componentWillReceiveProps(nextProps){
    if(!this.props.habitPlan[0]){
      const id= nextProps.habitPlan[0].id
      if(id){
        this.props.dispatch(getHabitPlanEvent({default_plan_id: id}))
        this.setState({activeId: id})
      }
    }
  }
  componentDidMount(){
    const {dispatch} = this.props
    dispatch(getHabitPlan())
  }
  handleClick(id){
    this.props.dispatch(getHabitPlanEvent({default_plan_id: id}))
    this.setState({activeId: id})
  }
  filterHabitPlan(id){
    return this.props.habitPlan.filter((val, i) => {
      return val.id === id
    })
  }
}
function mapStateToProps(state){
  return {
    habitPlan: state.habitData.habitPlan,
    habitPlanEvent: state.habitData.habitPlanEvent
  }
}

export default connect(mapStateToProps)(ShowPlan)
