import React,{Component} from 'react'
import './editorToyAction.css'
import {connect} from 'react-redux'
import {editorToyAction} from '../../../redux/actions.js'
class EditorToyAction extends Component {
  constructor(){
    super()
    this.state= {
      action: '-1',
      desc:'',
      play_order:'-1'
    }
  }
  render(){
    return (
      <div className='add-toy-action toy-plan'>
        <h1>玩偶设置>编辑动作</h1>
        <h2>编辑动作信息</h2>
        <ul className='add-item'>
          <li>
            <span>选择动作</span>
            <select
              onChange={this.handleAction.bind(this)}
              value={this.state.action}
              >
              <option value='－1'>请选择动作</option>
              <option value='shake'>摇一摇</option>
              <option value='pat'>拍一下</option>
              <option value='wakeup'>唤醒</option>
            </select>
          </li>
          <li>
            <span>动作名称</span>
            <input type='text' placeholder='请输入动作名称'
              />
          </li>
          <li>
            <span>动作描述</span>
            <input type='text' placeholder='请输入动作描述'
              onChange={this.handleDesc.bind(this)}
              value={this.state.desc}
              />
          </li>
          <li>
            <span>播放顺序</span>
            <select
              onChange={this.handlePlay_order.bind(this)}
              value={this.state.play_order}
              >
              <option value='-1'>请选择播放顺序</option>
              <option value='rand'>顺序</option>
              <option value='sequence'>随机</option>
            </select>
          </li>
          <li onClick={this.handleSubmit.bind(this)}>
             提交
          </li>
        </ul>
      </div>
    )
  }
  handleAction(e){
    this.setState({action: e.target.value})
  }
  handleDesc(e){
    this.setState({desc: e.target.value})
  }
  handlePlay_order(e){
    this.setState({desc: e.target.value})
  }
  handleSubmit(){
    const {action, desc, play_order} = this.state
    this.props.dispatch(editorToyAction({
      action,
      desc,
      play_order
    }))
  }
}
export default connect()(EditorToyAction)
