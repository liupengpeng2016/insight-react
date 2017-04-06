import React, {Component} from 'react'
import {Link} from 'react-router'
class ToyPlanItem extends Component{
  constructor(){
    super()
    this.state={
      checkbox:{},
      buttonMode:1
    }
    this.checkbox={}
  }
  render(){
    let {itemData} = this.props
    itemData= itemData||[]
    for(let i of itemData){
      Object.assign(this.checkbox, {[i.id]: false})
    }
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
          <p className='submit'><Link to='/toy/editorToyInformation'>编辑玩偶信息</Link></p>
        </li>
        <li>
          <h2>语音播放顺序：顺序播放</h2>
          <table>
            <tbody>
              <tr>
                <td>序号</td>
                <td>动作内容</td>
                <td>音频地址</td>
                <td>更新时间</td>
                <td>操作</td>
              </tr>
              {
                itemData.map((val, i)=>{
                  return (
                    <tr key={i}>
                      <td>{val.id}</td>
                      <td>{val.content}</td>
                      <td>{val.audio_url}</td>
                      <td>{val.updated_at.slice(0,10)}</td>
                      <td>
                        {
                          this.state.buttonMode ? (
                            <div className='operate-button'>
                              <span className='editor-button'>编辑</span>
                              <span className='del-button'>删除</span>
                            </div>
                          ) : (
                            <div className='operate-button'>
                              <span className='editor-button'>编辑</span>
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
            <li className='del-all'>批量删除</li>
            <li className='choose-all'
              onClick={this.chooseAll.bind(this)}
              >全选</li>
          </ul>
          <p className='button-change-mode'
            onClick={this.handleButtonMode.bind(this)}
            style={!this.state.buttonMode?{display:'none'}:null}
            >批量管理
          </p>
          <p className='submit'>
            <Link to='/toy/addToyAction'>新增动作内容</Link>
          </p>
        </li>
        <li>
          <h1>玩偶简介</h1>
          <table>
            <tbody>
              <tr><td>玩偶简介</td></tr>
              <tr><td>图标</td></tr>
              <tr><td>玩偶简介</td></tr>
              <tr><td>功能简介</td></tr>
            </tbody>
          </table>
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
  componentDidUpdate(){
    // this.setState({checkbox:this.checkbox})
  }
}
export default ToyPlanItem
