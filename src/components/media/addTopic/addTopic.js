import React, {Component} from 'react'
import {Link} from 'react-router'
import './addTopic.css'
import {addTopicItem} from '../../../redux/actions.js'
import {valid} from '../../../plugs/plugs.js'

import {connect} from 'react-redux'
class AddTopic extends Component{
  constructor(props){
    super(props)
    this.state={
      location:'1',
      name:'',
      sort:'0',
      statusShow:true,
      statusHide:false
    }
    this.valid={
      name:{
        change:false,
        notice:''
      }
    }
  }

  render(){
    return (
      <div className='root-media-list'>
        <h1>
          <Link to='/media/mediaList/music' className='media-title'>葡萄听听></Link>
          <Link to='/media/mediaList/topic/topicList' className='media-title'>专题列表></Link>
          新增专题
        </h1>
        <h2>新增专题</h2>
        <ul className='add-item'>
          <li>
            <span>选择位置</span>
            <select
              onChange={this.handleLocation.bind(this)}
              value={this.state.location}
            >
              <option value='1'>首页</option>
              <option value='2'>故事</option>
              <option value='3'>儿歌</option>
              <option value='4'>音乐</option>
            </select>
          </li>
          <li>
            <span>输入名称</span>
            <input type='text' placeholder='请输入专题名称'
              onChange={this.handleName.bind(this)}
              value={this.state.name}
            />
            <i className='valid' style={!this.valid.name.change? {display: 'none'}: null}>{this.valid.name.notice= valid(this.state.name,['require'])}</i>
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
          <li>
            <span>状态</span>
              <input type='checkbox' id='banner-show'
                onChange={this.handleStatusShow.bind(this)}
                checked={this.state.statusShow}
              />
              <label htmlFor='banner-show'>显示</label>
              <input type='checkbox' id='banner-hide'
                onChange={this.handleStatusHide.bind(this)}
                checked={this.state.statusHide}
              />
              <label htmlFor='banner-hide'>隐藏</label>
          </li>
          <li onClick={this.handleClick.bind(this)}>提交</li>
        </ul>
      </div>
    )
  }
  handleLocation(e){
    this.setState({location:e.target.value})
  }
  handleName(e){
    this.valid.name.change= true
    this.setState({name:e.target.value})
  }
  handleSort(e){
    this.setState({sort:e.target.value})
  }
  handleStatusShow(e){
    this.setState({
      statusShow:e.target.checked,
      statusHide:!e.target.checked
    })
  }
  handleStatusHide(e){
    this.setState({
      statusShow:!e.target.checked,
      statusHide:e.target.checked
    })
  }
  handleClick(){
    if(this.valid.name.notice){
      this.valid.name.change= true
      return this.forceUpdate()
    }
    const  {location, name, sort} = this.state
    this.props.dispatch(addTopicItem({
      location,
      name,
      sort,
      status:this.state.statusShow? 1 : 0
    }))
  }
}
export default connect()(AddTopic)
