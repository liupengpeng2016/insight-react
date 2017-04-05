import React, {Component} from 'react'
import './toyPlanItem.css'
class ToyPlanItem extends Component{
  render(){
    return (
      <ul className='toy-plan-item'>
        <li>
          <h1>动作说明</h1>
          <table>
            <tbody>
              <tr>
                <td>动作说明</td>
              </tr>
              <tr><td></td></tr>
            </tbody>
          </table>
          <input type='button' value='编辑信息'/>
        </li>
        <li>
          <h2>语音播放顺序：顺序播放</h2>
          <table>
            <tbody>
              <tr>
                <td>序号</td>
                <td>动作内容</td>
                <td>音频地址</td>
                <td>更新时间</td>
              </tr>
            </tbody>
          </table>
          <input type='button' value='新增动作内容'/>
        </li>
        <li>
          <h1>动作设置</h1>
          <h2>ip个性化人设</h2>
          <span>
            场景
          </span>
          <select>
            <option value='0'>全部场景</option>
          </select>
          <table>
            <tbody>
              <tr>
                <td>序号</td>
                <td>场景</td>
                <td>关键句</td>
                <td>回复句</td>
                <td>操作</td>
              </tr>
            </tbody>
          </table>
          <ul className='toy-operate-buttons'>
            <li>批量删除</li>
            <li>全选</li>
          </ul>
          <p>批量管理</p>
          <input type='button' value='编辑信息'/>
        </li>
        <li>
          <h1>玩偶简介</h1>
          <table>
            <tbody>
              <tr><td>玩偶简介</td></tr>
              <tr><td>图标</td></tr>
              <tr><td>玩偶简介</td></tr>
              <tr><td>功能简介</td></tr>
            </tbody>
          </table>
        </li>
      </ul>
    )
  }
}
export default ToyPlanItem
