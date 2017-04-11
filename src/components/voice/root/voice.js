import React, {Component} from 'react'
import './voice.css'
class Voice extends Component{
  render(){
    return (
      <div className='content'>
        {this.props.children}
      </div>
    )
  }
}
export default Voice
