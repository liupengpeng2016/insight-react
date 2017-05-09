import React, {Component} from 'react'
import {addToyAction}  from '../../../redux/actions.js'
import {connect} from 'react-redux'
import {valid, validFile} from '../../../plugs/plugs.js'
import fileUpload from '../../../fileUpload/fileUpload.js'
class AddToyAction extends Component{
  constructor(props){
    super(props)
    this.state={
      action: 'shake',
      content_type:'1',
      content:'',
      file:''
    }
    this.valid= {
      content:{
        notice:'',
        change:false
      },
      file:{
        notice:'',
        change:false
      }
    }
  }
  render(){
    return (
      <div className='toy-plan'>
        <h1>玩偶设置>新增动作内容</h1>
        <h2>新增动作内容</h2>
        <ul className='add-item'>
          <li>
            <span>选择动作</span>
            <select
              onChange={e => this.setState({action: e.target.value})}
              value={this.state.action}
            >
              <option value='shake'>摇一摇</option>
              <option value='pat'>拍一下</option>
              <option value='wakeup'>唤醒</option>
            </select>
          </li>
          <li>
            <span>内容类型</span>
            <select
              onChange={ e=> this.setState({content_type: e.target.value})}
              value={this.state.content_type}
            >
              <option value='1'>文字</option>
              <option value='2'>音频文件</option>
            </select>
          </li>
          <li className='input-img'
            style={this.state.content_type=== '1'? {display:'none'}: null}
          >
            <span>上传歌曲</span>
            <i className='valid' style={!this.valid.file.change? {display: 'none'}: null}>{this.valid.file.notice= validFile(this.state.file,{ name:[/\.mp3$/,/\.m4a$/]})}</i>
            <p>{(this.state.file||{}).name}</p>
            <input type='file'
              onChange={this.handleFile.bind(this)}
            />
            <h1>选择文件</h1>
            <p>音频格式为mp3或m4a。</p>
          </li>
          <li
            style={this.state.content_type=== '2'? {display:'none'}: null}
           >
            <span>文字</span>
            <input type='text' placeholder='请输入文字信息'
              onChange={this.handleContent.bind(this)}
              checked={this.state.content}
            />
            <i className='valid' style={!this.valid.content.change? {display: 'none'}: null}>{this.valid.content.notice= valid(this.state.content,['require'])}</i>
          </li>
          <li onClick={this.handleSubmit.bind(this)}>提交</li>
        </ul>
      </div>
    )
  }
  handleFile(e){
    this.valid.file.change= true
    this.setState({file: e.target.files[0]})
  }
  handleContent(e){
    this.valid.content.change= true
    this.setState({content: e.target.value})
  }
  dispatchEditor(pic){
    const {action, content_type, content} = this.state
    this.props.dispatch(addToyAction({
      action,
      content_type,
      content:pic||content
    }))
  }
  handleSubmit(){
    const {content, file}= this.valid
    if(this.state.content_type=== '1'){
      if(content.notice){
        const keys= Object.keys(this.valid)
        for(let i of keys){
          this.valid[i].change= true
        }
        return this.forceUpdate()
      }
    }else{
      if(file.notice){
        const keys= Object.keys(this.valid)
        for(let i of keys){
          this.valid[i].change= true
        }
        return this.forceUpdate()
      }
    }
    fileUpload(this.state.file,this.dispatchEditor.bind(this))
  }

}
export default connect()(AddToyAction)
