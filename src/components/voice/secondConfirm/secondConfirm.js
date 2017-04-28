import React, {Component} from 'react'
import {connect} from 'react-redux'
import './secondConfirm.css'
import {setVisibility2} from '../../../redux/actions.js'
class SecondConfirm extends Component{
  render(){
    const {secondConfirm} = this.props
    return (
      <div className='second-confirm'
      style={!secondConfirm.show? {display:'none'}: null}
      >
        <div>
          <h1>操作提示<span
            onClick={this.cancle.bind(this) }
          >×</span></h1>
          <p>{secondConfirm.msg}</p>
          <h2>
            <span onClick={this.cancle.bind(this)}>取消</span>
            <span onClick={this.confirm.bind(this)}>确定</span>
          </h2>
        </div>
      </div>
    )
  }
  cancle(){
    this.props.dispatch(setVisibility2({secondConfirm:{show:false}}))
  }
  confirm(){
    this.props.dispatch(setVisibility2({secondConfirm:{show:false}}))
    this.props.secondConfirm.callback()
  }
}
function mapStateToProps({visibility2}){
  return {
    secondConfirm: visibility2.secondConfirm
  }
}
export default connect(mapStateToProps)(SecondConfirm)
