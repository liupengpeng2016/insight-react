import React, {Component} from 'react'
import './addTo.css'
class AddTo extends Component{
  constructor(props){
    super(props)
    this.state={
      selectValue: '-1',
      userInput: ''
    }
  }
  render(){
    const {isShow, options, addId} = this.props
    return (
      <div className='add-to' style={{display:(isShow?'block':'none')}}>
        <div className='add-to-panel'>
          <span onClick={this.hidePanle.bind(this)}></span>
          <h1>添加到</h1>
          <p>
            <span>{this.props.target}列表</span>
            <select onChange={this.handleChange.bind(this)} value={this.state.selectValue}>
              <option value='-100'>请下拉选择{this.props.target}列表</option>
              {(options||[]).map((val, i) => {
                return  <option key={i} value={val.album_id || val.subject_id}>{val.name}</option>
              })}
            </select>
          </p>
          <p>
            <span>{this.props.target}ID</span>
            <input type='text' placeholder={`请输入${this.props.target}ID`}
              onChange={this.handleUserInput.bind(this)}
              value={this.state.userInput}
              />
          </p>
          <h2 onClick={this.handleClick.bind(this, addId, this.state.selectValue)}>确定</h2>
        </div>
      </div>
    )
  }
  hidePanle(){
    this.props.hidePanle()
    this.resetComponent()
  }
  handleChange(e){
    this.setState({userInput:e.target.value, selectValue: e.target.value})
  }
  handleUserInput(e){
    this.setState({userInput:e.target.value, selectValue: e.target.value || -1})
  }
  handleClick(id, target_id){
    this.props.addTo(id, target_id)
    this.props.hidePanle()
    this.resetComponent()
  }
  resetComponent(){
    this.state={
      selectValue: '-1',
      userInput: ''
    }
  }
}

export default AddTo
