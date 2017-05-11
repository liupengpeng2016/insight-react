import React,{Component} from 'react'
import './editorToyAction.css'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {editorToyAction} from '../../../redux/actions.js'
import {valid} from '../../../plugs/plugs.js'
class EditorToyAction extends Component {
  constructor(){
    super()
    this.state= {
      action: '',
      desc:'',
      play_order:'',
      name:''
    }
    this.valid={
      desc:{
        change: false,
        notice: ''
      },
      name:{
        change: false,
        notice: ''
      }
    }
  }
  render(){
    return (
      <div className='add-toy-action toy-plan'>
        <h1>
          <Link to='/toy/toyPlan/shake' className='media-title'>玩偶设置></Link>
          编辑动作
        </h1>
        <h2>编辑动作信息</h2>
        <ul className='add-item'>
          <li>
            <span>选择动作</span>
            <select
              onChange={this.handleAction.bind(this)}
              value={this.state.action}
              >
              <option value='shake'>摇一摇</option>
              <option value='pat'>拍一下</option>
              <option value='wakeup'>唤醒</option>
            </select>
          </li>
          <li>
            <span>动作名称</span>
            <input type='text' placeholder='请输入动作名称'
              onChange={this.handleName.bind(this)}
              value={this.state.name}
            />
            <i className='valid' style={!this.valid.name.change? {display: 'none'}: null}>{this.valid.name.notice= valid(this.state.name,['require'])}</i>
          </li>
          <li>
            <span>动作描述</span>
            <input type='text' placeholder='请输入动作描述'
              onChange={this.handleDesc.bind(this)}
              value={this.state.desc}
            />
          <i className='valid' style={!this.valid.desc.change? {display: 'none'}: null}>{this.valid.desc.notice= valid(this.state.desc,['require'])}</i>
          </li>
          <li>
            <span>播放顺序</span>
            <select
              onChange={this.handlePlay_order.bind(this)}
              value={this.state.play_order}
              >
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
  componentDidMount(){
    const action= this.props.location.state
    const {toyPlan}= this.props
    console.log(this.props)
    const {name, desc, play_order}= toyPlan.actions[action]
    this.setState({action, name, desc, play_order})
  }
  handleAction(e){
    this.setState({action: e.target.value})
  }
  handleDesc(e){
    this.setState({desc: e.target.value})
  }
  handleName(e){
    this.setState({name: e.target.value})
  }
  handlePlay_order(e){
    this.setState({play_order: e.target.value})
  }
  handleSubmit(){
    if(this.valid.name.notice||this.valid.desc.notice){
      const keys=Object.keys(this.valid)
      for(let i of keys){
        this.valid[i].change= true
      }
      return this.forceUpdate()
    }
    const {action, desc, play_order, name} = this.state
    this.props.dispatch(editorToyAction({
      action,
      desc,
      name,
      play_order
    }))
  }
}
function mapStateToProps ({toyData}){
  return {
    toyPlan: toyData.toyPlan
  }
}
export default connect(mapStateToProps)(EditorToyAction)
