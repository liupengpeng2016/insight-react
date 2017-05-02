import React, {Component} from 'react'
import './secondScene.css'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {
  getSecondSceneList, addSecondSceneItem,
  editorSecondSceneItem, toggleSecondSceneStatus,
  delSecondSceneItem, setVisibility, setVisibility2
} from '../../../redux/actions.js'
import AddSecondScene from '../addSecondScene/addScendScene.js'
import EditorSecondScene from '../editorSecondScene/editorSecondScene.js'
import PageCtr from '../../media/pageCtr/pageCtr.js'
class SecondScene extends Component{
  constructor(){
    super()
    this.state={
      isShow_add: false,
      f_scene_id:'',
      isShow_editor: false,
      page:'',
      editorData_id:'',
    }
  }
  render(){
    const { secondSceneList, location} = this.props
    const {state} = location
    const {name, ename} = location.query
    return (
      <div className='toy-plan'>
        <AddSecondScene
          isShow={this.state.isShow_add}
          f_scene_id={state}
          hide={()=>this.setState({isShow_add: false})}
          addSecondSceneItem={
            this.addSecondSceneItem.bind(this)
          }
        />
        <EditorSecondScene
          isShow={this.state.isShow_editor}
          hide={()=>this.setState({isShow_editor: false})}
          editorSecondSceneItem={this.editorSecondSceneItem.bind(this)}
          editorData={(secondSceneList.list||[])[this.state.editorData_id]}
        />
        <h1>语料管理>{name} {ename}</h1>
        <h2>{name} {ename}</h2>
        <table className='scene-manage-list'>
          <thead>
            <tr>
              <td>场景</td>
              <td>场景英文</td>
              <td>场景描述</td>
              <td>状态</td>
              <td>操作</td>
            </tr>
          </thead>
          {
            (secondSceneList.list||[]).map((val, i)=> {
              return (
                <tbody key={i}>
                  <tr>
                    <td onClick={this.toggleDetail.bind(this)}>{val.name}</td>
                    <td>{val.ename}</td>
                    <td>{val.desc}</td>
                    <td>{val.status? '启用':'弃用'}</td>
                    <td>
                      <p
                        onClick={()=> this.setState({isShow_editor: true, f_scene_id: state, editorData_id: i})}
                        >编辑</p>
                      <p
                        onClick={this.toggleSecondSceneStatus.bind(this,val.s_scene_id, val.status)}
                        >{!val.status? '启用':'弃用'}
                      </p>
                      <p className='del'
                        onClick={this.handleDelSecondSceneItem.bind(this,val.s_scene_id)}
                        >删除</p>
                    </td>
                  </tr>
                  <tr className='hide'>
                    <td colSpan='5' className='scene-manage-detail'>
                      <span>二级场景id</span>{val.s_scene_id}
                    </td>
                  </tr>
                </tbody>
              )
            })
          }
        </table>
        <div className='voice-manage-add'>
          <p><Link to='/voice/voiceSystem/sceneManage' style={{color: 'white'}}>返回上级</Link></p>
          <p
            onClick={()=> this.setState({isShow_add: true, f_scene_id: state})}
            >增加二级场景</p>
          <span
            onClick={this.showSceneTree.bind(this)}
            >查看场景树 ></span>
        </div>
        <PageCtr
          buttons='10'
          total={secondSceneList.pages}
          changePage={page => this.props.dispatch(getSecondSceneList({page,f_scene_id:this.props.location.state }))}
          />
      </div>
    )
  }
  componentDidMount(){
    const {dispatch, location} = this.props
    const f_scene_id = location.state
    dispatch((getSecondSceneList({f_scene_id})))
  }
  getSecondSceneList(params= null){
    const f_scene_id = this.props.location.state
    const {page} = this.state
    params= Object.assign({f_scene_id,page}, params)
    this.props.dispatch(getSecondSceneList(params))
  }
  addSecondSceneItem(params){
    this.props.dispatch(addSecondSceneItem(params))
    setTimeout(()=>this.getSecondSceneList(), 150)
  }
  editorSecondSceneItem(params){
    this.props.dispatch(editorSecondSceneItem(params))
    setTimeout(()=>this.getSecondSceneList(), 150)
  }
  toggleSecondSceneStatus(s_scene_id,status){
    status= status? 0 : 1
    this.props.dispatch(toggleSecondSceneStatus({s_scene_id, status}))
    setTimeout(()=>this.getSecondSceneList(), 150)
  }
  delSecondSceneItem(s_scene_id){
    this.props.dispatch(delSecondSceneItem({s_scene_id}))
    setTimeout(()=>this.getSecondSceneList(), 150)
  }
  handleDelSecondSceneItem(s_scene_id){
    this.props.dispatch(setVisibility2({secondConfirm:{show: true, msg:'确定要删除该场景吗？',callback:this.delSecondSceneItem.bind(this,s_scene_id)}}))
  }
  toggleDetail(e){
    const className= e.target.parentNode.nextSibling.className
    className ? e.target.parentNode.nextSibling.className='' :
     e.target.parentNode.nextSibling.className='hide'
  }
  showSceneTree(){
    this.props.dispatch(setVisibility({name: 'SCENE_TREE', show: true}))
  }

}
function mapStateToProps({voiceData}){
  return {
    secondSceneList: voiceData.secondSceneList
  }
}
export default connect(mapStateToProps)(SecondScene)
