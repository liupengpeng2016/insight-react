import React, {Component} from 'react'
import './ctrButtons.css'
import { Link } from 'react-router'
class CtrButtons extends Component{
  render(){
    const {mode, path, del, checked} = this.props
    switch(mode){
      case '1':
      return (
        <ul className='ctr-buttons'>
          <li><Link to={path}>编辑</Link></li>
          <li onClick={del}>删除</li>
        </ul>
      )
      case '2':
      return(
        <ul className='ctr-buttons'>
          <li><Link to={path}>编辑</Link></li>
          <li>
            <input type='checkbox' checked={checked}
              onChange={this.handleChange.bind(this)}
            />
          </li>
        </ul>
      )
      default: return null
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.activeId !== this.props.activeId){
      setTimeout(()=>{
        this.props.change(false)
      },500)
    }
  }
  componentDidMount(nextProps){
    this.props.change(false)
  }
  handleChange(e){
    this.props.change(e.target.checked)
  }
}
export default CtrButtons
