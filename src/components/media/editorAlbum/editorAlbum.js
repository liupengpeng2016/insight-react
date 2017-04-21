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
      desc:'',
      sort:'0',
      status_show:'',
      status_hide:'',
      file:'',
      fileUrl:''
    }
  }
  render(){
    return (
      <div className='editor-music'>
        <h1>多媒体库>专辑列表>编辑专辑</h1>
        <h2>编辑专辑</h2>
        <ul className='add-item'>
          <li>
            <span>专辑名称</span>
            <input type='text' placeholder='请输入专辑名称'
              onChange={this.changeName.bind(this)}
              value={this.state.name}
              />
          </li>
          <li>
            <span>专辑描述</span>
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
            <span>年龄</span>
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
              <option value='10'>10</option>
              <option value='11'>11</option>
              <option value='12'>12</option>
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
              <option value='4'> 4 </option>
              <option value='5'> 5 </option>
              <option value='6'> 6 </option>
              <option value='7'> 7 </option>
              <option value='8'> 8 </option>
              <option value='9'> 9 </option>
              <option value='10'> 10 </option>
            </select>
          </li>
          <li>
            <span>状态</span>
              <input type='checkbox' id='banner-show' name='editor'
                onChange={this.changeStatus_show.bind(this)}
                checked={this.state.status_show}
                />
              <label htmlFor='banner-show'>显示</label>
              <input type='checkbox' id='banner-hide' name='editor'
                onChange={this.changeStatus_hide.bind(this)}
                checked={this.state.status_hide}
                />
              <label htmlFor='banner-hide'>隐藏</label>
          </li>
          <li  className='input-img'>
            <span>上传图片</span>
            <img src={this.state.fileUrl} alt=''/>
            <input type='file'
              onChange={this.changeFile.bind(this)}
              />
            <h1>选取文件</h1>
            <p>图片格式为jpg/png，大小为2M以内。</p>
          </li>
          <li onClick={this.handleSubmit.bind(this)}>编辑信息</li>
        </ul>
      </div>
    )
  }
  componentDidMount(){
    const {name, category, age, sort, status} = this.props.location.state
    console.log(this.props.location.state)
    this.setState({
      name,
      category,
      age,
      sort,
      status_show: status? true: false,
      status_hide: !status? true: false
    })
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
  changeFile(e){
    const imgReader = new FileReader()
    imgReader.readAsDataURL(e.target.files[0])
    imgReader.onload=()=>{
      this.setState({fileUrl: imgReader.result})
    }
    this.setState({file: e.target.files[0]})
  }
  changeStatus_show(e){
    this.setState({
      status_show: e.target.checked,
      status_hide: !e.target.checked
    })
  }
  changeStatus_hide(e){
    this.setState({
      status_hide: e.target.checked,
      status_show: !e.target.checked
    })
  }
  handleClick(){
  }
  dispatchEditor(cover){
    const {category,name,age,tags,desc,sort,status_show} = this.state
    this.props.dispatch(editorAlbum({
      category,
      name,
      age,
      tags,
      cover,
      desc,
      sort,
      id: this.props.location.state.id,
      status: status_show ? 1 : 0
    }))
  }
  handleSubmit(){
    const {file} = this.state
    fileUpload(file,this.dispatchEditor.bind(this))
  }
}
export default connect()(EditorAlbum)
