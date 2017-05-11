import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {editorToyInformation} from '../../../redux/actions.js'
import {valid, validFile} from '../../../plugs/plugs.js'
import fileUpload from '../../../fileUpload/fileUpload.js'
class EditorToyInformation extends Component{
  constructor(){
    super()
    this.state={
      name:'',
      file:'ignore',
      desc:'',
      fileUrl:''
    }
    this.valid={
      name:{
        change:false,
        notice:''
      },
      file:{
        change:false,
        notice:''
      },
      desc:{
        change:false,
        notice:''
      }
    }
  }
  render(){
    return (
      <div className='toy-plan'>
      <h1>
        <Link to='/toy/toyPlan/shake' className='media-title'>玩偶设置></Link>
        编辑玩偶
      </h1>
      <h2>编辑玩偶信息</h2>
      <ul className='add-item'>
        <li>
          <span>名字</span>
          <input type='text' placeholder='请输入玩偶名字'
            onChange={this.handleName.bind(this)}
            value={this.state.name}
          />
          <i className='valid' style={!this.valid.name.change? {display: 'none'}: null}>{this.valid.name.notice= valid(this.state.name,['require'])}</i>
        </li>
        <li>
          <span>描述</span>
          <input type='text' placeholder='请输入描述信息'
            onChange={this.handleDesc.bind(this)}
            value={this.state.desc}
          />
        <i className='valid' style={!this.valid.desc.change? {display: 'none'}: null}>{this.valid.desc.notice= valid(this.state.desc,['require'])}</i>
        </li>
        <li className='input-img'>
          <span>专辑封面</span>
          <img  src={this.state.fileUrl} alt=''/>
          <i className='valid' style={!this.valid.file.change? {display: 'none'}: null}>{this.valid.file.notice= validFile(this.state.file,{size: 2*1024*1024, name:[/\.jpg$/,/\.png$/,/\.jpeg/]})}</i>
          <input type='file'
            onChange={this.handleFile.bind(this)}
          />
          <h1>选择文件</h1>
          <p>图片格式为JPG或PNG,大小为2M以内。</p>
        </li>
        <li onClick={this.handleSubmit.bind(this)}>
           提交
        </li>
      </ul>
      </div>
    )
  }
  componentDidMount(){
    if(!this.state.name){
      console.log(this.props)
      const editorData= this.props.location.state
      const {name, desc, icon}= editorData
      this.setState({name,desc,fileUrl: icon})
    }
  }
  handleName(e){
    this.valid.name.change= true
    this.setState({name:e.target.value})
  }
  handleDesc(e){
    this.valid.desc.change= true
    this.setState({desc:e.target.value})
  }
  handleFile(e){
    this.valid.file.change= true
    const imgReader = new FileReader()
    this.setState({file: e.target.files[0]||''})
    if(e.target.files[0]){
      imgReader.readAsDataURL(e.target.files[0])
      imgReader.onload=()=>{
        this.setState({fileUrl: imgReader.result})
      }
    }else{
      this.setState({fileUrl: ''})
    }
  }
  dispatchEditor(icon){
    const {name, desc} = this.state
    this.props.dispatch(editorToyInformation({
      name,
      desc,
      icon
    }))
  }
  handleSubmit(){
    const {name, desc, file} = this.valid
    if(name.notice||desc.notice||file.notice){
      const keys=Object.keys(this.valid)
      for(let i of keys){
        this.valid[i].change= true
      }
      return this.forceUpdate()
    }
    fileUpload(this.state.file,this.dispatchEditor.bind(this))
  }
}
export default connect()(EditorToyInformation)
