import React, {Component} from 'react'
import './operateButtons.css'
import {Link} from 'react-router'
class OperateButtons extends Component{
  constructor(props){
    super(props)
    this.state={
      checked:false
    }
  }
  render(){
    const {mode, editorTo, handleDel, handleStatus, handleAdd, status, checked} = this.props
    switch(parseInt(mode, 10)){
      case 1:
      return (
        <ul className='operate-buttons'>
          <li ><Link to={editorTo} style={{color:'#76cbe5'}}>编辑</Link></li>
          <li onClick={handleDel} style={{color:'#fe6434'}}>删除</li>
          <li onClick={handleStatus} style={{color:'#50ca71'}}>
            {parseInt(status, 10)===1?<span style={{color:'#aaa'}}>下架</span>:<span>上架</span>}
          </li>
          <li onClick={handleAdd} style={{color:'#76cbe5'}}>添加</li>
        </ul>
      )
      case 2:
      return (
        <ul className='operate-buttons'>
          <li ><Link to={editorTo} style={{color:'#76cbe5'}}>编辑</Link></li>
          <li >
            <input type='checkbox'
              onChange={this.handleChange.bind(this)}
              checked={checked||this.state.checked}
              />
          </li>
        </ul>
      )
      case 3:
      return (
        <ul className='operate-buttons'>
          <li ><Link to={editorTo} style={{color:'#76cbe5'}}>编辑</Link></li>
          <li onClick={handleDel} style={{color:'#fe6434'}}>删除</li>
          <li onClick={handleStatus} style={{color:'#50ca71'}}>
            {parseInt(status, 10)===1?<span style={{color:'#aaa'}}>下架</span>:<span>上架</span>}
          </li>
        </ul>
      )
      default: return
    }
  }
  handleChange(e){
    this.setState({checked:e.target.checked})
    this.props.toggleChecked(e.target.checked)
  }
  componentDidMount(){
      this.props.toggleChecked(this.state.checked)
  }
}
export default OperateButtons
