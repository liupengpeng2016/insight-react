import React, { Component } from 'react'
import './otherPlatform.css'
import {connect} from 'react-redux'
class OtherPlatform extends Component{
  render(){
    return (
        <div className='otherPlatform'>
          <h1>歌曲列表</h1>
          <p>
            <span>歌曲类别</span>
            <select>
              <option value=''>请选择类型</option>
            </select>
          </p>
          <p>
            <span>歌曲名称</span>
            <input type='text' placeholder='请输入名称'/>
          </p>
          <p>
            <span>歌曲标签</span>
            <input type='text' placeholder='输入标签，多个用竖线分隔'/>
          </p>
          <p>
            <span>歌曲描述</span>
            <input type='text' placeholder='请输入内容描述'/>
          </p>
          <p>
            <span>作者名称</span>
            <input type='text' placeholder='请输入作者姓名'/>
          </p>
          <p>
            <span>权重</span>
            <input type='text' placeholder='0'/>
          </p>
          <p>
            <span>歌曲播放链接</span>
            <input type='text' placeholder='输入歌曲云端链接'/>
          </p>
          <p>
            <span>所属专辑</span>
            <select>
              <option value=''>选择专辑</option>
            </select>
          </p>
          <p>
            <span>所属专辑ID</span>
            <input type='text' placeholder='请输入专辑所属ID'/>
          </p>
          <input type='button' value='提交'/>
          <h2>
            自行上传的歌曲请确保拥有所上传歌曲的版权，出现人和版权问题，非葡萄科技人员，概不负责
          </h2>
        </div>
    )
  }
}
export default connect()(OtherPlatform)
