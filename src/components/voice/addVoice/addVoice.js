import React, {Component} from 'react'
import './addVoice.css'
import {connect} from 'react-redux'
import {getAllFirstSceneList, getAllSecondSceneList} from '../../../redux/actions.js'
class AddVoice extends Component{
  constructor(){
    super()
    this.state={
      checkbox:{},
      firstScene: '',
      secondScene:'',
      answers:[{answer: '', weight: '0', age: '0'}],
      questions:[{question: '', keyword: ''}]
    }
  }
  render(){
    let {hideAddVoice, toggleAddVoice, corpusList, allFirstSceneList, allSecondSceneList} = this.props
    const {answers, questions} = this.state
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
            <ul className='add-voice-scope'>
              <li>
                <span>语料库</span>
                {
                  (corpusList||[]).map((val, i)=>{
                    return (
                      <p key={i}>
                        <input type='checkbox' id={`addVoice${i}`}
                          onChange={this.handleChecked.bind(this, val.corpus_id)}
                          checked={this.state.checkbox[val.corpus_id]}
                        />
                        <label htmlFor={`addVoice${i}`}>{val.name}</label>
                      </p>
                    )
                  })
                }
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
              </li>
            </ul>
              {
                questions.map((val, i)=>{
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
                        </ul>
                      </li>
                    </ul>
                  )
                })
              }
            <h2 onClick={this.addQuestions.bind(this)}>添加相似问题</h2>
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
                        onChange={this.handleSort.bind(this,i)}
                        value={val.sort}
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
              <p onClick={hideAddVoice}>取消</p>
              <p onClick={this.handleSubmit.bind(this)}>保存</p>
            </div>
          </div>
      </div>
    )
  }
  filterChecked(obj){
    const keys= Object.keys(obj)
    const arr= []
    for(let i of keys){
      if(obj[i]){
        arr.push(i)
      }
    }
    return arr
  }
  handleSubmit(){
    const {addSubmit, is_scene_corpus} = this.props
    let {questions, answers, secondScene} = this.state
    questions= JSON.stringify(questions)
    answers= JSON.stringify(answers)
    const params= {
      s_scene_id: secondScene,
      corpus_lib_ids: this.filterChecked(this.state.checkbox),
      is_scene_corpus,
      questions,
      answers
    }
    addSubmit(params)
  }
  addAnswers(){
    let answers= [...this.state.answers]
    answers.push({answer:'', sort:'0', age:'0'})
    this.setState({answers})
  }
  addQuestions(){
    let questions= [...this.state.questions]
    questions.push({question:'', keyword:''})
    this.setState({questions})
  }
  //初始化数据
  componentWillReceiveProps(nextProps){
    if(nextProps.corpusList){
      const checkbox = {}
      for( let i= 0; i<nextProps.corpusList.length; i++){
        Object.assign(checkbox, {[nextProps.corpusList[i].corpus_id]: false})
      }
      this.setState({checkbox})
    }
  }
  componentDidMount(){
    this.props.dispatch(getAllFirstSceneList())
  }
  //表单处理
  handleFirseScene(e){
    this.setState({firstScene: e.target.value})
    this.props.dispatch(getAllSecondSceneList({f_scene_id: e.target.value}))
  }
  handleSecondScene(e){
    this.setState({secondScene: e.target.value})
  }
  handleQuestion(i,e){
    const question = [...this.state.questions]
    question[i].question= e.target.value
    this.setState({question})
  }
  handleKeyword(i,e){
    const question = [...this.state.questions]
    question[i].keyword= e.target.value
    this.setState({question})
  }
  handleAnswer(i,e){
    const answer = [...this.state.answers]
    answer[i].answer= e.target.value
    this.setState({answer})
  }
  handleAge(i,e){
    const answer = [...this.state.answers]
    answer[i].age= e.target.value
    this.setState({answer})
  }
  handleSort(i,e){
    const answer = [...this.state.answers]
    answer[i].sort= e.target.value
    this.setState({answer})
  }
  delQuestion(question_id, i){
    const questions= [...this.state.questions]
    questions.splice(i,1)
    this.setState({questions})
  }
  delAnswer(answer_id, i){
    const answers= [...this.state.answers]
    answers.splice(i,1)
    this.setState({answers})
  }
  handleChecked(corpus_id,e){
    const checkbox = Object.assign({}, this.state.checkbox, {[corpus_id]: e.target.checked})
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
