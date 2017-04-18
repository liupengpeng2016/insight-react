import React, {Component} from 'react'
class EditorSecondScene extends Component {
  constructor(){
    super()
    this.state={
      name:'',
      desc:'',
      ename:''
    }
  }
  render(){
    const {isShow, hide}= this.props
    return (
      <div className='editor-scene'
        style={isShow ? null: {display:'none'}}
      >
        <div className='editor-scene-data'>
          <h1>编辑二级场景<span onClick={hide}>×</span></h1>
          <ul>
            <li>
              <span>场景名</span>
              <input type='text' placeholder='请输入场景名称'
                onChange={this.handleName.bind(this)}
                value={this.state.name}
              />
              <p className='editor-scene-notice'></p>
            </li>
            <li>
              <span>场景英文</span>
              <input type='text' placeholder='请输入场景英文名称'
                onChange={this.handleEname.bind(this)}
                value={this.state.ename}
              />
              <p className='editor-scene-notice'>场景英文(唯一不可变) (命名示例S_RULE)</p>
            </li>
            <li>
              <span>场景描述</span>
              <input type='text' placeholder='请输入描述信息'
                onChange={this.handleDesc.bind(this)}
                value={this.state.desc}
              />
              <p className='editor-scene-notice'></p>
            </li>
          </ul>
          <p onClick={this.handleSubmit.bind(this)}>保存</p>
        </div>
      </div>
    )
  }
  handleName(e){
    this.setState({name: e.target.value})
  }
  handleEname(e){
    this.setState({ename: e.target.value})
  }
  handleDesc(e){
    this.setState({desc: e.target.value})
  }
  handleSubmit(){
    const {f_scene_id, editorSecondSceneItem} = this.props
    console.log(this.props)
    const {name, desc, ename} = this.state
    const params= {
      name,
      ename,
      desc,
      f_scene_id
    }
    editorSecondSceneItem(params)
  }
}
export default EditorSecondScene
