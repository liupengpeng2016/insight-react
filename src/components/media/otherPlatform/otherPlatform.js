import React, { Component } from 'react'
import './otherPlatform.css'
import {connect} from 'react-redux'
import {addOtherPlatformMusic} from '../../../redux/actions.js'
import {valid, validFile} from '../../../plugs/plugs.js'
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
      fileUrl:'',
      statusShow:true,
      statusHide:false
    }
    this.valid={
      name:{
        change: false,
        notice:''
      },
      singer:{
        change:false,
        notice:''
      },
      tags:{
        change:false,
        notice:''
      },
      age:{
        change:false,
        notice:''
      },
      url:{
        change:false,
        notice:''
      },
      desc:{
        change:false,
        notice:''
      },
      duration:{
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
      <div >
        <ul className='add-item'>
          <li>
            <span>歌曲类别</span>
            <select
              onChange={this.handleCategory.bind(this)}
              value={this.state.category}
            >
              <option value='1'>故事</option>
              <option value='2'>儿歌</option>
              <option value='3'>音乐</option>
            </select>
          </li>
          <li>
            <span>歌曲名称</span>
            <input type='text' placeholder='请输入名称'
              onChange={this.handleName.bind(this)}
              value={this.state.name}
            />
            <i className='valid' style={!this.valid.name.change? {display: 'none'}: null}>{this.valid.name.notice= valid(this.state.name,['require'])}</i>
          </li>
          <li>
            <span>歌手名</span>
            <input type='text' placeholder='请输入歌手名'
              onChange={this.handleSinger.bind(this)}
              value={this.state.singer}
            />
            <i className='valid' style={!this.valid.singer.change? {display: 'none'}: null}>{this.valid.singer.notice= valid(this.state.singer,['require'])}</i>
          </li>
          <li>
            <span>年龄</span>
            <input type='text' placeholder='请输入年龄'
              onChange={this.handleAge.bind(this)}
              value={this.state.age}
            />
            <i className='valid' style={!this.valid.age.change? {display: 'none'}: null}>{this.valid.age.notice= valid(this.state.age,['require','number'])}</i>
          </li>
          <li>
            <span>歌曲时长</span>
            <input type='text' placeholder='歌曲时长'
              onChange={this.handleDuration.bind(this)}
              value={this.state.duration}
            /> 秒
            <i className='valid' style={!this.valid.duration.change? {display: 'none'}: null}>{this.valid.duration.notice= valid(this.state.duration,['require','number'])}</i>
          </li>
          <li>
            <span>歌曲标签</span>
            <input type='text' placeholder='输入标签，多个用竖线分隔'
              onChange={this.handleTags.bind(this)}
              value={this.state.tags}
            />
            <i className='valid' style={!this.valid.tags.change? {display: 'none'}: null}>{this.valid.tags.notice= valid(this.state.tags,['require'])}</i>
          </li>
          <li>
            <span>歌曲描述</span>
            <input type='text' placeholder='请输入内容描述'
              onChange={this.handleDesc.bind(this)}
              value={this.state.desc}
            />
            <i className='valid' style={!this.valid.desc.change? {display: 'none'}: null}>{this.valid.desc.notice= valid(this.state.desc,['require'])}</i>
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
            <i className='valid' style={!this.valid.url.change? {display: 'none'}: null}>{this.valid.url.notice= valid(this.state.url,['require','url'])}</i>
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
            <img src={this.state.fileUrl} alt=''/>
            <i className='valid' style={!this.valid.file.change? {display: 'none'}: null}>{this.valid.file.notice= validFile(this.state.file,{size: 2*1024*1024, name:[/\.jpg$/,/\.png$/,/\.jpeg/]})}</i>
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
    this.valid.name.change= true
    this.setState({name: e.target.value, valid})
  }
  handleSinger(e){
    this.valid.singer.change= true
    this.setState({singer: e.target.value, valid})
  }
  handleTags(e){
    this.valid.tags.change= true
    this.setState({tags: e.target.value, valid})
  }
  handleDesc(e){
    this.valid.desc.change= true
    this.setState({desc: e.target.value, valid})
  }
  handleSort(e){
    this.setState({sort: e.target.value})
  }
  handleUrl(e){
    this.valid.url.change= true
    this.setState({url: e.target.value, valid})
  }
  handleDuration(e){
    this.valid.duration.change= true

    this.setState({duration:e.target.value, valid})
  }
  handleAge(e){
    this.valid.age.change= true
    this.setState({age:e.target.value, valid})
  }
  handleFile(e){
    this.valid.file.change= true
    const imgReader = new FileReader()
    this.setState({file: e.target.files[0]})
    imgReader.readAsDataURL(e.target.files[0])
    imgReader.onload=()=>{
      this.setState({fileUrl: imgReader.result})
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
      age,
      tags,
      desc,
      sort,
      icon: icon||'',
      duration:Number(duration)*1000,
      status: statusShow? '1' : '0'
    }))
  }
  handleSubmit(){
    const {name, singer, url, age, tags, desc,duration,file } = this.valid
    if(name.notice||singer.notice||url.notice||age.notice||tags.notice||desc.notice||duration.notice||file.notice){
      const keys= Object.keys(this.valid)
      for(let i of keys){
        this.valid[i].change= true
      }
      return this.forceUpdate()
    }
    fileUpload(this.state.file,this.dispatchEditor.bind(this))
  }
}
export default connect()(OtherPlatform)
