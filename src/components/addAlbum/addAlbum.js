import React, {Component} from 'react'
import './addAlbum.css'
class AddAlbum extends Component{
  constructor(props){
    super(props)
    this.state={
      type:'',
      name:'',
      label:'',
      icon:'',
      sort:'0',
      status:'1'
    }
  }
  render(){
    return (
      <div className='add-media content'>
        <h1>葡萄听听>专辑列表>新增专辑</h1>
        <h2>新增专辑</h2>
        <ul>
          <li>
            <span>选择分类</span>
            <select
              onChange={this.handleType.bind(this)}
              value={this.state.type}
            >
              <option value=''>故事类型</option>
            </select>
          </li>
          <li>
            <span>专辑名称</span>
            <input type='text' placeholder='请输入专辑名称'
              onChange={this.handleName.bind(this)}
              value={this.state.name}
            />
          </li>
          <li>
            <span>专辑标签</span>
            <input type='text' placeholder='请输入专辑标签'
              onChange={this.handleLabel.bind(this)}
              value={this.state.label}
            />
            <p><span></span>专辑标签有助于语音检索歌曲</p>
          </li>
          <li className='input-img'>
            <span>专辑封面</span>
            <img alt=''/>
            <input type='file'
              onChange={this.handleIcon.bind(this)}
              value={this.state.icon}
            />
            <h1>选择文件</h1>
            <p>图片格式为JPG或PNG,大小为2M以内。</p>
          </li>
          <li>
            <span>权重</span>
            <select
              onChange={this.handleSort.bind(this)}
              value={this.state.sort}
            >
              <option value=''>0</option>
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
  handleLabel(e){
    this.setState({label:e.target.value})
  }
  handleSort(e){
    this.setState({sort:e.target.value})
  }
  handleIcon(e){
    this.setState({icon:e.target.value})
  }
  handleStauts(e){
    this.setState({status:e.target.checked})
  }
  handleClick(){
  }
}
export default AddAlbum
