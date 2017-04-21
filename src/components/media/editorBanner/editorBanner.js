import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editorBanner} from '../../../redux/actions.js'
import fileUpload from '../../../fileUpload/fileUpload.js'
class EditorBanner extends Component{
  constructor(props){
    super(props)
    this.state={
      location:'1',
      category:'',
      url:'',
      album_id:'',
      desc:'',
      sort:'',
      statusShow:true,
      statusHide:false,
      file:'',
      fileUrl:''
    }
  }
  render(){
    const {category, url, album_id}= this.state
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
            <select
              onChange={this.handleCategory.bind(this)}
              value={this.state.category}
              >
              <option value='1'>歌曲专辑</option>
              <option value='2'>网络URL</option>
            </select>
            <p>
              <span></span>
              <input type='text' placeholder={this.state.category === '1'? '请输入专辑id':'请输入网络url'}
                onChange={this.handleUrl.bind(this)}
                value={(function(){
                  switch(category){
                    case '1':
                    return album_id
                    case '2':
                    return url
                    default: return 'hehe'
                  }
                })()}
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
            <img src={this.state.fileUrl} alt=''/>
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
  componentDidMount(){
    const {name, category, desc, sort, status, url, pic}= this.props.location.state
    this.setState({
      name,
      desc,
      url,
      category: String(category),
      sort: String(sort),
      statusShow: status? true : false,
      statusHide: !status? true: false,
      fileUrl: pic
    })
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
  handleCategory(e){
    this.setState({category:e.target.value})
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
    const imgReader = new FileReader()
    this.setState({file: e.target.files[0]})
    imgReader.readAsDataURL(e.target.files[0])
    imgReader.onload=()=>{
      this.setState({fileUrl: imgReader.result})
    }
  }
  dispatchEditor(pic){
    const {location, desc, sort, url, statusShow, category} = this.state
    this.props.dispatch(editorBanner({
      location,
      desc,
      sort,
      url,
      category,
      pic:pic||'',
      id: this.props.location.state.id,
      status: statusShow ? 1 : 0,
    }))
  }
  handleSubmit(){
    const {file} = this.state
    fileUpload(file,this.dispatchEditor.bind(this))
  }
}
export default connect()(EditorBanner)
