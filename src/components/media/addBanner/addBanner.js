import React, {Component} from 'react'
import './addBanner.css'
import {addBannerItem} from '../../../redux/actions.js'
import {connect} from 'react-redux'
class AddBanner extends Component{
  constructor(props){
    super(props)
    this.state={
      location:'1',
      content_album:true,
      content_url:false,
      desc:'',
      pic:'',
      sort:'0',
      url:'',
      statusShow:true,
      statusHide:false,
      imageUrl:''
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
            <span>Banner内容</span>
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
              <input type='text' placeholder='请输入歌曲专辑或网络url'
                onChange={this.handleUrl.bind(this)}
                value={this.state.url}
                />
            </p>
          </li>
          <li>
            <span>Banner描述</span>
            <input type='text' placeholder='请输入专辑简介'
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
          <li onClick={this.handleClick.bind(this)}>提交</li>
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
    const imgReader1 = new FileReader()
    const imgReader2 = new FileReader()
    imgReader1.readAsBinaryString(e.target.files[0])
    imgReader1.onload=() =>{
      this.setState({pic: imgReader1.result})
    }
    imgReader2.readAsDataURL(e.target.files[0])
    imgReader2.onload=()=>{
      this.setState({imageUrl: imgReader2.result})
    }
  }

  handleClick(){
    const {location, pic, url, desc, sort} = this.state
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
}
export default connect()(AddBanner)
