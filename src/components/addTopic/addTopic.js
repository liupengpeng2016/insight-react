import React, {Component} from 'react'
import './addTopic.css'
import {addTopicItem} from '../../redux/actions.js'
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
  }

  render(){
    return (
      <div className='add-media content'>
        <h1>葡萄听听>专题列表>新增专题</h1>
        <h2>新增专题</h2>
        <ul>
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
            <input type='text' placeholder='请输入专辑名称'
              onChange={this.handleName.bind(this)}
              value={this.state.name}
            />
          </li>
          <li>
            <span>权重</span>
            <input type='text'
              onChange={this.handleSort.bind(this)}
              value={this.state.sort}
              />
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
        </ul>
        <p onClick={this.handleClick.bind(this)}>提交</p>
      </div>
    )
  }
  handleLocation(e){
    this.setState({type:e.target.value})
  }
  handleName(e){
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
