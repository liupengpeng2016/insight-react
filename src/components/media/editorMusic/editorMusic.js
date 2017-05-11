import React, {Component} from 'react'
import './editorMusic.css'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {editorMusic} from '../../../redux/actions.js'
import {valid, validFile} from '../../../plugs/plugs.js'
import fileUpload from '../../../fileUpload/fileUpload.js'
class EditorMusic extends Component{
  constructor(props){
    super(props)
    this.state={
      category:'1',
      name: '',
      singer:'',
      duration:'',
      age:'',
      tags:'',
      desc:'',
      sort:'0',
      status_show: true,
      status_hide: false,
      file:'',
      fileUrl:''
    }
    this.valid={
      name:{
        change: false,
        notice:''
      },
      singer:{
        change:false,
        notice:''
      },
      duration:{
        change:false,
        notice:''
      },
      desc:{
        change:false,
        notice:''
      },
      file:{
        change:false,
        notice:''
      },
      tags:{
        change:false,
        notice:''
      },
      age:{
        change:false,
        notice:''
      }
    }

  }
  render(){
    return (
      <div className='toy-plan'>
        <h1>
          <Link to='/media/mediaList/music' className='media-title'>多媒体库></Link>
          <Link to='/media/mediaList/music' className='media-title'>音乐列表></Link>
          编辑音乐
        </h1>
        <h2>编辑音乐</h2>
        <ul className='add-item'>
          <li>
            <span>歌曲名称</span>
            <input type='text' placeholder='请输入歌曲名称'
              onChange={this.changeName.bind(this)}
              value={this.state.name}
              />
          </li>
          <i className='valid' style={!this.valid.name.change? {display: 'none'}: null}>{this.valid.name.notice= valid(this.state.name,['require'])}</i>
          <li>
            <span>歌曲描述</span>
            <input type='text' placeholder='请输入描述信息'
              onChange={this.changeDesc.bind(this)}
              value={this.state.desc}
            />
            <i className='valid' style={!this.valid.desc.change? {display: 'none'}: null}>{this.valid.desc.notice= valid(this.state.desc,['require'])}</i>
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
            <i className='valid' style={!this.valid.singer.change? {display: 'none'}: null}>{this.valid.singer.notice= valid(this.state.singer,['require'])}</i>
          </li>
          <li>
            <span>歌曲标签</span>
            <input type='text' placeholder='请输入歌曲标签, 多个用竖线分隔'
              onChange={this.changeTags.bind(this)}
              value={this.state.tags}
            />
            <i className='valid' style={!this.valid.tags.change? {display: 'none'}: null}>{this.valid.tags.notice= valid(this.state.tags,['require'])}</i>
          </li>
          <li>
            <span>歌曲时长</span>
            <input type='text' placeholder='请输入歌曲时长'
              onChange={this.changeDuration.bind(this)}
              value={this.state.duration}
              /> 秒
              <i className='valid' style={!this.valid.duration.change? {display: 'none'}: null}>{this.valid.duration.notice= valid(this.state.duration,['require','number'])}</i>
          </li>
          <li>
            <span>年龄</span>
            <input type='text'
              onChange={this.changeAge.bind(this)}
              value={this.state.age}
              />
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
            <i className='valid' style={!this.valid.file.change? {display: 'none'}: null}>{this.valid.file.notice= validFile(this.state.file,{size: 2*1024*1024, name:[/\.jpg$/,/\.png$/,/\.jpeg/]})}</i>
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
    const {name, age, sort, duration, singer, status, desc, tags, icon}= this.props.location.state
    this.setState({
      name,
      age,
      sort,
      singer,
      desc,
      tags,
      fileUrl: icon,
      file: 'ignore',
      duration: Number(duration)/1000,
      status_show: status? true : false,
      status_hide: !status? true: false,
      category:'1'
    })
  }
  changeName(e){
    this.valid.name.change= true
    this.setState({name: e.target.value, valid})
  }
  changeUrl(e){
    this.valid.url.change= true
    this.setState({url: e.target.value, valid})
  }

  changeDesc(e){
    this.valid.desc.change= true

    this.setState({desc: e.target.value})
  }
  changeCategory(e){
    this.setState({category: e.target.value})

  }
  changeSinger(e){
    this.valid.singer.change= true

    this.setState({singer: e.target.value})

  }
  changeAge(e){
    this.valid.age.change= true

    this.setState({age: e.target.value})
  }
  changeDuration(e){
    this.valid.duration.change= true

    this.setState({duration: e.target.value})
  }
  changeTags(e){
    this.valid.tags.change= true

    this.setState({tags: e.target.value})

  }
  changeFile(e){
    this.valid.file.change= true

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
      duration,
      age,
      tags,
      desc,
      sort,
      status_show,
    } = this.state
    const id = this.props.location.state.id||this.props.location.state.music_id
    this.props.dispatch(editorMusic({
      id,
      category,
      name,
      singer,
      age,
      tags,
      desc,
      sort,
      duration: Number(duration)*1000,
      icon:fileName,
      status: status_show ? 1: 0,
    }))
  }
  handleSubmit(){
    const {name, singer, age, tags, desc, duration,file} = this.valid
    if(name.notice||singer.notice||age.notice||tags.notice||desc.notice||duration.notice||file.notice){
      const keys= Object.keys(this.valid)
      for(let i of keys){
        this.valid[i].change= true
      }
      return this.forceUpdate()
    }

    fileUpload(this.state.file, this.dispatchSubmit.bind(this))
  }
}
export default connect()(EditorMusic)
