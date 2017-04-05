import React, {Component} from 'react'
import './habit.css'
class Habit extends Component{
  render(){
    return (
      <div className='content'>
        {this.props.children}
      </div>
    )
  }
}

export default Habit
