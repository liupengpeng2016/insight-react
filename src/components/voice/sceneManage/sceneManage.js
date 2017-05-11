import React, {Component} from 'react'
import './sceneManage.css'
import {
  getFirstSceneList,setVisibility,
  toggleFirstSceneStatus, delFirstSceneItem,
  editorFirstSceneItem, addFirstSceneItem,
  setVisibility2, getAllScene
} from '../../../redux/actions.js'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import EditorScene from '../editorScene/editorScene.js'
import AddScene from '../addScene/addScene.js'
import PageCtr from '../../media/pageCtr/pageCtr.js'
class SceneManage extends Component{
  constructor(){
    super()
    this.state= {
      page: 1,
      isShow_editor: false,
      sceneData_id:'',
      isShow_add: false
    }
  }
  render(){
    const {firstSceneList} = this.props
    return (
      <div className='scene-manage'>
        <EditorScene
          isShow={this.state.isShow_editor}
          hide={()=>{this.setState({isShow_editor: false})}}
          editorSubmit={this.editorSubmit.bind(this)}
          sceneData={(firstSceneList.list||[])[this.state.sceneData_id]}
        />
        <AddScene
          isShow={this.state.isShow_add}
          hide={()=>{this.setState({isShow_add: false})}}
          addSubmit={this.addSubmit.bind(this)}
        />
        <h1>场景列表</h1>
        <table className='scene-manage-list'>
          <thead>
            <tr>
              <td>场景</td>
              <td>场景英文</td>
              <td>场景描述</td>
              {/*<td>状态</td>*/}
              <td>操作</td>
            </tr>
          </thead>
          {
            (firstSceneList.list||[]).map((val, i)=> {
              return (
                <tbody key={i}>
                  <tr>
                    <td onClick={this.toggleDetail.bind(this)}>{val.name}</td>
                    <td>{val.ename}</td>
                    <td>{val.desc}</td>
                    {/*<td>{val.status === 1 ? '启用': '弃用'}</td>*/}
                    <td>
                      <p
                        onClick={this.handleEditor.bind(this,val.f_scene_id, i)}
                      >编辑</p>
                    {/*<p
                        onClick={this.toggleFirstSceneStatus.bind(this, val.f_scene_id, val.status)}
                      >{val.status === 1? '弃用':  '启用'}</p>*/}
                      <p className='del'
                        onClick={this.handleDelFirstSceneItem.bind(this,val.f_scene_id)}
                      >删除</p>
                    <p><Link to={{
                        pathname: '/voice/secondScene',
                        state:val.f_scene_id,
                        query:{name: val.name, ename: val.ename}
                      }} style={{color:'#5cc1df'}}>查看下级</Link></p>
                    </td>
                  </tr>
                  <tr className='hide'>
                    <td colSpan='5' className='scene-manage-detail'>
                      <span>一级场景id: </span>{val.f_scene_id}
                    </td>
                  </tr>
                </tbody>
              )
            })
          }
        </table>
        <div className='scene-manage-button'>
          <p onClick={()=>this.setState({isShow_add: true})}>增加一级场景</p>
          <span
            onClick={this.showSceneTree.bind(this)}
            >查看场景树 ></span>
        </div>
        <PageCtr
          buttons='10'
          total={firstSceneList.pages}
          changePage={this.changePage.bind(this)}
        />
      </div>
      )
  }
  componentDidMount(){
    this.getFirstSceneList()
  }
  getFirstSceneList(){
    const {dispatch} = this.props
    dispatch(getFirstSceneList({page: this.state.page}))
  }
  changePage(page){
    this.setState({page})
    this.props.dispatch(getFirstSceneList({page}))
  }
  toggleFirstSceneStatus(f_scene_id, status){
    const {dispatch} = this.props
    status= status? 0 : 1
    dispatch(toggleFirstSceneStatus({f_scene_id, status}, ()=> this.getFirstSceneList()))
  }
  toggleDetail(e){
    const className= e.target.parentNode.nextSibling.className
    className ? e.target.parentNode.nextSibling.className='' :
     e.target.parentNode.nextSibling.className='hide'
  }
  delFirstSceneItem(f_scene_id){
    this.props.dispatch(delFirstSceneItem({f_scene_id}, ()=> this.getFirstSceneList()))
  }
  handleDelFirstSceneItem(f_scene_id){
    this.props.dispatch(setVisibility2({secondConfirm:{show: true, msg:'确定要删除该场景吗？',callback:this.delFirstSceneItem.bind(this,f_scene_id)}}))
  }
  handleEditor(f_scene_id, i){
    this.setState({f_scene_id, sceneData_id: i,isShow_editor:true})
  }
  editorSubmit(params){
    this.props.dispatch(editorFirstSceneItem(params, ()=> this.getFirstSceneList()))
  }
  addSubmit(params){
    this.props.dispatch(addFirstSceneItem(params,()=> this.getFirstSceneList()))
  }
  showSceneTree(){
    const {dispatch}= this.props
    dispatch(getAllScene())
    dispatch(setVisibility({name: 'SCENE_TREE', show: true}))
  }
}

function mapStateToProps({voiceData}){
  return {
    firstSceneList: voiceData.firstSceneList
  }
}
export default connect(mapStateToProps)(SceneManage)
