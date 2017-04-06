import React, {Component} from 'react'
class EditorPlan extends Component{
  render(){
    return (
      <div className='habit-plan'>
        <h1>习惯养成>编辑计划</h1>
        <h2>编辑计划信息</h2>
        <ul className='add-item'>
          <li>
            <span>选择动作</span>
            <select>
              <option value=''>请选择动作</option>
              <option value='shake'>摇一摇</option>
              <option value='pat'>拍一下</option>
              <option value='wakeup'>唤醒</option>
            </select>
          </li>
          <li>
            <span>动作名称</span>
            <input type='text' placeholder='请输入动作名称'/>
          </li>
          <li>
            <span>动作描述</span>
            <input type='text' placeholder='请输入动作描述'/>
          </li>
          <li>
            <span>播放顺序</span>
            <select>
              <option value=''>请选择播放顺序</option>
              <option value='rand'>顺序</option>
              <option value='sequence'>随机</option>
            </select>
          </li>
          <li>
             提交
          </li>
        </ul>
      </div>
    )
  }
}
export default EditorPlan
