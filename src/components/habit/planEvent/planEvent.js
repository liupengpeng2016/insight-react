import React, {Component} from 'react'
import './planEvent.css'
class PlanEvent extends Component {
  render(){
    const {planEvent} = this.props
    return (
      <div className='sleep-plan-list'>
        <h1>睡眠习惯养成计划</h1>
        <table>
          <tbody>
            <tr>
              <td>序号</td>
              <td>图标</td>
              <td>事件名称</td>
              <td>音乐</td>
              <td>玩偶语音</td>
              <td>是否打开</td>
              <td>提醒时间</td>
              <td>权重</td>
              <td>操作</td>
            </tr>
            {
              (planEvent || []).map((val,i)=>{
              return (
                <tr key={i}>
                  <td>{val.id}</td>
                  <td><img src={val.icon} alt=''/></td>
                  <td>{val.name}</td>
                  <td>{val.voice_name}</td>
                  <td><voice src={val.voice_url}></voice></td>
                  <td>{val.status === 1 ? '是' : '否'}</td>
                  <td>{val.time}</td>
                  <td>{val.sort}</td>
                  <td>操作</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        <div className='habit-control-buttons'>
          <ul>
            <li>全选</li>
            <li>批量删除</li>
            <li>批量上架</li>
            <li>批量下架</li>
          </ul>
          <h1>批量管理</h1>
          <h2>新增提醒</h2>
        </div>
      </div>
    )
  }
}
export default PlanEvent
