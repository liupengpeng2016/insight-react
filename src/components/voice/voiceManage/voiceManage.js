import React, {Component} from 'react'
import './voiceManage.css'
import EditorVoice from '../editorVoice/editorVoice.js'
import AddVoice from '../addVoice/addVoice.js'
import {getVoiceList, editorVoiceItem, delVoiceItem, toggleVoiceStatus} from '../../../redux/actions.js'
import {connect} from 'react-redux'
import PageCtr from '../../media/pageCtr/pageCtr.js'
class VoiceManage extends Component{
  constructor(){
    super()
    this.state={
      toggleEditorVoice: false,
      toggleAddVoice: false,
      questionNum_add: 2,
      questionNum_editor: 2,
      page:1,
      buttonMode:1,
      editorData:{}
    }
    this.spreadDetail= this.spreadDetail.bind(this)
  }
  render(){
    const {voiceList} = this.props
    return (
      <div className='voice-manage'>
        <EditorVoice
          toggleEditorVoice={this.state.toggleEditorVoice}
          hideEditorVoice={this.hideEditorVoice.bind(this)}
          editorSubmit={this.state.editorSubmit}
          editorData={this.state.editorData}
          ></EditorVoice>
        <AddVoice
          toggleAddVoice={this.state.toggleAddVoice}
          hideAddVoice={this.hideAddVoice.bind(this)}
          questionNum={this.state.questionNum_add}
          addMore={()=>{this.setState({questionNum_add: this.state.questionNum_add+1})}}
          ></AddVoice>
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
          <thead>
            <tr>
              <td>场景</td>
              <td>问题</td>
              <td>关键词</td>
              <td>答案</td>
              <td>答案属性</td>
              <td>问答对状态</td>
              <td>操作</td>
            </tr>
          </thead>
            {
              (voiceList.list||[]).map((val,i)=>{
                return (
                  <tbody  key={i}>
                    <tr>
                      <td className='spread-array-shrink'
                        onClick={this.spreadDetail}
                        >{val.s_scene}</td>
                      <td>
                        {val.questions.map((val,i)=>{
                          return <p key={i}>{val.question}</p>
                        })}
                      </td>
                      <td>
                        {val.questions.map((val,i)=>{
                          return <p key={i}>{val.keywords}</p>
                        })}
                      </td>
                      <td>
                        {val.answers.map((val,i)=>{
                          return <p key={i}>{val.answer}</p>
                        })}
                      </td>
                      <td>
                        {val.answers.map((val,i)=>{
                          return <p key={i}>{`${val.weight}/${val.age}`}</p>
                        })}
                      </td>
                      <td>{val.status? '启用':'弃用'}</td>
                      <td>{
                          this.state.buttonMode? (
                            <ul className='button-mode1'>
                              <li
                                onClick={()=>this.setState({
                                  toggleEditorVoice: true,
                                  editorData:{
                                    group_id: val.group_id,
                                    s_scene_id: val.s_scene_id
                                  }
                                })}
                                >编辑</li>
                              <li onClick={this.toggleVoiceStatus.bind(this, val.group_id, val.status)}>{!val.status? '启用':'弃用'}</li>
                              <li onClick={this.handelDelVoice.bind(this,[val.group_id])}>删除</li>
                            </ul>
                          ):(
                            <input type='checkbox'/>
                          )
                        }
                      </td>
                    </tr>
                    <tr className='hide'>
                      <td colSpan='7' className='voice-manage-list-detail'>
                        <p><span>语料库</span>{val.corpus_lib_name}</p>
                        <p><span>语料id</span>{val.group_id}</p>
                      </td>
                    </tr>
                  </tbody>
                )
              })
            }
        </table>
        <ul className='voice-manage-buttons'>
          <li>导出语料</li>
          <li>批量处理</li>
        </ul>
        <div className='voice-manage-add'>
          <p
            onClick={()=> this.setState({toggleAddVoice: true, questionNum_add: 2})}
            >新增语料</p>
          <p>新增场景语料</p>
          <span>查看场景树 ></span>
        </div>
        <PageCtr total={voiceList.pages} buttons='10' changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
  hideEditorVoice(){
    this.setState({toggleEditorVoice: false})
  }
  hideAddVoice(){
    this.setState({toggleAddVoice: false})
  }
  changePage(page){
    this.setState({page})
  }
  spreadDetail(e){
    const className= e.target.parentNode.nextSibling.className
    if(className === 'hide'){
      e.target.parentNode.nextSibling.className=''
      e.target.className='spread-array-spread'
    }else{
      e.target.parentNode.nextSibling.className='hide'
      e.target.className='spread-array-shrink'
    }
  }
  toggleVoiceStatus(group_id, status){
    const {dispatch} = this.props
    status= status ? 0 : 1
    dispatch(toggleVoiceStatus({group_id, status}))
  }
  handelDelVoice(group_ids){
    const {dispatch} = this.props
    dispatch(delVoiceItem({group_ids}))

  }
//初始化数据
  componentDidMount(){
    const {dispatch} = this.props
    dispatch(getVoiceList())
  }
  editorSubmit(params){
    const {dispatch} = this.props
    dispatch(editorVoiceItem(params))
  }
}
function mapStateToProps(state){
  return {
    voiceList: state.voiceData.voiceList
  }
}
export default connect(mapStateToProps)(VoiceManage)
