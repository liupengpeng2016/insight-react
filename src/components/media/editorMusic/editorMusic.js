import React, {Component} from 'react'
import './editorMusic.css'
import {connect} from 'react-redux'
import {editorMusic} from '../../../redux/actions.js'
import fileUpload from '../../../fileUpload/fileUpload.js'
import {valid} from '../../../plugs/plugs.js'
class EditorMusic extends Component{
  constructor(props){
    super(props)
    this.state={
      category:'',
      name: '',
      singer:'',
      url:'',
      druation:'',
      age:'',
      tags:'',
      desc:'',
      sort:'',
      status_show: true,
      status_hide: false,
      file:'',
      fileUrl:'',
      valid:{
        name: undefined,
        singer: undefined,
        url: undefined,
        duration: undefined,
        age: undefined,
        tags: undefined,
        desc: undefined,
        sort: undefined,
        file: undefined,
      }
    }
  }
  render(){
    return (
      <div className='editor-music'>
        <h1>多媒体库>音乐列表>编辑音乐</h1>
        <h2>编辑音乐</h2>
        <ul className='add-item'>
          <li>
            <span>歌曲名称</span>
            <input type='text' placeholder='请输入歌曲名称'
              onChange={this.changeName.bind(this)}
              value={this.state.name}
              />
          </li>
          <i className='valid'>{this.state.name=== undefined? '': valid(this.state.name,{'不能为空': 'require'})}</i>
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
            <span>作者名称</span>
            <input type='text' placeholder='请输入作者名称'
              onChange={this.changeSinger.bind(this)}
              value={this.state.singer}
              />
          </li>
          <li>
            <span>歌曲标签</span>
            <input type='text' placeholder='请输入歌曲标签, 多个用竖线分隔'
              onChange={this.changeTags.bind(this)}
              value={this.state.tags}
              />
          </li>
          <li>
            <span>歌曲时长</span>
            <input type='text' placeholder='请输入歌曲时长'
              onChange={this.changeDuration.bind(this)}
              value={parseInt(this.state.duration/1000, 10)}
              /> 秒
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
    const {name, duration, age, sort, status, singer}= this.props.location.state
    this.setState({
      name,
      duration,
      age,
      sort,
      singer,
      status_show: status? true : false,
      status_hide: !status? true: false,
      category:'1'
    })
  }
  changeName(e){
    const valid= Object.assing({}, this.state.valid)
    valid.name= 1
    this.setState({name: e.target.value, valid})
  }
  changeDesc(e){
    this.setState({desc: e.target.value})
  }
  changeCategory(e){
    this.setState({category: e.target.value})

  }
  changeSinger(e){
    this.setState({singer: e.target.value})

  }
  changeAge(e){
    this.setState({age: e.target.value})
  }
  changeDuration(e){
    this.setState({duration: parseInt(e.target.value, 10)*1000})
  }
  changeTags(e){
    this.setState({tags: e.target.value})

  }
  changeFile(e){
    const imgReader = new FileReader()
    imgReader.readAsDataURL(e.target.files[0])
    this.setState({file: e.target.files[0]})
    imgReader.onload=()=>{
      this.setState({fileUrl: imgReader.result})
    }
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
  changeSort(e){
    this.setState({sort: e.target.value})
  }
  dispatchSubmit(fileName){
    const {
      category,
      name,
      singer,
      url,
      duration,
      age,
      tags,
      desc,
      sort,
      status_show,
    } = this.state
    const { id }= this.props.location.state
    this.props.dispatch(editorMusic({
      id,
      category,
      name,
      singer,
      url,
      age,
      tags,
      desc,
      sort,
      duration,
      icon:fileName,
      status: status_show ? 1: 0,
    }))
  }
  handleSubmit(){
    const valid= Object.assign({}, this.state.valid)
    const keys= Object.keys(valid)
    for(let i of keys){
      valid[i]= 1
    }
    this.setState({valid})
    fileUpload(this.state.file, this.dispatchSubmit.bind(this))
  }
}
export default connect()(EditorMusic)
