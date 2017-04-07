import React, {Component} from 'react'
import './media.css'
class Media extends Component{
  render(){
    return (
      <div className='content'>
        {this.props.children}
      </div>
    )
  }
}
export default Media
