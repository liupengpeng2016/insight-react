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
          {
            allScene.map((val, i)=>{
              return (
                <ul key={i}>
                  <li onClick={this.toggleSecondScene}
                    className='active-scene'
                    >
                      {val.f_scene_name}
                  </li>
                  <li>
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
    document.querySelector('.scene-data').scrollTop= 0
  }
  toggleSecondScene(e){
    const target_f_scene= e.target
    const target_s_scene= e.target.nextSibling
    target_f_scene.className === 'unactive-scene' ? target_f_scene.className= 'active-scene' : target_f_scene.className= 'unactive-scene'
    target_s_scene.className? target_s_scene.className= '': target_s_scene.className= 'hide'
  }
}
function mapStateToProps({voiceData, visibility}){
  return {
    allScene: voiceData.allScene,
    visibility: visibility.sceneTree
  }
}
export default connect(mapStateToProps)(SceneTree)
