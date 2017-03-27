import React, {Component} from 'react'
import './editorMusic.css'
import {connect} from 'react-redux'
import {editorMusic} from '../../redux/actions.js'
class EditorMusic extends Component{
  constructor(props){
    super(props)
    this.state={
      musicName:'',
      musicDesc:'',
      musicType:'',
      musicAuthor:'',
      musicAge:'1',
      musicAblum:'',
      musicImg:'',
      musicSort:'0',
      musicStatusShow:true,
      musicStatusHide:false,
      imgUrl:''
    }
  }
  render(){
    return (
      <div className='add-media editor-music'>
        <ul>
          <li>
            <span>歌曲名称</span>
            <input type='text' placeholder='请输入歌曲名称'
              onChange={this.changeName.bind(this)}
              value={this.state.musicName}
              />
          </li>
          <li>
            <span>歌曲描述</span>
            <input type='text' placeholder='请输入描述信息'
              onChange={this.changeDesc.bind(this)}
              value={this.state.musicDesc}
              />
          </li>
          <li>
            <span>选择类型</span>
            <select
              onChange={this.changeType.bind(this)}
              value={this.state.musicType}
              >
              <option value='1'>儿童</option>
              <option value='2'>音乐</option>
              <option value='3'>教育</option>
            </select>
          </li>
          <li>
            <span>作者名称</span>
            <input type='text' placeholder='请输入作者名称'
              onChange={this.changeAuthor.bind(this)}
              value={this.state.musicAuthor}
              />
          </li>
          <li>
            <span>年龄段</span>
            <select
              onChange={this.changeAge.bind(this)}
              value={this.state.musicAge}
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
            <span>所属专辑</span>
            <select
              onChange={this.changeAlbum.bind(this)}
              value={this.state.musicAlbum}
              >
              <option value=''></option>
            </select>
          </li>
          <li>
            <span>权重</span>
            <select
              onChange={this.changeSort.bind(this)}
              value={this.state.musicSort}
              >
              <option value='0'> 0 </option>
              <option value='1'> 1 </option>
              <option value='2'> 2 </option>
              <option value='3'> 3 </option>
            </select>
          </li>
          <li>
            <span>状态</span>
              <input type='radio' id='banner-show' name='editor'
                onChange={this.changeStatusShow.bind(this)}
                checked={this.state.musicStatusShow}
                />
              <label htmlFor='banner-show'>显示</label>
              <input type='radio' id='banner-hide' name='editor'
                onChange={this.changeStatusHide.bind(this)}
                checked={this.state.musicStatusHide}
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
        </ul>
        <p onClick={this.handleClick.bind(this)}>编辑信息</p>
      </div>
    )
  }
  changeName(e){
    this.setState({musicName: e.target.value})
  }
  changeDesc(e){
    this.setState({musicDesc: e.target.value})
  }
  changeType(e){
    this.setState({musicType: e.target.value})

  }
  changeOrigin(e){
    this.setState({musicOrigin: e.target.value})

  }
  changeAge(e){
    this.setState({musicAge: e.target.value})

  }
  changeAlbum(e){
    this.setState({musicAlbum: e.target.value})

  }
  changeImg(e){
    const imgReader1 = new FileReader()
    const imgReader2 = new FileReader()
    imgReader1.readAsBinaryString(e.target.files[0])
    imgReader1.onload=() =>{
      this.setState({musicImg: imgReader1.result})
    }
    imgReader2.readAsDataURL(e.target.files[0])
    imgReader2.onload=()=>{
      this.setState({imgUrl: imgReader2.result})
    }
  }
  changeStatusShow(e){
    this.setState({
      musicStatusShow: e.target.checked,
      musicStatusHide: !e.target.checked,

    })
  }
  changeStatusHide(e){
    this.setState({
      musicStatusHide: e.target.checked,
      musicStatusShow: !e.target.checked,

    })
  }

  changeAuthor(e){
    this.setState({musicAuthor: e.target.value})
  }
  changeSort(e){
    this.setState({musicSort: e.target.value})

  }
  handleClick(){
    this.props.dispatch(editorMusic({
      id: this.props.location.state.id,
      category: this.state.musicType,
      name: this.state.musicName,
      singer: this.state.musicAuthor,
      url: '',
      duration: this.props.location.state.duration,
      age: this.state.musicAge,
      tags: '',
      icon: this.state.musicImg,
      desc: this.state.musicDesc,
      sort: this.state.musicSort,
      status: this.state.musicStatusShow ? 1 : 0
    }))
  }
}
export default connect()(EditorMusic)
