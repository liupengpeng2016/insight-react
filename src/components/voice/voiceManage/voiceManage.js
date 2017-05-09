import React, {Component} from 'react'
import './voiceManage.css'
import EditorVoice from '../editorVoice/editorVoice.js'
import AddVoice from '../addVoice/addVoice.js'
import {
  getVoiceList, editorVoiceItem,
  delVoiceItem, delVoiceAnswer,
  delVoiceQuestion, toggleVoiceStatus,
  getCorpusList, addVoiceItem, getAllScene,
  setVisibility, getAllFirstSceneList,
  getAllSecondSceneList, setVisibility2
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
      editorData:undefined,
      checkbox:'',
      is_scene_corpus: 0,
      firstScene:'',
      secondScene:'',
      voice_checkbox:''
    }
    this.getVoiceList= this.getVoiceList.bind(this)
    this.spreadDetail= this.spreadDetail.bind(this)
  }
  render(){
    const {voiceList, corpusList, allFirstSceneList, allSecondSceneList} = this.props
    return (
      <div className='voice-manage'>
        <EditorVoice
          toggleEditorVoice={this.state.toggleEditorVoice}
          hideEditorVoice={this.hideEditorVoice.bind(this)}
          editorSubmit={this.editorSubmit.bind(this)}
          editorData={(voiceList.list||[])[this.state.editorData]||''}
          delVoiceAnswer={this.delVoiceAnswer.bind(this)}
          delVoiceQuestion={this.delVoiceQuestion.bind(this)}
          refresh={this.getVoiceList.bind(this)}
          ></EditorVoice>
        <AddVoice
          checkbox={this.state.checkbox}
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
              !corpusList.length? '': corpusList.map((val, i)=> {
                return (
                  <li key={i}>
                    <input type='checkbox' id={`voiceManage${i}`}
                      onChange={this.handleCheckbox.bind(this, i)}
                      checked={this.state.checkbox? this.state.checkbox[i].checked: true}
                    />
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
          <select style={{marginRight:0,borderRight:'none'}}
            onChange={this.handleFirstScene.bind(this)}
            value={this.state.firstScene}
          >
            <option>请选择一级场景</option>
            {
              allFirstSceneList.map((val, i)=> {
                return (
                  <option key={i} value={val.f_scene_id}>{val.name}</option>
                )
              })
            }
          </select>
          <select>
            <option>请选择二级场景</option>
            {
              allSecondSceneList.map((val, i)=> {
                return (
                  <option key={i} value={val.f_scene_id}>{val.name}</option>
                )
              })
            }
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
              (voiceList.list||[]).map((val,i)=>{
                return (
                  <tbody  key={i}>
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
                            <p key={i}>
                              <span
                                style={!val.status?{background:'#aaa'}: null}
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
                    <tr className='hide' style={{background: 'white'}}>
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
        <PageCtr total={voiceList.pages} buttons='10' changePage={this.changePage.bind(this)}/>
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
    this.getVoiceList({corpus_lib_ids, page: 1})
  }
  handleFirstScene(e){
    this.setState({firstScene: e.target.value})
    this.props.dispatch(getAllSecondSceneList({f_scene_id:e.target.value}))
  }
  handleSecondScene(e){
    this.setState({secondScene: e.target.value})
  }
  hideEditorVoice(){
    document.querySelector('.editor-voice-info').scrollTop= 0
    this.setState({toggleEditorVoice: false})
  }
  hideAddVoice(){
    this.setState({toggleAddVoice: false})
  }
  changePage(page){
    this.setState({page})
    this.getVoiceList({page})
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
    dispatch(toggleVoiceStatus({group_ids, status},this.getVoiceList.bind(this)))
  }
  delVoiceItem(group_ids){
    const {dispatch} = this.props
    dispatch(delVoiceItem({group_ids},this.getVoiceList.bind(this)))
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
    this.props.dispatch(delVoiceAnswer({answer_id},this.getVoiceList.bind(this)))

  }
  delVoiceQuestion(question_id){
    this.props.dispatch(delVoiceQuestion({question_id},this.getVoiceList.bind(this)))

  }
  handleVoice_checkbox(i, e){
    const voice_checkbox= this.state.voice_checkbox
    voice_checkbox[i].checked= e.target.checked
    this.setState({voice_checkbox})
  }
  addSubmit(params){
    this.props.dispatch(addVoiceItem(params,this.getVoiceList.bind(this)))
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
    dispatch(toggleVoiceStatus({group_ids: this.filterVoice_checkbox(this.state.voice_checkbox), status: 1},this.getVoiceList.bind(this)))
  }
  offAll(){
    const {dispatch} = this.props
    dispatch(toggleVoiceStatus({group_ids: this.filterVoice_checkbox(this.state.voice_checkbox), status: 0},this.getVoiceList.bind(this)))
  }
  delAll(){
    const {dispatch} = this.props
    const group_ids= this.filterVoice_checkbox(this.state.voice_checkbox)
    dispatch(setVisibility2({
      secondConfirm:{
        show: true,
        msg:'确认要删除吗？',
        callback:this.delVoiceItem.bind(this, group_ids)
       }
    },this.getVoiceList.bind(this)))
  }
//初始化数据
  componentDidMount(){
    const {dispatch} = this.props
    dispatch(getCorpusList())
    dispatch(getAllFirstSceneList())
  }
  getVoiceList(params= null){
    const {page}= this.state
    const {dispatch}= this.props
    const corpus_lib_ids= this.filterCheckbox(this.state.checkbox)
    params= Object.assign({page, corpus_lib_ids}, params)
    dispatch(getVoiceList(params))
  }
  componentWillReceiveProps(nextProps){
    const {voiceList}= nextProps
    if(voiceList.list){
      const voice_checkbox= []
      for(let i of voiceList.list){
        voice_checkbox.push({checked: false, group_id: i.group_id})
      }
      this.setState({voice_checkbox})
    }
    const {corpusList}= nextProps
    if(!this.state.checkbox&& corpusList.length!== 0){
      let checkbox= []
      for(let i= 0; i<corpusList.length; i++){
        checkbox.push({checked:true, corpus_lib_id:corpusList[i].corpus_id})
      }

      const localCheckbox= JSON.parse(localStorage.getItem('voiceCheck'))
      localStorage.removeItem('voiceCheck')
      if(localCheckbox){
        for(let i of localCheckbox){
          for(let k of checkbox){
            if(i.corpus_lib_id=== k.corpus_lib_id){
                k.checked= i.checked
            }
          }
        }
      }
      this.getVoiceList({corpus_lib_ids: this.filterCheckbox(checkbox)})
      localStorage.setItem('voiceCheck', JSON.stringify(checkbox))
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
    dispatch(editorVoiceItem(params, this.getVoiceList.bind(this)))
  }
  getAgeData(age){
      let str= ''
      if((age&1) === 1){
        str+= '入园前、'
      }
      if((age&2) === 2){
        str+= '幼小衔接、'
      }
      if((age&4) === 4){
        str+= '小学、'
      }
      if((age&8) === 8){
        str+= '初中、'
      }
      if((age&16) === 16){
        str+= '成人、'
      }
      return str.slice(0, -1)|| '无'
    }
}
function mapStateToProps({voiceData}){
  return {
    voiceList: voiceData.voiceList,
    corpusList: voiceData.corpusList,
    allFirstSceneList: voiceData.allFirstSceneList,
    allSecondSceneList: voiceData.allSecondSceneList
  }
}
export default connect(mapStateToProps)(VoiceManage)
