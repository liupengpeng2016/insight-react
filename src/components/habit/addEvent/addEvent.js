import React, {Component} from 'react'
import './addEvent.css'
import {addHabitPlanEvent} from '../../../redux/actions.js'
import {connect} from 'react-redux'
import fileUpload from '../../../fileUpload/fileUpload.js'
class AddEvent extends Component{
  constructor(props){
    super(props)
    this.state={
      name:'',
      icon:'',
      hours:'0',
      minutes:'0',
      sort:'0',
      voice_name:'',
      music_id:'',
      file:'',
      fileUrl:''
    }
  }
  render(){
    console.log(this)
    return (
      <div className='habit-plan'>
        <h1>习惯养成>新增提醒</h1>
        <h2>设置提醒信息</h2>
        <ul className='add-item'>
          <li className='input-img'>
            <span>上传图片</span>
            <img src={this.state.fileUrl} alt=''/>
            <input type='file'
              onChange={this.handleFile.bind(this)}
              />
            <h1>选取文件</h1>
            <p>请提供应用图标，图片格式为jpg或png，大小为2M以内。</p>
          </li>
          <li>
            <span>提醒名称</span>
            <input type='text' placeholder='请输入提醒名称'
              onChange={this.handleName.bind(this)}
              value={this.state.name}
              />
          </li>
          <li>
            <span>提醒时间</span>
            <select className='notice-hours'
              onChange={this.handleHours.bind(this)}
              value={this.state.hours}
              >
              {
                (function(){
                  const arr= []
                  for(let i = 0; i<60; i++){
                    arr.push(<option  key={i} value={i< 10? '0'+i : i}>{i}</option>)
                  }
                  return arr
                })()
              }
            </select><span>时</span>
            <select className='notice-minutes'
              onChange={this.handleMinutes.bind(this)}
              value={this.state.minutes}
              >
              {
                (function(){
                  const arr= []
                  for(let i = 0; i<60; i++){
                    arr.push(<option key={i} value={i< 10? '0'+i : i}>{i}</option>)
                  }
                  return arr
                })()
              }
            </select><span>分</span>
          </li>
          <li>
            <span>语音文字</span>
            <input type='text' placeholder='请输入语音文字'
              onChange={this.handleVoice.bind(this)}
              value={this.state.voice_name}
              />
          </li>
          <li>
            <span>音乐id</span>
            <input type='text' placeholder='请输入音乐id'
              onChange={this.handleMusicId.bind(this)}
              value={this.state.music_id}
              />
          </li>
          <li>
            <span>权重</span>
            <select
              onChange={this.handleSort.bind(this)}
              value={this.state.sort}
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
          <li onClick={this.handleSubmit.bind(this)}>提交信息</li>
        </ul>
      </div>
    )
  }
  handleName(e){
    this.setState({name: e.target.value})
  }
  handleVoice(e){
    this.setState({voice_name: e.target.value})
  }
  handleSort(e){
    this.setState({sort: e.target.value})
  }
  handleMusicId(e){
    this.setState({music_id: e.target.value})
  }
  handleHours(e){
    this.setState({hours: e.target.value})
  }
  handleMinutes(e){
    this.setState({minutes: e.target.value})
  }
  handleFile(e){
    const fileReader= new FileReader()
    fileReader.readAsDataURL(e.target.files[0])
    fileReader.onload= () => {
      this.setState({fileUrl: fileReader.result})
    }
    this.setState({file: e.target.files[0]})
  }
  dispatchEditor(icon){
    const {name,voice_name, music_id, hours, sort, minutes} = this.state
    this.props.dispatch(addHabitPlanEvent(
      {
        name,
        voice_name,
        music_id,
        sort,
        icon,
        default_plan_id: this.props.location.state,
        time:hours+ ':' + minutes,
      }))
  }
  handleSubmit(){
    const {file} = this.state
    fileUpload(file,this.dispatchEditor.bind(this))
  }
}
export default connect()(AddEvent)
