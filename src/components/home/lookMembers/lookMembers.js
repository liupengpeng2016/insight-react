import React, {Component} from 'react'
import './lookMembers.css'
class LookMembers extends Component{
  render(){
    const {isShow, handleClick, userInfo} = this.props
    return (
      <div className='popup' style={!isShow? {display: 'none'}: null}>
          <div>
            <span onClick={handleClick}>×</span>
            <h1>微信用户查看</h1>
            <img src='' alt=''/>
            <p><span>昵称</span>{userInfo.nick}</p>
            <p><span>性别</span>{parseInt(userInfo.gender, 10) === 1 ? '男':'女'}</p>
            <p><span>角色</span>{`${userInfo.role}${userInfo.is_admin? '(系统管理员)' : ''}`}</p>
          </div>
      </div>
    )
  }
}
export default LookMembers
