import React,{Component} from 'react'
class Album extends Component{
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
export default Album
