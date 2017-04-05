import React, {Component} from 'react'
import './addPlan.css'
import {addHabitPlan} from '../../../redux/actions.js'
import {connect} from 'react-redux'
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
      file:''
    }
  }
  render(){
    console.log(this)
    return (
      <div className='content'>
        <h1>习惯养成>新增计划</h1>
        <h2>设置计划信息</h2>
        <ul className='add-item'>
          <li className='input-img'>
            <span>图标</span>
            <img src={this.state.fileUrl} alt=''/>
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
          </li>
          <li>
            <span>计划描述</span>
            <input type='text' placeholder='请输入描述信息'
              onChange={this.handleDesc.bind(this)}
              value={this.state.desc}
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
          <li className='add-plan-interval'>
            <span>时间间隔</span>
            <input type='text'
              onChange={this.handleTime.bind(this)}
              value={this.state.time_interval}
            />分
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
          <li onClick={this.handleClick.bind(this)}>提交信息</li>
        </ul>
      </div>
    )
  }
  handleName(e){
    this.setState({name: e.target.value})
  }
  handleDesc(e){
    this.setState({desc: e.target.value})
  }
  handleSort(e){
    this.setState({sort: e.target.value})
  }
  handleTime(e){
    this.setState({time_interval: e.target.value})
  }
  handleStatusShow(e){
    this.setState({statusShow: e.target.checked, statusHide: !e.target.checked})
  }
  handleStatusHide(e){
    this.setState({statusShow: !e.target.checked, statusHide: e.target.checked})
  }
  handleFile(e){
    const fileReader1= new FileReader()
    const fileReader2= new FileReader()
    fileReader1.onload= () => {
      this.setState({file: e.target.files[0]})
    }
    fileReader2.readAsDataURL(e.target.files[0])
    fileReader2.onload= () => {
      this.setState({fileUrl: fileReader2.result})
    }
  }
  handleClick(){
    const {name,desc,sort,time_interval, file, statusShow} = this.state
    this.props.dispatch(addHabitPlan(
      {
        name,
        desc,
        sort,
        appid:this.props.location.state,
        time_interval,
        icon: file,
        status: statusShow ? 1 : 0,
      }))
  }
}
export default connect()(AddPlan)
