import React, {Component} from 'react'
import {addHabitPlan} from '../../../redux/actions.js'
import {connect} from 'react-redux'
import {valid, validFile} from '../../../plugs/plugs.js'
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
    }
    this.valid={
      name:{
        change:false,
        notice:''
      },
      desc:{
        change:false,
        notice:''
      },
      time_interval:{
        change:false,
        notice:''
      },
      file:{
        change:false,
        notice:''
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
            <i className='valid' style={!this.valid.file.change? {display: 'none'}: null}>{this.valid.file.notice= validFile(this.state.file,{size: 2*1024*1024, name:[/\.jpg$/,/\.png$/,/\.jpeg/]})}</i>
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
          <i className='valid' style={!this.valid.name.change? {display: 'none'}: null}>{this.valid.name.notice= valid(this.state.name,['require'])||this.moreValid_words(this.state.name,/^\S{1,15}$/u, 1, 15)}</i>
          </li>
          <li>
            <span>计划描述</span>
            <input type='text' placeholder='请输入描述信息'
              onChange={this.handleDesc.bind(this)}
              value={this.state.desc}
            />
            <i className='valid' style={!this.valid.desc.change? {display: 'none'}: null}>{this.valid.desc.notice= valid(this.state.desc,['require'])||this.moreValid_words(this.state.desc,/^\S{1,25}$/u, 1, 25)}</i>
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
            <i className='valid' style={!this.valid.time_interval.change? {display: 'none'}: null}>{this.valid.time_interval.notice= valid(this.state.time_interval,['require','number'])||this.moreValid_time(this.state.time_interval, 15*60)}</i>
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
  moreValid_time(target, time){
    if(Number(target)>time){
      return '间隔不能超过15分钟！'
    }
    return ''
  }
  moreValid_words(target, reg, min, max){
    if(!reg.test(target)){
      return '字数为'+min+'个到'+max +'个!'
    }
    return ''
  }
  handleName(e){
    this.valid.name.change= true
    this.setState({name: e.target.value})
  }
  handleDesc(e){
    this.valid.desc.change= true
    this.setState({desc: e.target.value})
  }
  handleSort(e){
    this.setState({sort: e.target.value})
  }
  handleTime(e){
    this.valid.time_interval.change= true
    this.setState({time_interval: e.target.value})
  }
  handleStatusShow(e){
    this.setState({statusShow: e.target.checked, statusHide: !e.target.checked})
  }
  handleStatusHide(e){
    this.setState({statusShow: !e.target.checked, statusHide: e.target.checked})
  }
  handleFile(e){
    this.valid.file.change= true
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
    const {name, desc, time_interval, file} = this.valid
    if(name.notice||desc.notice||time_interval.notice||file.notice){
      const keys=Object.keys(this.valid)
      for(let i of keys){
        this.valid[i].change= true
      }
      return this.forceUpdate()
    }
    fileUpload(this.state.file,this.dispatchEditor.bind(this))
  }
}
export default connect()(AddPlan)
