import React, { Component } from 'react'
import './otherPlatform.css'
import {connect} from 'react-redux'
class OtherPlatform extends Component{
  constructor(props){
    super(props)
    this.state={
      type:'',
      name:'',
      label:'',
      desc:'',
      author:'',
      sort:'',
      url:'',
      album:'',
      albumId:''
    }
  }
  render(){
    return (
        <div className='otherPlatform'>
          <h1>歌曲列表</h1>
          <p>
            <span>歌曲类别</span>
            <select
              onChange={this.handleType.bind(this)}
              value={this.state.type}
            >
              <option value=''>请选择类型</option>
            </select>
          </p>
          <p>
            <span>歌曲名称</span>
            <input type='text' placeholder='请输入名称'
              onChange={this.handleName.bind(this)}
              value={this.state.name}
            />
          </p>
          <p>
            <span>歌曲标签</span>
            <input type='text' placeholder='输入标签，多个用竖线分隔'
              onChange={this.handleLabel.bind(this)}
              value={this.state.label}
            />
          </p>
          <p>
            <span>歌曲描述</span>
            <input type='text' placeholder='请输入内容描述'
              onChange={this.handleDesc.bind(this)}
              value={this.state.desc}
            />
          </p>
          <p>
            <span>作者名称</span>
            <input type='text' placeholder='请输入作者姓名'
              onChange={this.handleAuthor.bind(this)}
              value={this.state.author}
            />
          </p>
          <p>
            <span>权重</span>
            <input type='text' placeholder='0'
              onChange={this.handleSort.bind(this)}
              value={this.state.sort}
            />
          </p>
          <p>
            <span>歌曲播放链接</span>
            <input type='text' placeholder='输入歌曲云端链接'
              onChange={this.handleUrl.bind(this)}
              value={this.state.url}
            />
          </p>
          <p>
            <span>所属专辑</span>
            <select
              onChange={this.handleAlbum.bind(this)}
              value={this.state.album}
            >
              <option value=''>选择专辑</option>
            </select>
          </p>
          <p>
            <span>所属专辑ID</span>
            <input type='text' placeholder='请输入专辑所属ID'
              onChange={this.handleAlbumId.bind(this)}
              value={this.state.albumId}
            />
          </p>
          <input type='button' value='提交'
            onClick={this.handleClick.bind(this)}
          />
          <h2>
            自行上传的歌曲请确保拥有所上传歌曲的版权，出现人和版权问题，非葡萄科技人员，概不负责
          </h2>
        </div>
    )
  }
  handleType(e){
    this.setState({type: e.target.value})
  }
  handleName(e){
    this.setState({name: e.target.value})
  }
  handleLabel(e){
    this.setState({label: e.target.value})
  }
  handleDesc(e){
    this.setState({desc: e.target.value})
  }
  handleAuthor(e){
    this.setState({author: e.target.value})
  }
  handleSort(e){
    this.setState({sort: e.target.value})
  }
  handleUrl(e){
    this.setState({url: e.target.value})
  }
  handleAlbum(e){
    this.setState({album: e.target.value})
  }
  handleAlbumId(e){
    this.setState({albumId: e.target.value})
  }
  handleClick(){
    
  }
}
export default connect()(OtherPlatform)
