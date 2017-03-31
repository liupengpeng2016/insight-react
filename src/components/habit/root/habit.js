import React, {Component} from 'react'
import './habit.css'
class Habit extends Component{
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Habit
