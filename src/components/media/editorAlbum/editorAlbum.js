import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editorAlbum} from '../../../redux/actions.js'
import fileUpload from '../../../fileUpload/fileUpload.js'
class EditorAlbum extends Component{
  constructor(props){
    super(props)
    this.state={
      category:'1',
      name:'',
      age:'1',
      tags:'',
      file:'',
      desc:'',
      sort:'0',
      statusShow:true,
      statusHide:false,
      imgUrl:''
    }
  }
  render(){
    return (
      <div className='editor-music'>
        <h1>多媒体库>专辑列表>编辑专辑</h1>
        <h2>编辑专辑</h2>
        <ul className='add-item'>
          <li>
            <span>歌曲名称</span>
            <input type='text' placeholder='请输入歌曲名称'
              onChange={this.changeName.bind(this)}
              value={this.state.name}
              />
          </li>
          <li>
            <span>歌曲描述</span>
            <input type='text' placeholder='请输入描述信息'
              onChange={this.changeDesc.bind(this)}
              value={this.state.desc}
              />
          </li>
          <li>
            <span>选择类型</span>
            <select
              onChange={this.changeCategory.bind(this)}
              value={this.state.category}
              >
              <option value='1'>儿童</option>
              <option value='2'>音乐</option>
              <option value='3'>教育</option>
            </select>
          </li>
          <li>
            <span>专辑标签</span>
            <input type='text' placeholder='请输入专辑标签多个用竖线分隔'
              onChange={this.changeTags.bind(this)}
              value={this.state.tags}
            />
          </li>
          <li>
            <span>年龄段</span>
            <select
              onChange={this.changeAge.bind(this)}
              value={this.state.age}
              >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
            </select>
            <span className='age'>至</span>
            <select>
              <option value=''>0</option>
            </select>
          </li>
          <li>
            <span>权重</span>
            <select
              onChange={this.changeSort.bind(this)}
              value={this.state.sort}
              >
              <option value='0'> 0 </option>
              <option value='1'> 1 </option>
              <option value='2'> 2 </option>
              <option value='3'> 3 </option>
            </select>
          </li>
          <li>
            <span>状态</span>
              <input type='checkbox' id='banner-show' name='editor'
                onChange={this.changeStatusShow.bind(this)}
                checked={this.state.statusShow}
                />
              <label htmlFor='banner-show'>显示</label>
              <input type='checkbox' id='banner-hide' name='editor'
                onChange={this.changeStatusHide.bind(this)}
                checked={this.state.statusHide}
                />
              <label htmlFor='banner-hide'>隐藏</label>
          </li>
          <li  className='input-img'>
            <span>上传图片</span>
            <span>查看歌词</span>
            <img src={this.state.imgUrl} alt=''/>
            <input type='file'
              onChange={this.changeImg.bind(this)}
              />
            <h1>选取文件</h1>
            <p>歌词格式为lrc，大小为200kb以内。</p>
          </li>
          <li onClick={this.handleSubmit.bind(this)}>编辑信息</li>
        </ul>
      </div>
    )
  }
  changeName(e){
    this.setState({name: e.target.value})
  }
  changeDesc(e){
    this.setState({desc: e.target.value})
  }
  changeCategory(e){
    this.setState({category: e.target.value})
  }
  changeSort(e){
    this.setState({sort: e.target.value})
  }
  changeAge(e){
    this.setState({age: e.target.value})
  }
  changeTags(e){
    this.setState({tags: e.target.value})
  }
  changeImg(e){
    const imgReader = new FileReader()
    imgReader.readAsDataURL(e.target.files[0])
    imgReader.onload=()=>{
      this.setState({imgUrl: imgReader.result})
    }
    this.setState({file: e.target.files[0]})
  }
  changeStatusShow(e){
    this.setState({
      statusShow: e.target.checked,
      statusHide: !e.target.checked
    })
  }
  changeStatusHide(e){
    this.setState({
      statusHide: e.target.checked,
      statusShow: !e.target.checked
    })
  }
  handleClick(){
  }
  dispatchEditor(cover){
    const {category,name,age,tags,desc,sort,statusShow} = this.state
    this.props.dispatch(editorAlbum({
      category,
      name,
      age,
      tags,
      cover,
      desc,
      sort,
      id: this.props.location.state.id,
      status: statusShow ? 1 : 0
    }))
  }
  handleSubmit(){
    const {file} = this.state
    fileUpload(file,this.dispatchEditor.bind(this))
  }
}
export default connect()(EditorAlbum)
