import React, {Component}  from 'react'
import './addToyAction.css'
import {addToyAction}  from '../../../redux/actions.js'
import {connect} from 'react-redux'
class AddToyAction extends Component {
  constructor(props){
    super(props)
    this.state={
      action: '-1',
      typeWord: true,
      typeFile: false,
      content:''
    }
  }
  render(){
    return (
      <div className='add-toy-action toy-plan'>
        <h1>玩偶设置>添加动作</h1>
        <h2>设置动作信息</h2>
        <ul className='add-item'>
          <li>
            <span>选择动作</span>
            <select
              onChange={this.handleAction.bind(this)}
              value={this.state.action}
              >
              <option value='-1'>请选择动作</option>
              <option value='shake'>摇一摇</option>
              <option value='pat'>拍一下</option>
              <option value='wakeup'>唤醒</option>
            </select>
          </li>
          <li>
            <span>内容类型</span>
            <input type='checkbox' id='action-words'
              onChange={this.handleTypeWord.bind(this)}
              checked={this.state.typeWord}
              />
            <label htmlFor='action-words'>文字</label>
            <input type='checkbox' id='action-audio'
              onChange={this.handleTypeFile.bind(this)}
              checked={this.state.typeFile}
              />
            <label htmlFor='action-audio'>音频文件</label>
          </li>
          <li className='input-img'>
            <span></span>
            <input type='text' placeholder='请输入文字信息'
              onChange={this.handleContent.bind(this)}
              value={this.state.content}
              />
          </li>
          <li className='input-img' style={{paddingTop: 0}}>
            <span style={{float:'left'}}></span>
            <input type='file'
              onChange={this.handleFile.bind(this)}
              />
            <h1>选取文件</h1>
            <p>音频格式为mp3或mp4，大小为20m以内。</p>
          </li>
          <li
            onClick={this.handleSubmit.bind(this)}
            >
             提交
          </li>
        </ul>
      </div>
    )
  }
  handleAction(e){
    this.setState({action: e.target.value})
  }
  handleTypeWord(e){
    this.setState({typeFile: !e.target.checked,typeWord: e.target.checked})
  }
  handleTypeFile(e){
    this.setState({typeFile: e.target.checked,typeWord: !e.target.checked})
  }
  handleContent(e){
    this.setState({content: e.target.value})
  }
  handleFile(){

  }
  handleSubmit(){
    const {action, typeWord, content} = this.state
    this.props.dispatch(addToyAction({
      action,
      content,
      contentType: typeWord? '1' : '2'
    }))
  }

}
export default connect()(AddToyAction)
