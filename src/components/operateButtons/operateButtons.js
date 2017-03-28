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
    const {mode, editorTo, handleDel, handleStatus, handleAdd, status} = this.props
    switch(parseInt(mode)){
      case 1:
      return (
        <ul className='operate-buttons'>
          <li ><Link to={editorTo} style={{color:'#76cbe5'}}>编辑</Link></li>
          <li onClick={handleDel} style={{color:'#fe6434'}}>删除</li>
          <li onClick={handleStatus} style={{color:'#50ca71'}}>
            {parseInt(status)===1?<span style={{color:'#aaa'}}>下架</span>:<span>上架</span>}
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
              onChange={this.handleChecked.bind(this)}
              checked={this.state.checked}/>
          </li>
        </ul>
      )
      case 3:
      return (
        <ul className='operate-buttons'>
          <li ><Link to={editorTo} style={{color:'#76cbe5'}}>编辑</Link></li>
          <li onClick={handleDel} style={{color:'#fe6434'}}>删除</li>
          <li onClick={handleStatus} style={{color:'#50ca71'}}>
            {parseInt(status)===1?<span style={{color:'#aaa'}}>下架</span>:<span>上架</span>}
          </li>
        </ul>
      )
    }
  }
  handleChecked(e){
    this.setState({checked:e.target.checked})
  }
}
export default OperateButtons
