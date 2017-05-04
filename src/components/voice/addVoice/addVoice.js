import React, {Component} from 'react'
import './addVoice.css'
import {connect} from 'react-redux'
import {valid} from '../../../plugs/plugs.js'
import {getAllSecondSceneList} from '../../../redux/actions.js'
class AddVoice extends Component{
  constructor(){
    super()
    this.state={
      checkbox:'',
      firstScene: '',
      secondScene:'',
      answers:[{answer: '', weight: '', age: ''}],
      questions:[{question: '', keyword: ''}],
      ages:[[0,0,0,0,0]]
    }
    this.valid={
      secondScene:{
        change: false,
        notice:''
      },
      checkbox:{
        change: false,
        notice:''
      },
      questions:[{change: false, notice:''}],
      answers:[{change: false, notice:''}]
    }
  }
  render(){
    let {is_scene_corpus, hideAddVoice, toggleAddVoice, corpusList, allFirstSceneList, allSecondSceneList} = this.props
    const {answers, questions} = this.state
    return (
      <div className='voice-popup editor-voice'
        style={toggleAddVoice? null:{display:'none'}}
      >
          <div className='editor-voice-info'>
            <h3>
              <span
              onClick={()=>{
                hideAddVoice()
                this.resetComponent()
              }}
              >×</span>
            </h3>
            <h1>{'新增'+ (is_scene_corpus? '场景':'') +'语料'}</h1>
            <ul className='add-voice-scope'>
              <li>
                <span>语料库</span>
                {
                  (corpusList||[]).map((val, i)=>{
                    return (
                      <p key={i}>
                        <input type='checkbox' id={`addVoice${i}`}
                          onChange={this.handleChecked.bind(this, i)}
                          checked={this.state.checkbox? this.state.checkbox[i].checked: false}
                        />
                        <label htmlFor={`addVoice${i}`}>{val.name}</label>
                      </p>
                    )
                  })
                }
                <i className='valid' style={!this.valid.checkbox.change? {visibility:'hidden'}: null}>{this.valid.checkbox.notice= this.valid_checkbox()}</i>
              </li>
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
                        allSecondSceneList.map((val, i)=> {
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
                  questions.map((val, i)=>{
                  return (
                    <ul key={i} style={is_scene_corpus? {display:'none'}: null}>
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
                            <i className='valid' style={!this.valid.questions[i].change? {visibility: 'hidden'}: null}>{this.valid.questions[i].notice= valid(this.state.questions[i].question,['require'])}</i>
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
                          value={(questions[i]||{}).keyword}
                        />
                      </li>
                      <li className='editor-voice-notice'>
                        <ul>
                          <li>
                          </li>
                          <li>
                            <span className='del'
                              ></span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  )
                })
              }
              <h2 onClick={this.addQuestions.bind(this)}
                style={is_scene_corpus? {display:'none'}: null}
              >添加相似问题</h2>
            {
              answers.map((val, i)=>{
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
                          <i className='valid' style={!this.valid.answers[i].change? {visibility: 'hidden'}: null}>{this.valid.answers[i].notice= valid(answers[i].answer,['require'])}</i>
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
                    <li>
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
              <p onClick={()=>{hideAddVoice(); this.resetComponent()}}>取消</p>
              <p onClick={this.handleSubmit.bind(this)}>保存</p>
            </div>
          </div>
      </div>
    )
  }
  filterChecked(arr){
    const new_arr= []
    for(let i of arr){
      if(i.checked){
        new_arr.push(i.corpus_lib_id)
      }
    }
    return new_arr
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
      showNotice()
      console.log('secondScene')
      return this.forceUpdate()
    }
    if(this.valid.checkbox.notice){
      showNotice()
      console.log('checkbox')
      return this.forceUpdate()
    }
    for(let i of this.valid.answers){
      if(i.notice){
        showNotice()
        console.log('answers')
        return this.forceUpdate()
      }
    }
    if(!this.props.is_scene_corpus){
      for(let i of this.valid.questions){
        if(i.notice){
          console.log('questions')
          showNotice()
          return this.forceUpdate()
        }
      }
    }
    const {addSubmit, is_scene_corpus} = this.props
    let {questions, answers, secondScene} = this.state
    questions= JSON.stringify(questions)
    answers= JSON.stringify(answers)
    if(this.props.is_scene_corpus){
      questions= ''
    }
    const params= {
      s_scene_id: secondScene,
      corpus_lib_ids: this.filterChecked(this.state.checkbox),
      is_scene_corpus,
      questions,
      answers
    }
    addSubmit(params)
    this.props.hideAddVoice()
    this.resetComponent()
  }
  valid_checkbox(){
    const checkbox= this.state.checkbox
    let select= false
    for(let i of checkbox){
      if(i.checked){
        select= true
      }
    }
    return select? '': '必选！'
  }
  addAnswers(){
    let answers_valid= [...this.valid.answers]
    answers_valid.push({change: false, notice:''})
    Object.assign(this.valid, {answers: answers_valid})

    let answers= [...this.state.answers]
    answers.push({answer:'', weight:'', age:''})

    let ages= [...this.state.ages]
    ages.push([0,0,0,0,0])

    this.setState({answers, ages})
  }
  addQuestions(){
    let questions_valid= [...this.valid.questions]
    questions_valid.push({change: false, notice:''})
    Object.assign(this.valid, {questions: questions_valid})

    let questions= [...this.state.questions]
    questions.push({question:'', keyword:''})
    this.setState({questions})
  }
  //初始化数据
  componentWillReceiveProps(nextProps){
    if(!this.state.checkbox){
      let checkbox= JSON.stringify(nextProps.checkbox)
      checkbox= JSON.parse(checkbox)
      const checkbox_valid=[]
      for( let i= 0; i<nextProps.corpusList.length; i++){
        checkbox_valid.push({change: false, notice:''})
      }
      this.valid.checkbox= checkbox_valid
      this.setState({checkbox})
    }
  }
  resetComponent(){
    this.setState({
      checkbox:'',
      firstScene: '',
      secondScene:'',
      answers:[{answer: '', weight: '', age: ''}],
      questions:[{question: '', keyword: ''}]
    })
    this.valid={
      secondScene:{
        change: false,
        notice:''
      },
      checkbox:{
        change: false,
        notice:''
      },
      questions:[{change: false, notice:''}],
      answers:[{change: false, notice:''}]
    }
  }
  //表单处理
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
    questions.splice(i,1)
    this.setState({questions})
  }
  delAnswer(answer_id, i){
    let answers_valid= [...this.valid.answers]
    answers_valid.splice(i,1)
    Object.assign(this.valid, {answers: answers_valid})

    const answers= [...this.state.answers]
    answers.splice(i,1)

    let ages= [...this.state.ages]
    ages.splice(i,1)

    this.setState({answers, ages})
  }
  handleChecked(i, e){
    this.valid.checkbox.change= true
    const checkbox= this.state.checkbox
    checkbox[i].checked= e.target.checked
    this.setState({checkbox})
  }
}
function mapStateToProps({voiceData}){
  return {
    allFirstSceneList: voiceData.allFirstSceneList,
    allSecondSceneList: voiceData.allSecondSceneList
  }
}
export default connect(mapStateToProps)(AddVoice)
