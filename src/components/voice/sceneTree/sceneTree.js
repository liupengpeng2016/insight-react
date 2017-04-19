import React, {Component} from 'react'
import {connect} from 'react-redux'
import './sceneTree.css'
import {getAllFirstSceneList, getAllSecondSceneList, setVisibility} from '../../../redux/actions.js'
class SceneTree extends Component{
  constructor(){
    super()
    this.toggleSecondScene= this.toggleSecondScene.bind(this)
  }
  render(){
    const {sceneTree, visibility}= this.props
    const toggleSecondScene= this.toggleSecondScene
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
            (function(){
              const keys= Object.keys(sceneTree)
              const outPut= []
              for(let i of keys){
                const arrItem= (
                  <li key={i}
                    >
                    <i></i>
                    <span onClick={toggleSecondScene} id={i}>
                      {sceneTree[i].name}
                    </span>
                    <ul className='hide'>
                      {
                        (function(){
                          const outPut= []
                          for(let j of (sceneTree[i].secondScene||[])){
                            const arrItem=(
                              <li key={j.s_scene_id}><i></i>{j.name}</li>
                            )
                            outPut.push(arrItem)
                          }
                          return outPut
                        })()
                      }
                    </ul>
                  </li>
                )
                outPut.push(arrItem)
              }
              return outPut
            })()
          }
          </ul>
        </div>
      </div>
    )
  }
  componentDidMount(){
    const {dispatch} = this.props
    dispatch(getAllFirstSceneList())
  }
  setVisibility(){
    this.props.dispatch(setVisibility({name:'SCENE_TREE', show:false}))
  }
  getAllSecondSceneList(f_scene_id){
    this.props.dispatch(getAllSecondSceneList({f_scene_id}))
  }
  toggleSecondScene(e){
    this.getAllSecondSceneList(e.target.id)
    const className= e.target.nextSibling.className
    return className? e.target.nextSibling.className= '': e.target.nextSibling.className= 'hide'
  }
}
function mapStateToProps(state){
  return {
    sceneTree: state.voiceData.sceneTree,
    visibility: state.visibility.sceneTree
  }
}
export default connect(mapStateToProps)(SceneTree)
