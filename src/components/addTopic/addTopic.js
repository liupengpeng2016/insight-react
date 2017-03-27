import React, {Component} from 'react'
import './addTopic.css'
class AddTopic extends Component{
  constructor(props){
    super(props)
    this.state={
      type:'',
      name:'',
      desc:'',
      sort:'0',
      status:'1'
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
              onChange={this.handleType.bind(this)}
              value={this.state.type}
            >
              <option value=''>故事类型</option>
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
            <span>专题简介</span>
            <input type='text' placeholder='请输入专题简介'
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
            </select>
          </li>
          <li>
            <span>状态</span>
              <input type='checkbox' id='banner-show'
                onChange={this.handleStatus.bind(this)}
                value={this.state.status}
              />
              <label htmlFor='banner-show'>显示</label>
              <input type='checkbox' id='banner-hide'/>
              <label htmlFor='banner-hide'>隐藏</label>
          </li>
        </ul>
        <p onClick={this.handleClick.bind(this)}>提交</p>
      </div>
    )
  }
  handleType(e){
    this.setState({type:e.target.value})
  }
  handleName(e){
    this.setState({name:e.target.value})
  }
  handleSort(e){
    this.setState({sort:e.target.value})
  }
  handleStauts(e){
    this.setState({status:e.target.checked})
  }
  handleDesc(e){
    this.setState({desc:e.target.value})
  }
  handleClick(){
  }
}
export default AddTopic
