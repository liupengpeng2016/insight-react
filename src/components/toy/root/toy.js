import React, {Component} from 'react'
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
