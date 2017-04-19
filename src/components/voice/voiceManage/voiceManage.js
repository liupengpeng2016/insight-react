import React, {Component} from 'react'
import './voiceManage.css'
import EditorVoice from '../editorVoice/editorVoice.js'
import AddVoice from '../addVoice/addVoice.js'
import {
  getVoiceList, editorVoiceItem,
  delVoiceItem, delVoiceAnswer,
  delVoiceQuestion, toggleVoiceStatus,
  getCorpusList, addVoiceItem,
  setVisibility
} from '../../../redux/actions.js'
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
      editorData:1,
      checkobx:{},
      is_scene_corpus: 0
    }
    this.spreadDetail= this.spreadDetail.bind(this)
  }
  render(){
    const {voiceList, corpusList} = this.props
    return (
      <div className='voice-manage'>
        <EditorVoice
          toggleEditorVoice={this.state.toggleEditorVoice}
          hideEditorVoice={this.hideEditorVoice.bind(this)}
          editorSubmit={this.editorSubmit.bind(this)}
          editorData={(voiceList.list||[])[this.state.editorData]}
          delVoiceAnswer={this.delVoiceAnswer.bind(this)}
          delVoiceQuestion={this.delVoiceQuestion.bind(this)}
          ></EditorVoice>
        <AddVoice
          toggleAddVoice={this.state.toggleAddVoice}
          hideAddVoice={this.hideAddVoice.bind(this)}
          is_scene_corpus={this.state.is_scene_corpus}
          corpusList={corpusList}
          addSubmit={this.addSubmit.bind(this)}
          ></AddVoice>
        <div className='voice-manage-search'>
          <h1>语料列表</h1>
          <ul>
            {
              corpusList.map((val, i)=> {
                return (
                  <li key={i}>
                    <input type='checkbox' id={`voiceManage${i}`}/>
                    <label htmlFor={`voiceManage${i}`}>{val.name}</label>
                  </li>
                )
              })
            }
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
                                onClick={this.handleEditor.bind(this, i)}
                                >编辑</li>
                              <li onClick={this.toggleVoiceStatus.bind(this, [val.group_id], val.status)}>{!val.status? '启用':'弃用'}</li>
                              <li className='del'
                                onClick={this.handelDelVoice.bind(this,[val.group_id])}>删除</li>
                            </ul>
                          ):(
                            <input type='checkbox'
                              onChange={this.handleChecked.bind(this, val.group_id)}
                              checked={this.state.checkbox[val.group_id]}
                              />
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
        <ul className='voice-manage-buttons'
          style={this.state.buttonMode? null : {display:'none'}}
          >
          <li>导出语料</li>
          <li
            onClick={()=> this.setState({buttonMode: 0})}
            >批量处理</li>
        </ul>
        <ul className='voice-manage-buttons'
          style={!this.state.buttonMode? null : {display:'none'}}
          >
          <li onClick={this.delAll.bind(this)}>批量删除</li>
          <li onClick={this.offAll.bind(this)}>批量弃用</li>
          <li onClick={this.onAll.bind(this)}>批量启用</li>
          <li onClick={this.chooseAll.bind(this)}>全选</li>
        </ul>
        <div className='voice-manage-add'>
          <p
            onClick={()=> this.setState({toggleAddVoice: true, is_scene_corpus: 0})}
            >新增语料</p>
          <p
            onClick={()=> this.setState({toggleAddVoice: true, is_scene_corpus: 1})}
            >新增场景语料</p>
          <span
            onClick={this.showSceneTree.bind(this)}
            >查看场景树 ></span>
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
    const {dispatch} = this.props
    dispatch(getVoiceList({page}))
  }
  handleEditor(i){
    this.setState({
      toggleEditorVoice: true,
      editorData: i
    })
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
  toggleVoiceStatus(group_ids, status){
    const {dispatch} = this.props
    status= status ? 0 : 1
    dispatch(toggleVoiceStatus({group_ids, status}))
    setTimeout(()=>{this.props.dispatch(getVoiceList({page: this.state.page}))}, 150)
  }
  handelDelVoice(group_ids){
    const {dispatch} = this.props
    dispatch(delVoiceItem({group_ids}))

  }
  delVoiceAnswer(answer_id){
    this.props.dispatch(delVoiceAnswer({answer_id}))
  }
  delVoiceQuestion(question_id){
    this.props.dispatch(delVoiceQuestion({question_id}))
  }
  handleChecked(group_id, e){
    const checkbox= Object.assign({}, this.state.checkbox, {[group_id]: e.target.checked})
    this.setState({checkbox})
  }
  addSubmit(params){
    this.props.dispatch(addVoiceItem(params))
    setTimeout(()=>this.refreshVoiceList(), 150)
  }
//批量按钮
  chooseAll(){
    const checkbox= Object.assign({}, this.state.checkbox)
    const keys= Object.keys(checkbox)
    const checked = checkbox[keys[0]] ? false : true
    for(let i of keys){
      checkbox[i]= checked
    }
    this.setState({checkbox})
  }
  filterChecked(obj){
    const arr= []
    const keys= Object.keys(obj)
    for(let i of keys){
      if(obj[i]){
        arr.push(i)
      }
    }
    return arr
  }
  onAll(){
    const {dispatch} = this.props
    dispatch(toggleVoiceStatus({group_ids: this.filterChecked(this.state.checkbox), status: 1}))
    setTimeout(()=> this.props.dispatch(getVoiceList({page:this.state.page})), 150)
  }
  offAll(){
    const {dispatch} = this.props
    dispatch(toggleVoiceStatus({group_ids: this.filterChecked(this.state.checkbox), status: 0}))
    setTimeout(()=> this.props.dispatch(getVoiceList({page:this.state.page})), 150)
  }
  delAll(){
    const {dispatch} = this.props
    dispatch(delVoiceItem({group_ids: this.filterChecked(this.state.checkbox)}))
    setTimeout(()=> this.props.dispatch(getVoiceList({page:this.state.page})), 150)
  }
//初始化数据
  componentDidMount(){
    const {dispatch} = this.props
    dispatch(getVoiceList())
    dispatch(getCorpusList())
  }
  componentWillReceiveProps(nextProps){
    const {voiceList}= nextProps
    if(voiceList.list){
      const checkbox= {}
      for(let i= 0; i<voiceList.list.length; i++){
        Object.assign(checkbox, {[voiceList.list[i].group_id]: false})
      }
      this.setState({checkbox})
    }
  }
  showSceneTree(){
    this.props.dispatch(setVisibility({name: 'SCENE_TREE', show: true}))
  }
  editorSubmit(params){
    const {dispatch} = this.props
    dispatch(editorVoiceItem(params))
    setTimeout(()=>this.refreshVoiceList(), 150)
  }
  refreshVoiceList(){
    const {dispatch} = this.props
    const {page} = this.state
    dispatch(getVoiceList({page}))
  }
}
function mapStateToProps({voiceData}){
  return {
    voiceList: voiceData.voiceList,
    corpusList: voiceData.corpusList,
    secondSceneList: voiceData.secondSceneList
  }
}
export default connect(mapStateToProps)(VoiceManage)
