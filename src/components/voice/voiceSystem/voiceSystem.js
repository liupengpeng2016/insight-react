import React, {Component} from 'react'
import './voiceSystem.css'
import {Link} from 'react-router'
import {connect} from 'react-redux'
class VoiceSystem extends Component{
  render(){
    const activeCss={borderBottom: '5px solid #5cc1df'}
    return (
      <div className='toy-plan'>
        <h1>语料系统</h1>
        <h2>语料系统</h2>
        <ul className='toy-plan-tabs'>
          <li><Link to='/voice/voiceSystem/voiceManage' activeStyle={activeCss}>语料管理</Link></li>
          <li><Link to='/voice/voiceSystem/sceneManage' activeStyle={activeCss}>场景管理</Link></li>
          <li><Link to='/voice/voiceSystem/record' activeStyle={activeCss}>录入记录</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
export default connect()(VoiceSystem)
