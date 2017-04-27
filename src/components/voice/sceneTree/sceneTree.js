import React, {Component} from 'react'
import {connect} from 'react-redux'
import './sceneTree.css'
import {getAllScene, setVisibility} from '../../../redux/actions.js'
class SceneTree extends Component{
  constructor(){
    super()
    this.toggleSecondScene= this.toggleSecondScene.bind(this)
  }
  render(){
    const {allScene, visibility}= this.props
    return (
      <div className='scene-tree'
        style={visibility.show? null : {display: 'none'}}
      >
        <div className='scene-data'>
          <h1>场景树<span
            onClick={this.setVisibility.bind(this)}
            >×</span></h1>
          <ul>
          {
            allScene.map((val, i)=>{
              return (
                <ul key={i}>
                  <li><i></i>
                    <span onClick={this.toggleSecondScene}
                    >{val.f_scene_name}({val.s_scene_list.length})</span>
                    <ul>
                      {val.s_scene_list.map((val, i)=>{
                        return <li key={i}><i></i>{val}</li>
                      })}
                    </ul>
                  </li>
                </ul>
              )
            })
          }
          </ul>
        </div>
      </div>
    )
  }
  componentDidMount(){
    const {dispatch} = this.props
    dispatch(getAllScene())
  }
  setVisibility(){
    this.props.dispatch(setVisibility({name:'SCENE_TREE', show:false}))
  }
  toggleSecondScene(e){
    const className= e.target.nextSibling.className
    return className? e.target.nextSibling.className= '': e.target.nextSibling.className= 'hide'
  }
}
function mapStateToProps({voiceData, visibility}){
  return {
    allScene: voiceData.allScene,
    visibility: visibility.sceneTree
  }
}
export default connect(mapStateToProps)(SceneTree)
