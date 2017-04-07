import React, {Component} from 'react'
import './addAlbum.css'
import {addAlbumItem} from '../../../redux/actions.js'
import fileUpload from '../../../fileUpload/fileUpload.js'
import {connect} from 'react-redux'
class AddAlbum extends Component{
  constructor(props){
    super(props)
    this.state={
      category:'1',
      name:'',
      tags:'',
      sort:'0',
      desc:'',
      age:'',
      statusShow:true,
      statusHide:false,
      file:'',
      imageUrl:''
    }
  }
  render(){
    return (
      <div className='root-media-list'>
        <h1>葡萄听听>专辑列表>新增专辑</h1>
        <h2>新增专辑</h2>
        <ul className='add-item'>
          <li>
            <span>选择分类</span>
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
            <span>专辑名称</span>
            <input type='text' placeholder='请输入专辑名称'
              onChange={this.handleName.bind(this)}
              value={this.state.name}
            />
          </li>
          <li>
            <span>专辑标签</span>
            <input type='text' placeholder='请输入专辑标签'
              onChange={this.handleTags.bind(this)}
              value={this.state.tags}
            />
            <p><span></span>专辑标签有助于语音检索歌曲</p>
          </li>
          <li>
            <span>专辑描述</span>
            <input type='text' placeholder='请输入专辑描述'
              onChange={this.handleDesc.bind(this)}
              value={this.state.desc}
            />
          </li>
          <li>
            <span>年龄</span>
            <input type='text' placeholder='请输入年龄'
              onChange={this.handleAge.bind(this)}
              value={this.state.age}
            />
          </li>
          <li className='input-img'>
            <span>专辑封面</span>
            <img  src={this.state.imageUrl} alt=''/>
            <input type='file'
              onChange={this.handleFile.bind(this)}
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
          <li onClick={this.handleSubmit.bind(this)}>提交</li>
        </ul>
      </div>
    )
  }
  handleCategory(e){
    this.setState({category:e.target.value})
  }
  handleName(e){
    this.setState({name:e.target.value})
  }
  handleAge(e){
    this.setState({age:e.target.value})
  }
  handleTags(e){
    this.setState({tags:e.target.value})
  }
  handleDesc(e){
    this.setState({desc:e.target.value})
  }
  handleSort(e){
    this.setState({sort:e.target.value})
  }
  handleFile(e){
    const imgReader2 = new FileReader()
    this.setState({file: e.target.files[0]})
    imgReader2.readAsDataURL(e.target.files[0])
    imgReader2.onload=()=>{
      this.setState({imageUrl: imgReader2.result})
    }
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
  dispatchEditor(cover){
    const {category,name,age,tags,desc,sort} = this.state
    this.props.dispatch(addAlbumItem({
      category,
      name,
      age,
      tags,
      desc,
      sort,
      cover,
      status:this.state.statusShow ? 1 : 0
    }))
  }
  handleSubmit(){
    const {file} = this.state
    fileUpload(file,this.dispatchEditor.bind(this))
  }
}
export default connect()(AddAlbum)
