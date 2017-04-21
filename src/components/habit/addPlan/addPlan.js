import React, {Component} from 'react'
import {addHabitPlan} from '../../../redux/actions.js'
import {connect} from 'react-redux'
import fileUpload from '../../../fileUpload/fileUpload.js'
class AddPlan extends Component{
  constructor(props){
    super(props)
    this.state={
      name:'',
      desc:'',
      sort:'0',
      time_interval:'',
      statusShow: true,
      statusHide: false,
      fileUrl: '',
      file:'',
      valid:{
        file:undefined,
        name:undefined,
        desc:undefined,
        time_interval: undefined
      }
    }
  }
  render(){
    return (
      <div className='habit-plan'>
        <h1>习惯养成>添加计划</h1>
        <h2>添加计划信息</h2>
        <ul className='add-item'>
          <li className='input-img'>
            <span>图标</span>
            <img src={this.state.fileUrl} alt=''/>
            <i className='valid'
              style={this.state.valid.file === false? null: {display:'none'}}
              >图片不符合要求!</i>
            <input type='file'
              onChange={this.handleFile.bind(this)}
              />
            <h1>选取文件</h1>
            <p>请提供应用图标，图片格式为jpg或png，大小为2M以内。</p>
          </li>
          <li>
            <span>计划名称</span>
            <input type='text' placeholder='请输入计划名称'
              onChange={this.handleName.bind(this)}
              value={this.state.name}
              />
            <span className='valid'
              style={(()=>{
                if(this.state.valid.name ===false ){
                  return null
                }
                return {display:'none'}
              })()}
              >1-15 个汉字!
            </span>
          </li>
          <li>
            <span>计划描述</span>
            <input type='text' placeholder='请输入描述信息'
              onChange={this.handleDesc.bind(this)}
              value={this.state.desc}
              />
            <span className='valid'
              style={(()=>{
                if(this.state.valid.desc ===false ){
                  return null
                }
                return {display:'none'}
              })()}
              >1-25 个汉字!
            </span>
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
          <li className='add-plan-interval'>
            <span>时间间隔</span>
            <input type='text'
              onChange={this.handleTime.bind(this)}
              value={this.state.time_interval}
            /> 秒
            <i className='valid'
              style={this.state.valid.time_interval === false? null: {display:'none'}}
              >间隔小于15分钟，且必须为数字！</i>
          </li>
          <li>
            <span>状态</span>
              <input type='checkbox' id='banner-show' name='editor'
                onChange={this.handleStatusShow.bind(this)}
                checked={this.state.statusShow}
                />
              <label htmlFor='banner-show'>显示</label>
              <input type='checkbox' id='banner-hide' name='editor'
                onChange={this.handleStatusHide.bind(this)}
                checked={this.state.statusHide}
                />
              <label htmlFor='banner-hide'>隐藏</label>
          </li>
          <li onClick={this.handleSubmit.bind(this)}>提交信息</li>
        </ul>
      </div>
    )
  }
  handleName(e){
    const valid= Object.assign({}, this.state.valid)
    valid.name= /^.{1,15}$/u.test(e.target.value)
    this.setState({name: e.target.value, valid})
  }
  handleDesc(e){
    const valid= Object.assign({}, this.state.valid)
    valid.desc= /^.{1,25}$/u.test(e.target.value)
    this.setState({desc: e.target.value, valid})
  }
  handleSort(e){
    this.setState({sort: e.target.value})
  }
  handleTime(e){
    const userInput= e.target.value
    const valid= Object.assign({}, this.state.valid)
    valid.time_interval= /\d+/.test(userInput) && Number(userInput, 10)<15*60
    this.setState({time_interval: userInput,valid})
  }
  handleStatusShow(e){
    this.setState({statusShow: e.target.checked, statusHide: !e.target.checked})
  }
  handleStatusHide(e){
    this.setState({statusShow: !e.target.checked, statusHide: e.target.checked})
  }
  handleFile(e){
    const userInput= e.target.files[0]
    const valid= Object.assign({}, this.state.valid)
    valid.file= userInput.size>2*1024*1024? false: true
    this.setState({file:userInput, valid})

    const fileReader= new FileReader()
    fileReader.readAsDataURL(e.target.files[0])
    fileReader.onload= () => {
      this.setState({fileUrl: fileReader.result})
    }
    this.setState({file: e.target.files[0]})
  }
  dispatchEditor(icon){
    const {name,desc,sort,time_interval, statusShow} = this.state
    this.props.dispatch(addHabitPlan(
      {
        name,
        desc,
        sort,
        icon,
        time_interval: Number(time_interval)*1000,
        appid: this.props.location.state,
        status: statusShow ? 1 : 0
      }))
  }
  handleSubmit(){
    const {name, desc, time_interval, file} = this.state.valid
    const valid= Object.assign({}, this.state.valid)
    if(!file){
      valid.file= false
      return this.setState({valid})
    }
    if(!name){
      valid.name= false
      return this.setState({valid})
    }
    if(!desc){
      valid.desc= false
      return this.setState({valid})
    }
    if(!time_interval){
      valid.time_interval= false
      return this.setState({valid})
    }
    fileUpload(this.state.file,this.dispatchEditor.bind(this))
  }
}
export default connect()(AddPlan)
