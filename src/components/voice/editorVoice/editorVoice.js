import React, {Component} from 'react'
import './editorVoice.css'
class EditorVoice extends Component{
  constructor(){
    super()
    this.state={
      commonVoice: false,
      taotaoVoice: false,
      qvoice: false,
      view: '',
      questions:[{question:'', keyword:'',question_id:''},{answer:'', keyword:'',question_i:''}],
      answers:[{answer:'',weight:'', age:'', answer_id:''},{answer:'',weight:'', age:'', answer_id:''}],
    }
  }
  render(){
    let {hideEditorVoice, toggleEditorVoice} = this.props
    const {answers, questions} = this.state
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
                  onChange={this.handleView.bind(this)}
                  value={this.state.view}
                  >
                  <option>请选择场景</option>
                  <option></option>
                </select>
              </li>
            </ul>
              {
                questions.map((val, i)=>{
                  return (
                    <ul key={i}>
                      <li>
                        <span>答案{i+1}</span>
                        <input type='text' placeholder='请输入问题'
                          onChange={this.handleQuestion.bind(this,i)}
                          value={val.question}
                          />
                      </li>
                      <li className='editor-voice-notice'>
                        <ul>
                          <li>
                            <p>更新时间</p>
                            <p>作者</p>
                          </li>
                          <li>
                            <span className='del'>删除</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span>关键词</span>
                        <input type='text' placeholder='请输入关键词，多个关键词之间用“／”间隔'
                          onChange={this.handleKeyword.bind(this,i)}
                          value={val.keyword}
                          />
                      </li>
                      <li className='editor-voice-notice'>
                        <ul>
                          <li>
                          </li>
                          <li>
                            <span className='del'>删除</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  )
                })
              }
            <h2 onClick={this.addQuestions.bind(this)}>添加相似问题</h2>
            {answers.map((val, i)=>{
                return (
                  <ul key={i}>
                    <li>
                      <span>答案{i+1}</span>
                      <input type='text' placeholder='请输入问题'
                        onChange={this.handleAnswer.bind(this, i)}
                        value={val.answer}
                        />
                    </li>
                    <li className='editor-voice-notice'>
                      <ul>
                        <li>
                          <p>更新时间</p>
                          <p>作者</p>
                        </li>
                        <li>
                          <span className='del'>删除</span>
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
              <p onClick={hideEditorVoice}>取消</p>
              <p onClick={this.handleSubmit.bind(this)}>保存</p>
            </div>
          </div>
      </div>
    )
  }
  handleSubmit(){
    const { editorData, editorSubmit} = this.props
    const params= Object.assign(editorData, {s_scene_id:'', is_scene_corpus: '', questions:'', answers:''})
    editorSubmit({params})
  }
  addAnswers(){
    let answers= [...this.state.answers]
    answers.push({answer:'', sort:'', age:''})
    this.setState({answers})
  }
  addQuestions(){
    let questions= [...this.state.questions]
    questions.push({question:'', keywords:''})
    this.setState({questions})
  }

  //表单处理
  handleView(e){
    this.setState({view: e.target.value})
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
}
export default EditorVoice
