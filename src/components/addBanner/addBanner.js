import React, {Component} from 'react'
import './addBanner.css'
class AddBanner extends Component{
  render(){
    return (
      <div className='add-media content'>
        <h1>葡萄听听>banner列表>新增banner</h1>
        <h2>新增banner</h2>
        <ul>
          <li>
            <span>选择位置</span>
            <select>
              <option value=''>故事类型</option>
            </select>
          </li>
          <li>
            <span>Banner内容</span>
            <input type='checkbox' id='album'/>
            <label htmlFor='album'>
              歌曲专辑
            </label>
            <input type='checkbox' id='url'/>
            <label htmlFor='url'>
              网页URL
            </label>
            <p>
              <span></span>
              <input type='text' placeholder='请输入歌曲专辑/网络URL'/>
            </p>
          </li>
          <li>
            <span>Banner描述</span>
            <input type='text' placeholder='请输入专辑简介'/>
          </li>
          <li>
            <span>权重</span>
            <select>
              <option value='0'>0</option>
            </select>
          </li>
          <li className='input-img'>
            <span>上传图片</span>
            <img alt=''/>
            <input type='file'/>
            <h1>选择文件</h1>
            <p>图片格式为JPG或PNG,大小为2M以内。</p>
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
export default AddBanner
