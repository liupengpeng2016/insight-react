import React, {Component} from 'react'
import './header.css'
class Header extends Component{
  render(){
    return (
      <div className='header'>
        <div className="container">
            <span>退出</span>
            <p>userName</p>
            <p>普通管理员</p>
        </div>
      </div>
    )
  }
}
export default Header
