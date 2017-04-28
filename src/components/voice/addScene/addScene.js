import React, {Component} from 'react'
import {valid} from '../../../plugs/plugs.js'
class AddScene extends Component {
  constructor(){
    super()
    this.state={
      name:'',
      desc:'',
      ename:''
    }
    this.valid= {
      name:{
        change: false,
        notice:''
      },
      desc:{
        change: false,
        notice:''
      },
      ename:{
        change: false,
        notice:''
      }
    }
  }
  render(){
    const {isShow, hide}= this.props
    return (
      <div className='editor-scene'
        style={isShow? null: {display:'none'}}
      >
        <div className='editor-scene-data'>
          <h1>添加一级场景<span onClick={hide}>×</span></h1>
          <ul>
            <li>
              <span>场景名</span>
              <input type='text' placeholder='请输入场景名称'
                onChange={this.handleName.bind(this)}
                value={this.state.name}
              />
              <span></span><i className='valid' style={!this.valid.name.change? {visibility: 'hidden'}: null}>{this.valid.name.notice= valid(this.state.name,['require'])}</i>
              <p className='editor-scene-notice'></p>
            </li>
            <li>
              <span>场景英文</span>
              <input type='text' placeholder='请输入场景英文名称'
                onChange={this.handleEname.bind(this)}
                value={this.state.ename}
              />
              <span></span><i className='valid' style={!this.valid.ename.change? {visibility: 'hidden'}: null}>{this.valid.ename.notice= valid(this.state.ename,['require'])}</i>
              <p className='editor-scene-notice'>场景英文(唯一不可变) (命名示例S_RULE)</p>
            </li>
            <li>
              <span>场景描述</span>
              <input type='text' placeholder='请输入描述信息'
                onChange={this.handleDesc.bind(this)}
                value={this.state.desc}
              />
              <span></span><i className='valid' style={!this.valid.desc.change? {visibility: 'hidden'}: null}>{this.valid.desc.notice= valid(this.state.desc,['require'])}</i>
              <p className='editor-scene-notice'></p>
            </li>
          </ul>
          <p onClick={this.handleSubmit.bind(this)}>保存</p>
        </div>
      </div>
    )
  }
  handleName(e){
    this.valid.name.change= true
    this.setState({name: e.target.value})
  }
  handleEname(e){
    this.valid.ename.change= true
    this.setState({ename: e.target.value})
  }
  handleDesc(e){
    this.valid.desc.change= true
    this.setState({desc: e.target.value})
  }
  handleSubmit(){
    if(this.valid.name.notice||this.valid.ename.notice||this.valid.desc.notice){
      const keys=Object.keys(this.valid)
      for(let i of keys){
        this.valid[i].change= true
      }
      return this.forceUpdate()
    }
    const {addSubmit} = this.props
    const {name, desc, ename} = this.state
    const params= {
      name,
      ename,
      desc
    }
    addSubmit(params)
  }
}
export default AddScene
