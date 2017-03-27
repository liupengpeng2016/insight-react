import React, {Component} from 'react'
import './addTo.css'
class AddTo extends Component{
  constructor(props){
    super(props)
    this.state={
      selectValue: '-100'
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
            <span>专辑列表</span>
            <select onChange={this.handleChange.bind(this)} value={this.state.selectValue}>
              <option value='-100'>请下拉选择专辑</option>
              {(options||[]).map((val, i) => {
                return  <option key={i} value={val.album_id}>{val.name}</option>
              })}
            </select>
          </p>
          <p>
            <span>专辑ID</span>
            <input type='text' placeholder='请输入专辑ID'/>
          </p>
          <h2 onClick={this.handleClick.bind(this, addId, this.state.selectValue)}>确定</h2>
        </div>
      </div>
    )
  }
  hidePanle(){
    this.props.hidePanle()
  }
  handleChange(e){
    this.setState({selectValue: e.target.value})
  }
  handleClick(id, album_id){
    this.props.linkToAlbum({id, album_id})
    this.props.hidePanle()
  }
}

export default AddTo
