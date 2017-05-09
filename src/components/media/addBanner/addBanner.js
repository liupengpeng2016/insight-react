import React, {Component} from 'react'
import './addBanner.css'
import {addBannerItem} from '../../../redux/actions.js'
import {connect} from 'react-redux'
import {valid, validFile} from '../../../plugs/plugs.js'
import fileUpload from '../../../fileUpload/fileUpload.js'
class AddBanner extends Component{
  constructor(props){
    super(props)
    this.state={
      location:'1',
      content_album:true,
      content_url:false,
      desc:'',
      sort:'0',
      url:'',
      statusShow:true,
      statusHide:false,
      imageUrl:'',
      file:''
    }
    this.valid= {
      desc:{
        notice:'',
        change:false
      },
      url:{
        notice:'',
        change:false
      },
      file:{
        notice:'',
        change:false
      }
    }
  }
  render(){
    return (
      <div className='root-media-list'>
        <h1>葡萄听听>banner列表>新增banner</h1>
        <h2>新增banner</h2>
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
            <span>Banner类型</span>
            <input type='checkbox' id='album' name='banner'
              onChange={this.handleContent_album.bind(this)}
              checked={this.state.content_album}
            />
            <label htmlFor='album'>
              歌曲专辑
            </label>
            <input type='checkbox' id='url' name='banner'
              onChange={this.handleContent_url.bind(this)}
              checked={this.state.content_url}
            />
            <label htmlFor='url'>
              网页URL
            </label>
            <p>
              <span></span>
              <input type='text' placeholder='请输入歌曲专辑ID或网络url'
                onChange={this.handleUrl.bind(this)}
                value={this.state.url}
              />
              <i className='valid' style={!this.valid.url.change? {display: 'none'}: null}>
                {
                  this.valid.url.notice= this.state.content_url?
                  valid(this.state.url,['require','url']):
                  valid(this.state.url,['require','number'])
                }
              </i>
            </p>
          </li>
          <li>
            <span>Banner描述</span>
            <input type='text' placeholder='请输入专辑简介'
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
          <li className='input-img'>
            <span>上传图片</span>
            <img src={this.state.imageUrl} alt=''/>
            <i className='valid' style={!this.valid.file.change? {display: 'none'}: null}>{this.valid.file.notice= validFile(this.state.file,{size: 2*1024*1024, name:[/\.jpg$/,/\.png$/,/\.jpeg/]})}</i>
            <input type='file'
              onChange={this.handleFile.bind(this)}
            />
            <h1>选择文件</h1>
            <p>图片格式为JPG或PNG,大小为2M以内。</p>
          </li>
          <li>
            <span>状态</span>
              <input type='checkbox' id='banner-show' name='status'
                onChange={this.handleStatusShow.bind(this)}
                checked={this.state.statusShow}
              />
              <label htmlFor='banner-show'>显示</label>
              <input type='checkbox' id='banner-hide' name='status'
                onChange={this.handleStatusHide.bind(this)}
                checked={this.state.statusHide}
              />
              <label htmlFor='banner-hide'>隐藏</label>
          </li>
          <li onClick={this.handleSubmit.bind(this)}>提交</li>
        </ul>
      </div>
    )
  }
  handleLocation(e){
    this.setState({location:e.target.value})
  }
  handleUrl(e){
    this.valid.url.change= true
    this.setState({url:e.target.value})
  }
  handleDesc(e){
    this.valid.desc.change= true
    this.setState({desc:e.target.value})
  }
  handleSort(e){
    this.setState({sort:e.target.value})
  }
  handleContent_url(e){
    this.setState({
      content_url:e.target.checked,
      content_album:!e.target.checked
    })
  }
  handleContent_album(e){
    this.setState({
      content_album:e.target.checked,
      content_url:!e.target.checked
    })
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
  handleFile(e){
    this.valid.file.change= true
    const imgReader = new FileReader()
    this.setState({file: e.target.files[0]})
    imgReader.readAsDataURL(e.target.files[0])
    imgReader.onload=()=>{
      this.setState({imageUrl: imgReader.result})
    }
  }
  dispatchEditor(pic){
    const {location, url, desc, sort} = this.state
    this.props.dispatch(addBannerItem({
      location,
      pic,
      url,
      desc,
      sort,
      category: this.state.content_album ? 1 : 2,
      status:this.state.statusShow ? 1 : 0
    }))
  }
  handleSubmit(){
    const {desc, file, url}= this.valid
    if(desc.notice||file.notice||url.notice){
      const keys= Object.keys(this.valid)
      for(let i of keys){
        this.valid[i].change= true
      }
      return this.forceUpdate()

    }
    fileUpload(this.state.file,this.dispatchEditor.bind(this))
  }

}
export default connect()(AddBanner)
