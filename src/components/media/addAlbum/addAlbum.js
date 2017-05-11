import React, {Component} from 'react'
import './addAlbum.css'
import {addAlbumItem} from '../../../redux/actions.js'
import fileUpload from '../../../fileUpload/fileUpload.js'
import {valid, validFile} from '../../../plugs/plugs.js'
import {connect} from 'react-redux'
import {Link} from 'react-router'
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
      imageUrl:'',
    }
    this.valid= {
      name:{
        notice:'',
        change:false
      },
      tags:{
        notice:'',
        change:false
      },
      desc:{
        notice:'',
        change:false
      },
      age:{
        notice:'',
        change:false
      },
      file:{
        notice:'',
        change:false
      }
    }
  }
  render(){
    return (
      <div className='root-media-list'>
        <h1>
          <Link to='/media/mediaList/music' className='media-title'>葡萄听听></Link>
          <Link to='/media/mediaList/album/albumList' className='media-title'>专辑列表></Link>
          新增专辑
        </h1>
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
            <i className='valid' style={!this.valid.name.change? {display: 'none'}: null}>{this.valid.name.notice= valid(this.state.name,['require'])}</i>
          </li>
          <li>
            <span>专辑标签</span>
            <input type='text' placeholder='请输入专辑标签'
              onChange={this.handleTags.bind(this)}
              value={this.state.tags}
            />
            <i className='valid' style={!this.valid.tags.change? {display: 'none'}: null}>{this.valid.tags.notice= valid(this.state.tags,['require'])}</i>
            <p><span></span>专辑标签有助于语音检索歌曲</p>
          </li>
          <li>
            <span>专辑描述</span>
            <input type='text' placeholder='请输入专辑描述'
              onChange={this.handleDesc.bind(this)}
              value={this.state.desc}
            />
            <i className='valid' style={!this.valid.desc.change? {display: 'none'}: null}>{this.valid.desc.notice= valid(this.state.desc,['require'])}</i>
          </li>
          <li>
            <span>年龄</span>
            <input type='text' placeholder='请输入年龄'
              onChange={this.handleAge.bind(this)}
              value={this.state.age}
            />
            <i className='valid' style={!this.valid.age.change? {display: 'none'}: null}>{this.valid.age.notice= valid(this.state.age,['require','number'])}</i>
          </li>
          <li className='input-img'>
            <span>专辑封面</span>
            <img  src={this.state.imageUrl} alt=''/>
            <i className='valid' style={!this.valid.file.change? {display: 'none'}: null}>{this.valid.file.notice= validFile(this.state.file,{size: 2*1024*1024, name:[/\.jpg$/,/\.png$/,/\.jpeg/]})}</i>
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
    this.valid.name.change= true
    this.setState({name:e.target.value})
  }
  handleAge(e){
    this.valid.age.change= true
    this.setState({age:e.target.value})
  }
  handleTags(e){
    this.valid.tags.change= true
    this.setState({tags:e.target.value})
  }
  handleDesc(e){
    this.valid.desc.change= true
    this.setState({desc:e.target.value})
  }
  handleSort(e){
    this.setState({sort:e.target.value})
  }
  handleFile(e){
    this.valid.file.change= true
    const imgReader = new FileReader()
    this.setState({file: e.target.files[0]})
    imgReader.readAsDataURL(e.target.files[0])
    imgReader.onload=()=>{
      this.setState({imageUrl: imgReader.result})
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
    const {name, tags, desc, age, file} = this.valid
    if(name.notice||tags.notice||desc.notice||age.notice||file.notice){
      const keys=Object.keys(this.valid)
      for(let i of keys){
        this.valid[i].change= true
      }
      return this.forceUpdate()
    }
    fileUpload(this.state.file,this.dispatchEditor.bind(this))
  }
}
export default connect()(AddAlbum)
