import React, {Component} from 'react'
import './lookMembers.css'
class LookMembers extends Component{
  render(){
    const {isShow, handleClick, memberData} = this.props
    return (
      <div className='popup' style={!isShow? {display: 'none'}: null}>
          <div className='member-info'>
            <span onClick={handleClick}>×</span>
            <h1>微信用户查看</h1>
            <img src={memberData.avatar} alt=''/>
            <p><span>昵称</span>{memberData.nick}</p>
            <p><span>性别</span>{parseInt(memberData.gender, 10) === 1 ? '男':'女'}</p>
            <p><span>角色</span>{`${memberData.role}${memberData.is_admin? '(系统管理员)' : ''}`}</p>
          </div>
      </div>
    )
  }
}
export default LookMembers
