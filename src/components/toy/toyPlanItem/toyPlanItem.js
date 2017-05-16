import React, {Component} from 'react'
import {Link} from 'react-router'
import './toyPlanItem.css'
import {connect} from 'react-redux'
import {delToyAction, getToyPlan, setVisibility} from '../../../redux/actions.js'
class ToyPlanItem extends Component{
  constructor(){
    super()
    this.state={
      checkbox:{},
      buttonMode:1
    }
  }
  render(){
    let {itemData, toyPlan, target} = this.props
    itemData= itemData||{}
    const {name, icon, desc} = toyPlan
    return (
      <ul className='toy-plan-item'>
        <li>
          <h1>动作说明</h1>
          <table>
            <tbody>
              <tr>
                <td>动作说明</td>
              </tr>
              <tr><td>{itemData.desc}</td></tr>
            </tbody>
          </table>
          <p className='submit'><Link to={{pathname: '/toy/editorToyAction', state: this.props.target}}>编辑玩偶动作</Link></p>
        </li>
        <li>
          <h2>语音播放顺序：{itemData.play_order=== 'rand'? '顺序播放': '随机播放'}</h2>
          <table>
            <tbody>
              <tr>
                <td>序号</td>
                <td>动作内容</td>
                <td>音频试听</td>
                <td>音频地址</td>
                <td>更新时间</td>
                <td>操作</td>
              </tr>
              {
                (itemData.contents||[]).map((val, i)=>{
                  return (
                    <tr key={i}>
                      <td>{val.id}</td>
                      <td>{val.content}</td>
                      <td>
                        {
                        <div className='play-music'>
                          <audio src={val.audio_url}></audio>
                          <p
                            style={{color:'#5cc1df',cursor:'pointer'}}
                            onClick={this.handleMusic.bind(this)}>
                            点击试听
                          </p>
                        </div>
                        }</td>
                      <td>
                        <input type='text' value={val.audio_url}
                          style={{
                            position:'absolute',
                            zIndex:'-3'
                          }} readOnly
                        />
                      <span
                        style={{color:'#5cc1df',cursor:'pointer'}}
                        onClick={this.copyUrl.bind(this)}
                      >点击复制</span>
                      </td>
                      <td>{val.updated_at.slice(0,10)}</td>
                      <td>
                        {
                          this.state.buttonMode ? (
                            <div className='operate-button'>
                              <span className='del-button'
                                onClick={this.handleDel.bind(this, val.id)}
                                style={{cursor:'pointer'}}
                                >删除</span>
                            </div>
                          ) : (
                            <div className='operate-button'>
                              <input type='checkbox'
                                checked={this.state.checkbox[val.id] || false}
                                onChange={this.handleChecked.bind(this, val.id)}
                                />
                            </div>
                          )
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <ul className='button-operate-all'
            style={this.state.buttonMode?{display:'none'}:null}
            >
            <li className='del-all'
              onClick={this.handleDelAll.bind(this)}
              >批量删除</li>
            <li className='choose-all'
              onClick={this.chooseAll.bind(this)}
              >全选</li>
            <li onClick={()=> this.setState({buttonMode:1})}>退出</li>
          </ul>
          <p className='button-change-mode'
            onClick={this.handleButtonMode.bind(this)}
            style={!this.state.buttonMode?{display:'none'}:null}
            >批量管理
          </p>
          <p className='submit'>
            <Link to={{
                pathname:'/toy/addToyAction',
                state:target
              }}>新增动作内容</Link>
          </p>
        </li>
        <li className='toy-introduce'>
          <h1>玩偶简介</h1>
          <table>
            <tbody>
              <tr>
                <td>玩偶名称</td>
                <td>{name}</td>
              </tr><tr>
                <td>玩偶描述</td>
                <td>{desc}</td>
              </tr>
              <tr>
                <td>图标</td>
                <td><img src={icon} alt=''/></td>
              </tr>
              <tr>
                <td>玩偶简介</td>
                <td>哆啦A梦只能陪伴玩偶基于动画片《哆啦A梦》中的人物形象为原型，原生原味的声音，可以问更多关于哆啦A梦的问题。</td>
              </tr>
              <tr>
                <td>功能简介</td>
                <td>
                  <p>1.微信聊天</p>
                  <p>2.语音互动</p>
                  <p>3.智能互动</p>
                  <p>4.听故事、儿歌、音乐</p>
                </td>
              </tr>
            </tbody>
          </table>
          <p className='submit'><Link to={
              {
                pathname:'/toy/editorToyInformation',
                state:{name,desc,icon}
              }
            }>编辑玩偶信息</Link></p>
        </li>
      </ul>
    )
  }
  handleChecked(id, e){
    const checkbox= Object.assign({}, this.state.checkbox, {[id]: e.target.checked})
    this.setState({checkbox})
  }
  handleButtonMode(){
    this.setState({buttonMode: 0})
  }
  chooseAll(id){
    const checkbox= Object.assign({}, this.state.checkbox)
    const keys= Object.keys(checkbox)
    const checked= !checkbox[keys[0]]
    for(let i of keys){
      checkbox[i] = checked
    }
    this.setState({checkbox})
  }
  handleDel(id){
    this.props.dispatch(delToyAction({ids: [id]},this.props.dispatch(getToyPlan())))
  }
  handleDelAll(){
    const {checkbox} = this.state
    const keys = Object.keys(checkbox)
    const ids=[]
    for(let i of keys){
      if(checkbox[i]){
        ids.push(i)
      }
    }
    if(!ids.length){
      return this.props.dispatch(setVisibility({name:'FETCH_NOTICE', show: true, msg:'请选择一个或多个内容！'}))
    }
    this.props.dispatch(delToyAction({ids}))
  }
  copyUrl(e){
    e.target.previousSibling.select()
    document.execCommand('Copy')
    this.props.dispatch(setVisibility({name:'FETCH_NOTICE',show: true, msg:'复制成功！'}))
  }
  componentWillReceiveProps(nextProps){
    let {itemData} = nextProps
    if(itemData.contents){
      const checkbox={}
      for(let i of itemData.contents){
        Object.assign(checkbox, {[i.id]: false})
      }
      this.setState({checkbox, buttonMode: 1})
    }
  }
  handleMusic(e){
    e.target.previousSibling.play()
  }
}
function mapStateToProps ({toyData}){
  return {
    toyPlan: toyData.toyPlan
  }
}
export default connect(mapStateToProps)(ToyPlanItem)
