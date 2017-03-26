import React, {Component} from 'react'
import './addTopic.css'
class AddTopic extends Component{
  render(){
    return (
      <div className='add-media content'>
        <h1>葡萄听听>专题列表>新增专题</h1>
        <h2>新增专题</h2>
        <ul>
          <li>
            <span>选择位置</span>
            <select>
              <option value=''>故事类型</option>
            </select>
          </li>
          <li>
            <span>输入名称</span>
            <input type='text' placeholder='请输入专辑名称'/>
          </li>
          <li>
            <span>专题权重</span>
            <input type='text' placeholder='请输入专题简介'/>
          </li>
          <li>
            <span>权重</span>
            <select>
              <option value=''>0</option>
            </select>
          </li>
          <li>
            <span>状态</span>
              <input type='checkbox' id='banner-show'/>
              <label htmlFor='banner-show'>显示</label>
              <input type='checkbox' id='banner-hide'/>
              <label htmlFor='banner-hide'>隐藏</label>
          </li>
        </ul>
        <p>提交</p>
      </div>
    )
  }
}
export default AddTopic
