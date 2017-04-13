import React, { Component } from 'react'
import './otherPlatform.css'
import {connect} from 'react-redux'
import {addOtherPlatformMusic} from '../../../redux/actions.js'
import fileUpload from '../../../fileUpload/fileUpload.js'
class OtherPlatform extends Component{
  constructor(props){
    super(props)
    this.state={
      category:'1',
      name:'',
      singer:'',
      tags:'',
      age:'',
      desc:'',
      duration:'',
      sort:'0',
      url:'',
      file:'',
      imageUrl:'',
      statusShow:true,
      statusHide:false
    }
  }
  render(){
    return (
      <div className='content'>
        <ul className='add-item'>
          <li>
            <span>歌曲类别</span>
            <select
              onChange={this.handleCategory.bind(this)}
              value={this.state.category}
            >
              <option value='1'>儿童</option>
              <option value='2'>音乐</option>
              <option value='3'>教育</option>
            </select>
          </li>
          <li>
            <span>歌曲名称</span>
            <input type='text' placeholder='请输入名称'
              onChange={this.handleName.bind(this)}
              value={this.state.name}
            />
          </li>
          <li>
            <span>歌手名</span>
            <input type='text' placeholder='请输入歌手名'
              onChange={this.handleSinger.bind(this)}
              value={this.state.singer}
            />
          </li>
          <li>
            <span>年龄</span>
            <input type='text' placeholder='请输入年龄'
              onChange={this.handleAge.bind(this)}
              value={this.state.age}
            />
          </li>
          <li>
            <span>歌曲时长</span>
            <input type='text' placeholder='歌曲时长'
              onChange={this.handleDuration.bind(this)}
              value={this.state.duration}
            />
          </li>
          <li>
            <span>歌曲标签</span>
            <input type='text' placeholder='输入标签，多个用竖线分隔'
              onChange={this.handleTags.bind(this)}
              value={this.state.tags}
            />
          </li>
          <li>
            <span>歌曲描述</span>
            <input type='text' placeholder='请输入内容描述'
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
          <li>
            <span>歌曲播放链接</span>
            <input type='text' placeholder='输入歌曲云端链接'
              onChange={this.handleUrl.bind(this)}
              value={this.state.url}
            />
          </li>
          <li className='platform-status'>
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
          <li className='input-img'>
            <span>专辑封面</span>
            <img src={this.state.imageUrl} alt=''/>
            <input type='file'
              onChange={this.handleFile.bind(this)}
            />
            <h1>选择文件</h1>
            <p>图片格式为JPG或PNG,大小为2M以内。</p>
          </li>
          <li
            onClick={this.handleSubmit.bind(this)}
            >提交</li>
        </ul>
      </div>
    )
  }
  handleCategory(e){
    this.setState({category: e.target.value})
  }
  handleName(e){
    this.setState({name: e.target.value})
  }
  handleSinger(e){
    this.setState({singer: e.target.value})
  }
  handleTags(e){
    this.setState({tags: e.target.value})
  }
  handleDesc(e){
    this.setState({desc: e.target.value})
  }
  handleSort(e){
    this.setState({sort: e.target.value})
  }
  handleUrl(e){
    this.setState({url: e.target.value})
  }
  handleDuration(e){
    this.setState({duration: e.target.value})
  }
  handleAge(e){
    this.setState({age: e.target.value})
  }
  handleFile(e){
    const imgReader = new FileReader()
    this.setState({file: e.target.files[0]})
    imgReader.readAsDataURL(e.target.files[0])
    imgReader.onload=()=>{
      this.setState({imageUrl: imgReader.result})
    }
  }
  handleStatusShow(e){
    this.setState({
      statusShow: e.target.value,
      statusHide: !e.target.value
    })
  }
  handleStatusHide(e){
    this.setState({
      statusShow: !e.target.value,
      statusHide: e.target.value
    })
  }
  dispatchEditor(icon){
    const {category,name,singer,age,tags,duration,desc,sort,url,statusShow} = this.state
    this.props.dispatch(addOtherPlatformMusic({
      category,
      name,
      singer,
      url,
      duration,
      age,
      tags,
      desc,
      sort,
      icon,
      status: statusShow? '1' : '0'
    }))
  }
  handleSubmit(){
    const {file} = this.state
    fileUpload(file,this.dispatchEditor.bind(this))
  }
}
export default connect()(OtherPlatform)
