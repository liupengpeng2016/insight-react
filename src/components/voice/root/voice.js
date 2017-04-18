import React, {Component} from 'react'
import './voice.css'
import SceneTree from '../sceneTree/sceneTree.js'
class Voice extends Component{
  render(){
    return (
      <div className='content'>
        {this.props.children}
        <SceneTree/>
      </div>
    )
  }
}
export default Voice
