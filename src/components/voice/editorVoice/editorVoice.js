import React, {Component} from 'react'
import './editorVoice.css'
class EditorVoice extends Component{
  render(){
    return (
      <div className='voice-popup editor-voice'>
          <div className='editor-voice-info'>
            <span>×</span>
            <h1>设备信息查看</h1>
            <ul>
              <li>
                <span>语料库</span>
                <input type='checkbox' id='voice-voice'/>
                <label htmlFor='voice-voice'>通用语聊</label>
                <input type='checkbox' id='voice-small-q'/>
                <label htmlFor='voice-small-q'>小Q语聊</label>
                <input type='checkbox' id='voice-taotao'/>
                <label htmlFor='voice-taotao'>淘淘语聊</label>
              </li>
              <li>
                <span>场景</span>
                <select>
                  <option>请选择场景</option>
                  <option></option>
                </select>
              </li>
              <li>
                <span>答案1</span>
                <input type='text' placeholder='请输入问题'/>
              </li>
              <li>
                <span>权重</span>
                <select>
                  <option value='0'>0</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                </select>
              </li>
              <li>
                <span>年龄段</span>
                <select>
                  <option value='0-3'>0-3</option>
                  <option value='3-6'>3-6</option>
                  <option value='6-9'>6-9</option>
                  <option value='9-12'>9-12</option>
                </select>
              </li>
              <li>
                <span>答案2</span>
                <input type='text' placeholder='请输入问题'/>
              </li>
              <li>
                <span>权重</span>
                <select>
                  <option value='0'>0</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                </select>
              </li>
              <li>
                <span>年龄段</span>
                <select>
                  <option value='0-3'>0-3</option>
                  <option value='3-6'>3-6</option>
                  <option value='6-9'>6-9</option>
                  <option value='9-12'>9-12</option>
                </select>
              </li>
            </ul>
            <h2>添加更多答案</h2>
            <div className='editor-voice-submit'>
              <p>取消</p>
              <p>保存</p>
            </div>
          </div>
      </div>
    )
  }
}
export default EditorVoice
