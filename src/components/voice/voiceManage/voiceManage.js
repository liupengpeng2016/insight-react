import React, {Component} from 'react'
import './voiceManage.css'
import EditorVoice from '../editorVoice/editorVoice.js'
import {Link} from 'react-router'
class VoiceManage extends Component{
  render(){
    return (
      <div className='voice-manage'>
        <EditorVoice></EditorVoice>
        <div className='voice-manage-search'>
          <h1>语料列表</h1>
          <ul>
            <li>
              <input type='checkbox' id='common-voice'/>
              <label htmlFor='common-voice'>通用语料</label>
            </li>
            <li>
              <input type='checkbox' id='small-q'/>
              <label htmlFor='small-q'>小Q语料</label>
            </li>
            <li>
              <input type='checkbox' id='taotao'/>
              <label htmlFor='taotao'>淘淘语料</label>
            </li>
            <li>
              <input type='text' placeholder='输入想要搜索的关键词'/>
              <span>关键词</span>
            </li>
          </ul>
        </div>
        <div className='voice-manage-scope'>
          <span>场景</span>
          <select>
            <option>请选择</option>
          </select>
          <span>权重</span>
          <select>
            <option value=''>全部</option>
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
          <span>作者</span>
          <select>
            <option>全部</option>
          </select>
          <span>年龄段</span>
          <select>
            <option value=''>请选择</option>
            <option value=''>入园前</option>
            <option value=''>幼小衔接</option>
            <option value=''>小学</option>
            <option value=''>初中</option>
            <option value=''>成人</option>
          </select>
        </div>
        <table className='voice-manage-list'>
          <tbody>
            <tr>
              <td>编号</td>
              <td>场景</td>
              <td>问题</td>
              <td>关键词</td>
              <td>答案</td>
              <td>答案属性</td>
              <td>问答对状态</td>
              <td>操作</td>
            </tr>
          </tbody>
        </table>
        <ul className='voice-manage-buttons'>
          <li>导出语料</li>
          <li>批量处理</li>
        </ul>
        <div className='voice-manage-add'>
          <p><Link to='voice/addVoice'>新增语料</Link></p>
          <p><Link to='voice/addSituation'>新增场景语料</Link></p>
          <span>查看场景树 ></span>
        </div>
      </div>
    )
  }
}
export default VoiceManage
