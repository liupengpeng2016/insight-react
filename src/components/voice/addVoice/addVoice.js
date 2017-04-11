import React, {Component} from 'react'
class AddVoice extends Component{
  render(){
    return (
      <div className='voice-popup '>
          <div>
            <span>×</span>
            <h1>设备信息查看</h1>
            <ul>
              <li><span>语料库</span></li>
              <li><span>场景</span></li>
              <li><span>答案1</span></li>
              <li><span>权重</span></li>
              <li><span>年龄段</span></li>
              <li><span>答案2</span></li>
              <li><span>权重</span></li>
              <li><span>年龄段</span></li>
            </ul>
            <h1>添加更多答案</h1>
            <div>
              <p>取消</p>
              <p>保存</p>
            </div>
          </div>
      </div>
    )
  }
}
export default AddVoice
