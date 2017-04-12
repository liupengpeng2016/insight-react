import React, {Component} from 'react'
import './addVoice.css'
class AddVoice extends Component{
  render(){
    let {hideAddVoice, toggleAddVoice, questionNum, addMore} = this.props
    return (
      <div className='voice-popup editor-voice'
        style={toggleAddVoice? null:{display:'none'}}
        >
          <div className='editor-voice-info'>
            <h3>
              <span
              onClick={hideAddVoice}
              >×</span>
            </h3>
          <h1
            >新增语料</h1>
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
            </ul>
              {
                (function(){
                  const arr=[]
                  for( let i=0; i<questionNum; i++){
                    const item= (
                      <ul key={i}>
                        <li>
                          <span>答案{i+1}</span>
                          <input type='text' placeholder='请输入问题'/>
                        </li>
                        <li className='voice-input-notice'>
                          <span></span>
                          <ul>
                            <li>
                              <p>更新时间</p>
                              <p>作者</p>
                            </li>
                            <li>
                              <h1>启用</h1>
                              <h1>删除</h1>
                            </li>
                          </ul>
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
                            <option value=''>入园前</option>
                            <option value=''>幼小衔接</option>
                            <option value=''>小学</option>
                            <option value=''>初中</option>
                            <option value=''>成人</option>
                          </select>
                        </li>
                      </ul>
                    )
                    arr.push(item)
                  }
                  return arr
                })()
              }
            <h2 onClick={addMore}>添加更多答案</h2>
            <div className='editor-voice-submit'>
              <p onClick={hideAddVoice}>取消</p>
              <p>保存</p>
            </div>
          </div>
      </div>
    )
  }
}
export default AddVoice
