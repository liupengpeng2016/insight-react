import React, {Component} from 'react'
class Record extends Component{
  render(){
    return (
      <div className='scene-manage'>
        <h1>录入记录</h1>
        {this.props.children}
      </div>
    )
  }
}
export default Record
