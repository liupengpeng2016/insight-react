import React,{Component} from 'react'
class Topic extends Component{
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
export default Topic
