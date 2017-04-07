import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editorToyInformation} from '../../../redux/actions.js'
import fileUpload from '../../../fileUpload/fileUpload.js'
class EditorToyInformation extends Component{
  constructor(){
    super()
    this.state={
      name:'',
      file:'',
      desc:''
    }
  }
  render(){
    return (
      <div className='toy-plan'>
      <h1>玩偶设置>编辑玩偶</h1>
      <h2>编辑玩偶信息</h2>
      <ul className='add-item'>
        <li>
          <span>名字</span>
          <input type='text' placeholder='请输入玩偶名字'
            onChange={this.handleName.bind(this)}
            value={this.state.name}
          />
        </li>
        <li>
          <span>描述</span>
          <input type='text' placeholder='请输入描述信息'
            onChange={this.handleDesc.bind(this)}
            value={this.state.desc}
          />
        </li>
        <li className='input-img' style={{paddingTop: 0}}>
          <span style={{float:'left'}}>选择文件</span>
          <input type='file'
            onChange={this.handleFile.bind(this)}
            />
          <h1>选取文件</h1>
          <p>音频格式为mp3或mp4，大小为20m以内。</p>
        </li>
        <li onClick={this.handleSubmit.bind(this)}>
           提交
        </li>
      </ul>
      </div>
    )
  }
  handleName(e){
    this.setState({name:e.target.value})
  }
  handleDesc(e){
    this.setState({desc:e.target.value})
  }
  handleFile(e){
    this.setState({file:e.target.files[0]})
  }
  dispatchEditor(icon){
    const {name, desc} = this.state
    this.props.dispatch(editorToyInformation({
      name,
      desc,
      icon
    }))
  }
  handleSubmit(){
    const {file} = this.state
    fileUpload(file,this.dispatchEditor.bind(this))
  }
}
export default connect()(EditorToyInformation)
