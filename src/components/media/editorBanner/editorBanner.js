import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editorBanner} from '../../../redux/actions.js'
import fileUpload from '../../../fileUpload/fileUpload.js'
class EditorBanner extends Component{
  constructor(props){
    super(props)
    this.state={
      location:'',
      url:'',
      desc:'',
      sort:'',
      statusShow:true,
      statusHide:false,
      content_album:true,
      content_url: false,
      imgUrl:'',
      file:''
    }
  }
  render(){
    return (
      <div className='root-media-list'>
        <h1>葡萄听听>banner列表>编辑banner</h1>
        <h2>编辑banner</h2>
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
            </p>
          </li>
          <li>
            <span>Banner描述</span>
            <input type='text' placeholder='请输入Banner简介'
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
          <li className='input-img'>
            <span>上传图片</span>
            <img src={this.state.imageUrl} alt=''/>
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
    this.setState({url:e.target.value})
  }
  handleDesc(e){
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
    const imgReader2 = new FileReader()
    this.setState({file: e.target.files[0]})
    imgReader2.readAsDataURL(e.target.files[0])
    imgReader2.onload=()=>{
      this.setState({imageUrl: imgReader2.result})
    }
  }
  dispatchEditor(pic){
    const {location, desc, sort, url, statusShow, content_album} = this.state
    this.props.dispatch(editorBanner({
      location,
      pic,
      desc,
      sort,
      url,
      id: this.props.location.state.id,
      status: statusShow ? 1 : 0,
      cagegory: content_album? 1 :2
    }))
  }
  handleSubmit(){
    const {file} = this.state
    fileUpload(file,this.dispatchEditor.bind(this))
  }
}
export default connect()(EditorBanner)
