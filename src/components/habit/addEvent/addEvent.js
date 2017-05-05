import React, {Component} from 'react'
import './addEvent.css'
import {addHabitPlanEvent} from '../../../redux/actions.js'
import {connect} from 'react-redux'
import {valid, validFile} from '../../../plugs/plugs.js'
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
      fileUrl:'',
      loop:'0000000'
    }
    this.valid={
      name:{
        change:false,
        notice:''
      },
      music_id:{
        change:false,
        notice:''
      },
      file:{
        change:false,
        notice:''
      },
      voice_name:{
        change:false,
        notice:''
      }
    }
  }
  render(){
    return (
      <div className='toy-plan'>
        <h1>习惯养成>新增提醒</h1>
        <h2>设置提醒信息</h2>
        <ul className='add-item'>
          <li className='input-img'>
            <span>上传图片</span>
            <img src={this.state.fileUrl} alt=''/>
            <i className='valid' style={!this.valid.file.change? {display: 'none'}: null}>{this.valid.file.notice= validFile(this.state.file,{size: 2*1024*1024, name:[/\.jpg$/,/\.png$/,/\.jpeg/]})}</i>
            <input type='file'
              onChange={this.handleFile.bind(this)}
              />
            <h1>选取文件</h1>
            <p>请提供应用图标，图片格式为jpg或png，大小为2M以内(必选)。</p>
          </li>
          <li>
            <span>提醒名称</span>
            <input type='text' placeholder='请输入提醒名称'
              onChange={this.handleName.bind(this)}
              value={this.state.name}
              />
            <i className='valid' style={!this.valid.name.change? {display: 'none'}: null}>{this.valid.name.notice= valid(this.state.name,['require','maxLength:15'])}</i>
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
                  for(let i = 0; i<24; i++){
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
          <i className='valid' style={!this.valid.voice_name.change? {display: 'none'}: null}>{this.valid.voice_name.notice= valid(this.state.voice_name,['require','maxLength:25'])}</i>
          </li>
          <li>
            <span>提醒次数</span>
            <select
              onChange={e => this.setState({loop: e.target.value})}
              value={this.state.loop}
            >
              <option value='0000000'>仅一次</option>
              <option value='1111111'>每天</option>
              <option value='1000000'>每周一</option>
              <option value='0100000'>每周二</option>
              <option value='0010000'>每周三</option>
              <option value='0001000'>每周四</option>
              <option value='0000100'>每周五</option>
              <option value='0000010'>每周六</option>
              <option value='0000001'>每周日</option>
            </select>
          </li>
          <li>
            <span>音乐id</span>
            <input type='text' placeholder='请输入音乐id'
              onChange={this.handleMusicId.bind(this)}
              value={this.state.music_id}
            />
            <i className='valid' style={!this.valid.music_id.change? {display: 'none'}: null}>{this.valid.music_id.notice= valid(this.state.music_id,['require','number'])}</i>
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
    this.valid.name.change= true
    this.setState({name: e.target.value})
  }
  handleVoice(e){
    this.valid.voice_name.change= true
    this.setState({voice_name: e.target.value})
  }
  handleSort(e){
    this.setState({sort: e.target.value})
  }
  handleMusicId(e){
    this.valid.music_id.change= true
    this.setState({music_id: e.target.value})
  }
  handleHours(e){
    this.setState({hours: e.target.value})
  }
  handleMinutes(e){
    this.setState({minutes: e.target.value})
  }
  handleFile(e){
    this.valid.file.change= true
    this.setState({file: e.target.files[0]})
    const fileReader= new FileReader()
    fileReader.readAsDataURL(e.target.files[0])
    fileReader.onload= () => {
      this.setState({fileUrl: fileReader.result})
    }
  }
  dispatchEditor(icon){
    const {name,voice_name, music_id, hours, sort, minutes,loop} = this.state
    this.props.dispatch(addHabitPlanEvent(
      {
        name,
        voice_name,
        music_id,
        sort,
        icon,
        loop,
        default_plan_id: this.props.location.state,
        time:hours+ ':' + minutes,
      }))
  }
  handleSubmit(){
    const {name, music_id, file, voice_name,} = this.valid
    if(name.notice||music_id.notice||file.notice||voice_name.notice){
      const keys=Object.keys(this.valid)
      for(let i of keys){
        this.valid[i].change= true
      }
      return this.forceUpdate()
    }
    fileUpload(this.state.file,this.dispatchEditor.bind(this))
  }
}
export default connect()(AddEvent)
