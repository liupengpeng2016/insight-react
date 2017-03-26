import React, {Component} from 'react'
import './addTo.css'
class AddTo extends Component{
  render(){
    return (
      <div className='add-to'>
        <div className='add-to-panel'>
          <span></span>
          <h1>添加到</h1>
          <p>
            <span>专辑列表</span>
            <select>
              <option value=''>请下拉选择专辑</option>
            </select>
          </p>
          <p>
            <span>专辑ID</span>
            <input type='text' placeholder='请输入描述信息'/>
          </p>
          <h2>确定</h2>
        </div>
      </div>
    )
  }
}
export default AddTo
