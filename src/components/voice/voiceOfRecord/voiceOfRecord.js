import React, {Component} from 'react'
import EditorVoice from '../editorVoice/editorVoice.js'
import {
  editorVoiceItem, getRecordList,
  delVoiceItem, delVoiceAnswer,
  delVoiceQuestion, toggleVoiceStatus,
  setVisibility,setVisibility2,
  getAllScene
} from '../../../redux/actions.js'
import {connect} from 'react-redux'
import PageCtr from '../../media/pageCtr/pageCtr.js'
class VoiceOfRecord extends Component{
  constructor(){
    super()
    this.state={
      toggleEditorVoice: false,
      toggleAddVoice: false,
      page:1,
      buttonMode:1,
      editorData:undefined,
      checkbox:''
    }
    this.spreadDetail= this.spreadDetail.bind(this)
  }
  render(){
    const {recordList}= this.props
    return (
      <div className='voice-manage'>
        <EditorVoice
          toggleEditorVoice={this.state.toggleEditorVoice}
          hideEditorVoice={this.hideEditorVoice.bind(this)}
          editorSubmit={this.editorSubmit.bind(this)}
          editorData={(recordList.list||[])[this.state.editorData]||''}
          delVoiceAnswer={this.delVoiceAnswer.bind(this)}
          delVoiceQuestion={this.delVoiceQuestion.bind(this)}
          refresh={this.getRecordList.bind(this)}
          ></EditorVoice>
        <table className='voice-manage-list'>
          <thead>
            <tr>
              <td>场景</td>
              <td className='questions-keywords'>
                <p>
                  <span>问题</span>
                  <span>关键词</span>
                </p>
              </td>
              <td
                className='voice-answer'
              >
                <span>答案</span>
                <span>答案属性</span>
              </td>
              <td>问答对状态</td>
              <td style={{width:'0.1083rem'}}>操作</td>
            </tr>
          </thead>
            {
              (recordList.list||[]).map((val,i)=>{
                return (
                  <tbody  key={i}
                    style={val.status? null: {background:'#dbdbdb',color:'#c2c2c2'}}
                  >
                    <tr>
                      <td className='spread-array-shrink'
                        onClick={this.spreadDetail}
                        >{val.s_scene}
                      </td>
                      <td className='questions-keywords'>
                        {val.questions.map((val,i)=>{
                            return (
                              <p key={i}>
                                <span>{val.question}</span>
                                <span>{val.keywords}</span>
                              </p>
                            )
                          })
                        }
                      </td>
                      <td className='answer'>
                        {val.answers.map((val,i)=>{
                          return (
                            <p key={i}
                              style={!val.status?{background:'#dbdbdb',color:'#c2c2c2'}: null}
                            >
                              <span
                              >{val.answer}
                              </span>
                              <span style={{lineHeight:'0.0166rem'}}>
                                {`${val.weight? val.weight: '无'}/${this.getAgeData(val.age)}`}
                              </span>
                            </p>
                          )
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
                              onChange={this.handleVoice_checkbox.bind(this, i)}
                              checked={this.state.voice_checkbox? this.state.voice_checkbox[i].checked: false}
                            />
                          )
                        }
                      </td>
                    </tr>
                    <tr className='hide' style={{background: 'white',color:'#c2c2c2'}}>
                      <td colSpan='7' className='voice-manage-list-detail'>
                        <p><span>语料库</span>{val.corpus_lib_name}</p>
                        <p><span>语料id</span>{val.group_id}</p>
                        <p><span>创建时间</span>{val.create_time}<span>创建作者</span>{val.creator}</p>
                        <p><span>修改时间</span>{val.editor_time}<span>修改作者</span>{val.editor}</p>
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
          <li onClick={()=> this.setState({buttonMode: 1})}>退出</li>
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
        <PageCtr total={recordList.pages} buttons='10' changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
  handleCheckbox(i, e){
    const checkbox= [...this.state.checkbox]
    checkbox[i].checked= e.target.checked
    this.setState({checkbox})
    localStorage.setItem('voiceCheck', JSON.stringify(checkbox))
    const corpus_lib_ids= []
    for(let i of checkbox){
      if(i.checked){
        corpus_lib_ids.push(i.corpus_lib_id)
      }
    }
    this.getRecordList({corpus_lib_ids, page: 1})
  }
  hideEditorVoice(){
    document.querySelector('.editor-voice-info').scrollTop= 0
    this.setState({toggleEditorVoice: false})
  }
  changePage(page){
    this.setState({page})
    this.getRecordList({page})
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
    dispatch(toggleVoiceStatus({group_ids, status},this.getRecordList.bind(this)))
  }
  delVoiceItem(group_ids){
    const {dispatch} = this.props
    dispatch(delVoiceItem({group_ids},this.getRecordList.bind(this)))
  }
  handelDelVoice(group_ids){
    const {dispatch} = this.props
    dispatch(setVisibility2({
      secondConfirm:{
        show: true,
        msg:'确认要删除吗？',
        callback:this.delVoiceItem.bind(this, group_ids)
       }
    }))
  }
  delVoiceAnswer(answer_id){
    this.props.dispatch(delVoiceAnswer({answer_id},this.getRecordList.bind(this)))

  }
  delVoiceQuestion(question_id){
    this.props.dispatch(delVoiceQuestion({question_id},this.getRecordList.bind(this)))

  }
  handleVoice_checkbox(i, e){
    const voice_checkbox= this.state.voice_checkbox
    voice_checkbox[i].checked= e.target.checked
    this.setState({voice_checkbox})
  }
//批量按钮
  chooseAll(){
    const voice_checkbox= this.state.voice_checkbox
    const checked= !voice_checkbox[0].checked
    for(let i= 0;i< voice_checkbox.length; i++){
      voice_checkbox[i].checked= checked
    }
    this.setState({voice_checkbox})
  }
  filterCheckbox(obj){
    const arr= []
    for(let i of obj){
      if(i.checked){
        arr.push(i.corpus_lib_id)
      }
    }
    return arr
  }
  filterVoice_checkbox(arr){
    const ids=[]
    const checkbox= this.state.voice_checkbox
    for(let i= 0;i<checkbox.length; i++){
      if(checkbox[i].checked){
        ids.push(checkbox[i].group_id)
      }
    }
    return ids
  }
  onAll(){
    const {dispatch} = this.props
    const group_ids= this.filterVoice_checkbox(this.state.voice_checkbox)
    if(!group_ids.length){
      return dispatch(setVisibility({name:'FETCH_NOTICE', show: true, msg:'请选择一个或多个内容！'}))
    }
    dispatch(toggleVoiceStatus({group_ids, status: 1},this.getRecordList.bind(this)))
  }
  offAll(){
    const {dispatch} = this.props
    const group_ids= this.filterVoice_checkbox(this.state.voice_checkbox)
    if(!group_ids.length){
      return dispatch(setVisibility({name:'FETCH_NOTICE', show: true, msg:'请选择一个或多个内容！'}))
    }

    dispatch(toggleVoiceStatus({group_ids, status: 0},this.getRecordList.bind(this)))
  }
  delAll(){
    const {dispatch} = this.props
    const group_ids= this.filterVoice_checkbox(this.state.voice_checkbox)
    if(!group_ids.length){
      return dispatch(setVisibility({name:'FETCH_NOTICE', show: true, msg:'请选择一个或多个内容！'}))
    }
    dispatch(setVisibility2({
      secondConfirm:{
        show: true,
        msg:'确认要删除吗？',
        callback:this.delVoiceItem.bind(this, group_ids)
       }
    },this.getRecordList.bind(this)))
  }
//初始化数据
  componentDidMount(){
    this.getRecordList()
  }
  getRecordList(params= null){
    const {page}= this.state
    const {dispatch}= this.props
    const corpus_lib_ids= this.filterCheckbox(this.state.checkbox)
    params= Object.assign({page, corpus_lib_ids}, params)
    dispatch(getRecordList(params))
  }
  setCheckbox(arr){
    const checkbox= []
    for(let i of arr){
      checkbox.push({id:i.id, checked: false})
    }
    return checkbox
  }
  componentWillReceiveProps(nextProps){
    const {recordList}= nextProps
    if(recordList.list){
      const checkbox= this.setCheckbox(nextProps.recordList.list)
      this.setState({checkbox})
    }
  }
  showSceneTree(){
    const {dispatch}= this.props
    dispatch(getAllScene())
    dispatch(setVisibility({name: 'SCENE_TREE', show: true}))
  }
  editorSubmit(params){
    const {dispatch} = this.props
    dispatch(editorVoiceItem(params, this.getRecordList.bind(this)))
  }
  getAgeData(age){
      let str= ''
      if((age&1) === 1){
        str+= '前'
      }
      if((age&2) === 2){
        str+= '幼'
      }
      if((age&4) === 4){
        str+= '小'
      }
      if((age&8) === 8){
        str+= '初'
      }
      if((age&16) === 16){
        str+= '成'
      }
      return str|| '无'
    }
}
function mapStateToProps({voiceData}){
  return {
  }
}
export default connect(mapStateToProps)(VoiceOfRecord)
