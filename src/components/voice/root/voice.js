import React, {Component} from 'react'
import './voice.css'
import SceneTree from '../sceneTree/sceneTree.js'
import SecondConfirm from '../secondConfirm/secondConfirm.js'
class Voice extends Component{
  render(){
    return (
      <div className='content'>
        {this.props.children}
        <SceneTree/>
        <SecondConfirm/>
      </div>
    )
  }
}
export default Voice
