import React, {Component} from 'react'
import './addBanner.css'
class AddBanner extends Component{
  constructor(props){
    super(props)
    this.state={
      type:'',
      content:'',
      album:'',
      desc:'',
      sort:'0',
      icon:'',
      status:'1',
      statusShow:true,
      statusHide:false,
      musicAlubm:true,
      htmlUrl:false,
      musicImg:'',
      imageUrl:''
    }
  }
  render(){
    return (
      <div className='add-media content'>
        <h1>葡萄听听>banner列表>新增banner</h1>
        <h2>新增banner</h2>
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
            <span>Banner内容</span>
            <input type='checkbox' id='album' name='banner'
              onChange={this.handleMusicAlbum.bind(this)}
              checked={this.state.musicAlubm}
            />
            <label htmlFor='album'>
              歌曲专辑
            </label>
            <input type='checkbox' id='url' name='banner'
              onChange={this.handleHtmlUrl.bind(this)}
              checked={this.state.htmlUrl}
            />
            <label htmlFor='url'>
              网页URL
            </label>
            <p>
              <span></span>
              <input type='text' placeholder='请输入歌曲专辑/网络URL'
                onChange={this.handleAlbum.bind(this)}
                value={this.state.album}
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
        </ul>
        <p onClick={this.handleClick.bind(this)}>提交</p>
      </div>
    )
  }
  handleType(e){
    this.setState({type:e.target.value})
  }
  handleContent(e){
    this.setState({content:e.target.checked})
  }
  handleAlbum(e){
    this.setState({album:e.target.value})
  }
  handleDesc(e){
    this.setState({desc:e.target.value})
  }
  handleSort(e){
    this.setState({sort:e.target.value})
  }
  handleIcon(e){
    this.setState({icon:e.target.value})
  }
  handleMusicAlbum(e){
    this.setState({
      musicAlubm:e.target.checked,
      htmlUrl:!e.target.checked
    })
  }
  handleHtmlUrl(e){
    this.setState({
      musicAlubm:!e.target.checked,
      htmlUrl:e.target.checked
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
      this.setState({musicImg: imgReader1.result})
    }
    imgReader2.readAsDataURL(e.target.files[0])
    imgReader2.onload=()=>{
      this.setState({imageUrl: imgReader2.result})
    }
  }

  handleClick(){
  }
}
export default AddBanner
