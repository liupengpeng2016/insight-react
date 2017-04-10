import React, {Component} from 'react'
import './lookMembers.css'
class LookMembers extends Component{
  render(){
    const {isShow, handleClick} = this.props
    return (
      <div className='look-members' style={!isShow? {display: 'none'}: null}>
          <div>
            <span onClick={handleClick}>×</span>
            <h1>微信用户查看</h1>
            <img src='' alt=''/>
            <p><span>昵称</span></p>
            <p><span>性别</span></p>
            <p><span>角色</span></p>
          </div>
      </div>
    )
  }
}
export default LookMembers
