import React, {Component} from 'react'
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
