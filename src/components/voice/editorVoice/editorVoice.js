import React, {Component} from 'react'
import './editorVoice.css'
import {connect} from 'react-redux'
import {valid} from '../../../plugs/plugs.js'
import { getAllSecondSceneList, toggleAnswerStatus} from '../../../redux/actions.js'
class EditorVoice extends Component{
  constructor(){
    super()
    this.state={
      firstScene: '',
      secondScene:'',
      answers:'',
      questions:''
    }
    this.valid={
      secondScene:{
        change: false,
        notice:''
      },
      questions:[{change: false, notice:''}],
      keywords:[{change: false, notice:''}],
      answers:[{change: false, notice:''}]
    }
  }
  render(){
    let {hideEditorVoice, toggleEditorVoice,
       editorData, allFirstSceneList, allSecondSceneList} = this.props
    let {questions, answers} = editorData||{}
    questions= questions||[]
    answers= answers||[]
    return (
      <div className='voice-popup editor-voice'
        style={toggleEditorVoice? null:{display:'none'}}
        >
          <div className='editor-voice-info'>
            <h3>
              <span
              onClick={()=>{
                hideEditorVoice()
              }}
              >×</span>
            </h3>
          <h1
            >编辑语料</h1>
            <ul>
              <li>
                <span>场景</span>
                  <select
                    onChange={this.handleFirseScene.bind(this)}
                    value={this.state.firstScene}
                    style={{borderRight:'none'}}
                    >
                    <option value=''>请选择一级场景</option>
                    {
                      allFirstSceneList.map((val, i)=> {
                        return (
                          <option value={val.f_scene_id} key={i}
                            >{val.name}</option>
                        )
                      })
                    }
                  </select>
                  <select
                    onChange={this.handleSecondScene.bind(this)}
                    value={this.state.secondScene}
                    >
                    <option value=''>请选择二级场景</option>
                      {
                        (allSecondSceneList||[]).map((val, i)=> {
                          return (
                            <option value={val.s_scene_id} key={i}
                              >{val.name}</option>
                          )
                        })
                      }
                  </select>
                  <i className='valid' style={!this.valid.secondScene.change? {visibility:'hidden'}: null}>{this.valid.secondScene.notice= valid(this.state.secondScene,['require'],['必选！'])}</i>
              </li>
            </ul>
              {
                (this.state.questions||[]).map((val, i)=>{
                  return (
                    <ul key={i}>
                      <li>
                        <span>问题{i+1}</span>
                        <input type='text' placeholder='请输入问题'
                          onChange={this.handleQuestion.bind(this,i)}
                          value={(this.state.questions[i]||{}).question}
                        />
                      </li>
                      <li className='editor-voice-notice'>
                        <ul>
                          <li style={this.state.questions[i].question_id? null: {display:'none'}} className='editor-info'>
                            <i className='valid' style={!this.valid.questions[i].change? {visibility: 'hidden'}: null}>{this.valid.questions[i].notice= valid(this.state.questions[i].question,['require'])}</i>
                            <p>作者: {(questions[i]||{}).editor}</p>
                            <p>更新时间: {((questions[i]||{}).editor_time||'').slice(0, 10)}</p>
                          </li>
                          <li>
                            <span className='del'
                              onClick={this.delQuestion.bind(this, val.question_id, i)}
                              >删除</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span>关键词</span>
                        <input type='text' placeholder='请输入关键词，多个关键词之间用“／”间隔'
                          onChange={this.handleKeyword.bind(this,i)}
                          value={(this.state.questions[i]||{}).keyword}
                        />
                      </li>
                      <li className='editor-voice-notice'>
                        <ul>
                          <li>
                            <i className='valid' style={!this.valid.keywords[i].change? {visibility: 'hidden'}: null}>{this.valid.keywords[i].notice= valid(this.state.questions[i].keyword,['require'])}</i>
                          </li>
                          <li>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  )
                })
              }
            <h2 onClick={this.addQuestions.bind(this)}>添加相似问题</h2>
            {(this.state.answers||[]).map((val, i)=>{
                return (
                  <ul key={i}>
                    <li>
                      <span>答案{i+1}</span>
                      <input type='text' placeholder='请输入答案'
                        onChange={this.handleAnswer.bind(this, i)}
                        value={(this.state.answers[i]||{}).answer}
                      />
                    </li>
                    <li className='editor-voice-notice'>
                      <ul>
                        <li>
                          {console.log(!this.valid.answers[i].change)}
                          <i className='valid' style={!this.valid.answers[i].change? {visibility: 'hidden'}: null}>{this.valid.answers[i].notice= valid(this.state.answers[i].answer,['require'])}</i>
                          <p style={this.state.answers[i].answer_id? null: {display:'none'}}>更新时间:{(answers[i]||[]).editor_time}</p>
                          <p style={this.state.answers[i].answer_id? null: {display:'none'}}>作者:{(answers[i]||[]).editor}</p>
                        </li>
                        <li>
                          <span style={this.state.answers[i].answer_id? {color:'#5cc1df'}: {color:'#5cc1df',display:'none'}}
                            onClick={()=> {
                              this.props.dispatch(toggleAnswerStatus({answer_id:answers[i].answer_id, status:answers[i].status=== 1? 0: 1}))
                              setTimeout(this.props.refresh, 150)
                            }}
                          >
                            {(answers[i]||[]).status=== 1 ?'弃用':'启用'}
                          </span>
                          <span className='del'
                            onClick={this.delAnswer.bind(this, val.answer_id, i)}
                          >删除</span>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span>权重</span>
                      <select
                        onChange={this.handleWeight.bind(this,i)}
                        value={val.weight}
                        >
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
                      <select
                        onChange={this.handleAge.bind(this,i)}
                        value={val.age}
                        >
                        <option value='1'>入园前</option>
                        <option value='2'>幼小衔接</option>
                        <option value='4'>小学</option>
                        <option value='8'>初中</option>
                        <option value='16'>成人</option>
                      </select>
                    </li>
                  </ul>
                )
            })}
            <h2 onClick={this.addAnswers.bind(this)}>添加更多答案</h2>
            <div className='editor-voice-submit'>
              <p onClick={()=>{
                  hideEditorVoice()
                }
              }>取消</p>
              <p onClick={this.handleSubmit.bind(this)}>保存</p>
            </div>
          </div>
      </div>
    )
  }
  componentWillReceiveProps(nextProps){
    if((nextProps.editorData||[]).group_id !== (this.props.editorData||[]).group_id){
      const questions_valid= [],keywords_valid= [], answers_valid= []
      const nextQuestions= (nextProps.editorData||[]).questions;
      const nextAnswers= nextProps.editorData.answers;
      let questions= [], answers= []
      const firstScene= nextProps.editorData.f_scene_id, secondScene= nextProps.editorData.s_scene_id
      for(let i= 0; i<nextQuestions.length; i++){
        questions.push({
          question: nextQuestions[i].question,
          keyword: nextQuestions[i].keywords,
          question_id: nextQuestions[i].question_id
        })
        questions_valid.push({change: false, notice:''})
        keywords_valid.push({change: false, notice:''})
      }
      for(let i= 0; i<nextAnswers.length; i++){
        answers.push({
          answer:nextAnswers[i].answer,
          weight:nextAnswers[i].weight,
          age:nextAnswers[i].age,
          answer_id: nextAnswers[i].answer_id
        })
        answers_valid.push({change: false, notice:''})
      }
      this.props.dispatch(getAllSecondSceneList({f_scene_id: firstScene}))
      Object.assign(this.valid, {questions:questions_valid, answers: answers_valid, keywords: keywords_valid})
      this.setState({answers, questions, firstScene, secondScene})
    }
  }
  handleSubmit(){
    const showNotice= ()=> {
      const keys=Object.keys(this.valid)
      for(let i of keys){
        if(this.valid[i] instanceof Array){
          for(let k of this.valid[i]){
            k.change= true
          }
        }else{
          this.valid[i].change= true
        }
      }
    }
    if(this.valid.secondScene.notice){
      console.log('secondScene')
      showNotice()
      return this.forceUpdate()
    }
    for(let i of this.valid.answers){
      if(i.notice){
        console.log('answers')
        showNotice()
        console.log(this.valid.answers)
        return this.forceUpdate()
      }
    }
    for(let i of this.valid.keywords){
      if(i.notice){
        console.log('keywords')
        showNotice()
        return this.forceUpdate()
      }
    }
    for(let i of this.valid.questions){
      if(i.notice){
        console.log('questions')
        showNotice()
        return this.forceUpdate()
      }
    }

    const { editorData, editorSubmit} = this.props
    let {questions, answers, secondScene} = this.state
    questions= JSON.stringify(questions)
    answers= JSON.stringify(answers)
    const params= {
      group_id: editorData.group_id,
      corpus_lib_id: editorData.corpus_lib_id,
      s_scene_id: secondScene,
      is_scene_corpus: editorData.is_scene_corpus,
      questions,
      answers
    }
    editorSubmit(params)
  }
  addAnswers(){
    let answers_valid= [...this.valid.answers]
    answers_valid.push({change: false, notice:''})
    Object.assign(this.valid, {answers: answers_valid})
    let answers= [...this.state.answers]
    answers.push({answer:'', weight:'1', age:'1', answer_id:''})
    this.setState({answers})

  }
  addQuestions(){
    let questions_valid= [...this.valid.questions]
    questions_valid.push({change: false, notice:''})
    Object.assign(this.valid, {questions: questions_valid})

    let keywords_valid= [...this.valid.keywords]
    keywords_valid.push({change: false, notice:''})
    Object.assign(this.valid, {keywords: keywords_valid})

    let questions= [...this.state.questions]
    questions.push({question:'', keyword:'', question_id:''})
    this.setState({questions})
  }
  handleFirseScene(e){
    this.setState({firstScene: e.target.value})
    this.props.dispatch(getAllSecondSceneList({f_scene_id: e.target.value}))
  }
  handleSecondScene(e){
    this.valid.secondScene.change= true
    this.setState({secondScene: e.target.value})
  }
  handleQuestion(i,e){
    this.valid.questions[i].change= true
    const questions = [...this.state.questions]
    questions[i].question= e.target.value
    this.setState({questions})
  }
  handleKeyword(i,e){
    this.valid.keywords[i].change= true
    const questions = [...this.state.questions]
    questions[i].keyword= e.target.value
    this.setState({questions})
  }
  handleAnswer(i,e){
    this.valid.answers[i].change= true
    console.log(this.state.answers)
    const answers = [...this.state.answers]
    answers[i].answer= e.target.value
    this.setState({answers})
  }
  handleAge(i,e){
    const answers = [...this.state.answers]
    answers[i].age= e.target.value
    this.setState({answers})
  }
  handleWeight(i,e){
    const answers = [...this.state.answers]
    console.log(answers)
    answers[i].weight= e.target.value
    console.log(answers)
    this.setState({answers})
  }
  delQuestion(question_id, i){
    let questions_valid= [...this.valid.questions]
    let keywords_valid= [...this.valid.keywords]
    questions_valid.splice(i,1)
    keywords_valid.splice(i,1)
    Object.assign(this.valid, {questions: questions_valid})
    Object.assign(this.valid, {keywords: keywords_valid})

    const questions= [...this.state.questions]
    if(questions[i].question_id){
      this.props.delVoiceQuestion(question_id)
      setTimeout(this.props.refresh, 150)
    }
    questions.splice(i,1)
    this.setState({questions})
  }
  delAnswer(answer_id, i){
    let answers_valid= [...this.valid.answers]
    answers_valid.splice(i,1)
    Object.assign(this.valid, {answers: answers_valid})

    const answers= [...this.state.answers]
    if(answers[i].answer_id){
      this.props.delVoiceAnswer(answer_id)
      setTimeout(this.props.refresh, 150)
    }
    answers.splice(i,1)
    this.setState({answers})
  }
}
function mapStateToProps({voiceData}){
  return {
    allFirstSceneList: voiceData.allFirstSceneList,
    allSecondSceneList: voiceData.allSecondSceneList
  }
}
export default connect(mapStateToProps)(EditorVoice)
