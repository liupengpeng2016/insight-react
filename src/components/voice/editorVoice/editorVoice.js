import React, {Component} from 'react'
import './editorVoice.css'
import {connect} from 'react-redux'
import {valid, fileValid} from '../../../plugs/plugs.js'
import {getAllFirstSceneList, getAllSecondSceneList} from '../../../redux/actions.js'
class EditorVoice extends Component{
  constructor(){
    super()
    this.state={
      firstScene: '',
      secondScene:'',
      answers:[],
      questions:[]
    }
  }
  render(){
    let {hideEditorVoice, toggleEditorVoice,
       editorData, allFirstSceneList, allSecondSceneList} = this.props
    const {answers, questions} = editorData||{}
    return (
      <div className='voice-popup editor-voice'
        style={toggleEditorVoice? null:{display:'none'}}
        >
          <div className='editor-voice-info'>
            <h3>
              <span
              onClick={hideEditorVoice}
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
              </li>
            </ul>
              {
                this.state.questions.map((val, i)=>{
                  return (
                    <ul key={i}>
                      <li>
                        <span>问题{i+1}</span>
                        <input type='text' placeholder='请输入问题'
                          onChange={this.handleQuestion.bind(this,i)}
                          value={(questions[i]||{}).question}
                          />
                      </li>
                      <li className='editor-voice-notice'>
                        <ul>
                          <li>
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
                          value={(questions[i]||{}).keywords}
                          />
                      </li>
                      <li className='editor-voice-notice'>
                        <ul>
                          <li>
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
            {this.state.answers.map((val, i)=>{
                return (
                  <ul key={i}>
                    <li>
                      <span>答案{i+1}</span>
                      <input type='text' placeholder='请输入问题'
                        onChange={this.handleAnswer.bind(this, i)}
                        value={(answers[i]||{}).answer}
                        />
                    </li>
                    <li className='editor-voice-notice'>
                      <ul>
                        <li>
                          <p>更新时间</p>
                          <p>作者</p>
                        </li>
                        <li>
                          <span className='del'
                            onClick={ this.delAnswer.bind(this, val.answer_id, i)}
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
                      <select
                        onChange={this.handleAge.bind(this,i)}
                        value={val.age}
                        >
                        <option value='0'>通用</option>
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
              <p onClick={hideEditorVoice}>取消</p>
              <p onClick={this.handleSubmit.bind(this)}>保存</p>
            </div>
          </div>
      </div>
    )
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.editorData){
      const nextQuestions= nextProps.editorData.questions;
      const nextAnswers= nextProps.editorData.answers;
      let questions= [], answers= []
      for(let i= 0; i<nextQuestions.length; i++){
        questions.push({
          question: nextQuestions[i].question,
          keyword: nextQuestions[i].keywords,
          question_id: nextQuestions[i].question_id
        })
      }
      for(let i= 0; i<nextAnswers.length; i++){
        answers.push({
          answer:nextAnswers[i].answer,
          weight:nextAnswers[i].weight,
          age:nextAnswers[i].age,
          answer_id: nextAnswers[i].answer_id
        })
      }
      this.setState({answers, questions})
    }
  }
  componentDidMount(){
    this.props.dispatch(getAllFirstSceneList())
  }
  handleSubmit(){
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
    let answers= [...this.state.answers]
    answers.push({answer:'', weight:'0', age:'0', answer_id:''})
    this.setState({answers})
  }
  addQuestions(){
    let questions= [...this.state.questions]
    questions.push({question:'', keyword:'', question_id:''})
    this.setState({questions})
  }
//handle input
  handleFirseScene(e){
    this.setState({firstScene: e.target.value})
    this.props.dispatch(getAllSecondSceneList({f_scene_id: e.target.value}))
  }
  handleSecondScene(e){
    this.setState({secondScene: e.target.value})
  }
  handleQuestion(i,e){
    const questions = [...this.state.questions]
    questions[i].question= e.target.value
    console.log(questions)
    console.log(this.state.questions)
    this.setState({questions})
  }
  handleKeyword(i,e){
    const questions = [...this.state.questions]
    questions[i].keyword= e.target.value
    this.setState({questions})
  }
  handleAnswer(i,e){
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
    answers[i].weight= e.target.value
    this.setState({answers})
  }
  delQuestion(question_id, i){
    const questions= [...this.state.questions]
    if(questions[i].question_id){
      this.props.delVoiceQuestion(question_id)
    }
    questions.splice(i,1)
    this.setState({questions})
  }
  delAnswer(answer_id, i){
    const answers= [...this.state.answers]
    if(answers[i].answer_id){
      this.props.delVoiceAnswer(answer_id)
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
