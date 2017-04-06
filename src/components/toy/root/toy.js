import React, {Component} from 'react'
import './toy.css'
class Toy extends Component{
  render(){
    return (
      <div className='content'>
        {this.props.children}
      </div>
    )
  }
}
export default Toy
