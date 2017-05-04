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
      questions:'',
      ages:[]
    }
    this.valid={
      secondScene:{
        change: false,
        notice:''
      },
      questions:[{change: false, notice:''}],
      answers:[{change: false, notice:''}]
    }
  }
  render(){
    let {hideEditorVoice, toggleEditorVoice,
       editorData, allFirstSceneList, allSecondSceneList} = this.props
    let {questions, answers} = editorData||{}
    const {is_scene_corpus} = editorData||{}
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
            >编辑{is_scene_corpus? '场景': ''}语料</h1>
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
                        <option value=''>请选择权重</option>
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
                    <li className='answer-age'>
                      <span>年龄段：</span>
                      <input type='checkbox' id='age1'
                         onChange={this.handleAge.bind(this,i,0,1)}
                         checked={(this.state.ages[i]||[])[0]? true : false}
                      />
                      <label htmlFor='age1'>入园前</label>
                      <input type='checkbox' id='age2'
                        onChange={this.handleAge.bind(this,i,1,2)}
                        checked={(this.state.ages[i]||[])[1]? true : false}
                      />
                      <label htmlFor='age2'>幼小衔接</label>
                      <input type='checkbox' id='age3'
                        onChange={this.handleAge.bind(this,i,2,4)}
                        checked={(this.state.ages[i]||[])[2]? true : false}
                      />
                      <label htmlFor='age3'>小学</label>
                      <input type='checkbox' id='age4'
                        onChange={this.handleAge.bind(this,i,3,8)}
                        checked={(this.state.ages[i]||[])[3]? true : false}
                      />
                      <label htmlFor='age4'>初中</label>
                      <input type='checkbox' id='age5'
                        onChange={this.handleAge.bind(this,i,4,16)}
                        checked={(this.state.ages[i]||[])[4]? true : false}
                      />
                      <label htmlFor='age5'>成人</label>
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
    if(!nextProps.editorData){
      return
    }
    if((nextProps.editorData||[]).group_id !== (this.props.editorData||[]).group_id){
      const questions_valid= [],keywords_valid= [], answers_valid= []
      const nextQuestions= (nextProps.editorData||[]).questions;
      const nextAnswers= (nextProps.editorData||[]).answers;
      let questions= [], answers= [], ages= []
      const firstScene= (nextProps.editorData||[]).f_scene_id, secondScene= (nextProps.editorData||[]).s_scene_id
      for(let i= 0; i<nextQuestions.length; i++){
        questions.push({
          question: nextQuestions[i].question,
          keyword: nextQuestions[i].keywords,
          question_id: nextQuestions[i].question_id
        })
        questions_valid.push({change: false, notice:''})
        keywords_valid.push({change: false, notice:''})
      }
      function getCheckedData(age){
        const arr=[]
        if((age&1) === 1){
          arr.push(1)
        }else{
          arr.push(0)
        }
        if((age&2) === 2){
          arr.push(2)
        }else{
          arr.push(0)
        }
        if((age&4) === 4){
          arr.push(4)
        }else{
          arr.push(0)
        }
        if((age&8) === 8){
          arr.push(8)
        }else{
          arr.push(0)
        }
        if((age&16) === 16){
          arr.push(16)
        }else{
          arr.push(0)
        }
        return arr
      }
      for(let i= 0; i<nextAnswers.length; i++){
        ages.push(getCheckedData(nextAnswers[i].age))
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
      this.setState({answers, questions, firstScene, secondScene, ages})
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
    this.props.hideEditorVoice()
  }
  addAnswers(){
    let answers_valid= [...this.valid.answers]
    answers_valid.push({change: false, notice:''})
    Object.assign(this.valid, {answers: answers_valid})

    let answers= [...this.state.answers]
    answers.push({answer:'', weight:'', age:'', answer_id:''})

    let ages= [...this.state.ages]
    ages.push([0,0,0,0,0])

    this.setState({answers, ages})

  }
  addQuestions(){
    let questions_valid= [...this.valid.questions]
    questions_valid.push({change: false, notice:''})
    Object.assign(this.valid, {questions: questions_valid})

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
    const questions = [...this.state.questions]
    questions[i].keyword= e.target.value
    this.setState({questions})
  }
  handleAnswer(i,e){
    this.valid.answers[i].change= true
    const answers = [...this.state.answers]
    answers[i].answer= e.target.value
    this.setState({answers})
  }
  handleAge(i,j,k,e){
    const answers = [...this.state.answers]
    const ages= [...this.state.ages]
    let age= 0
    if(e.target.checked){
      ages[i][j]= k
    }else{
      ages[i][j]= 0
    }
    for(let l of ages[i]){
      age|= l
    }
    answers[i].age= age
    this.setState({answers, ages})
  }
  handleWeight(i,e){
    const answers = [...this.state.answers]
    answers[i].weight= e.target.value
    this.setState({answers})
  }
  delQuestion(question_id, i){
    let questions_valid= [...this.valid.questions]
    questions_valid.splice(i,1)
    Object.assign(this.valid, {questions: questions_valid})

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

    let ages= [...this.state.ages]
    ages.splice(i,1)

    this.setState({answers, ages})
  }
}
function mapStateToProps({voiceData}){
  return {
    allFirstSceneList: voiceData.allFirstSceneList,
    allSecondSceneList: voiceData.allSecondSceneList
  }
}
export default connect(mapStateToProps)(EditorVoice)
