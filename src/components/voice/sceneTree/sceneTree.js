import React, {Component} from 'react'
import {connect} from 'react-redux'
import './sceneTree.css'
import {getFirstSceneList, getSecondSceneList, setVisibility} from '../../../redux/actions.js'
class SceneTree extends Component{
  render(){
    const {firstSceneList, secondSceneList, visibility}= this.props
    return (
      <div className='scene-tree'
        style={visibility.show? null : {display: 'none'}}
      >
        <ul className='scene-data'>
          <li>场景树<span
            onClick={this.setVisibility.bind(this)}
            >×</span></li>
          {
            (firstSceneList.list||[]).map((val, i)=>{
              return (
                <li id={val.f_scene_id} key={i}>{val.name}
                  <ul>
                    {
                      (secondSceneList.list||[]).map((val, i)=> {
                        return <li key={i} id={val.s_scene_id}>{val.name}</li>
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
  componentDidMount(){
    const {dispatch} = this.props
    dispatch(getFirstSceneList())
    dispatch(getSecondSceneList())
  }
  setVisibility(){
    this.props.dispatch(setVisibility({name:'SCENE_TREE', show:false}))
  }
}
function mapStateToProps(state){
  return {
    firstSceneList: state.voiceData.firstSceneList,
    secondSceneList: state.voiceData.secondSceneList,
    visibility: state.visibility.sceneTree
  }
}
export default connect(mapStateToProps)(SceneTree)
