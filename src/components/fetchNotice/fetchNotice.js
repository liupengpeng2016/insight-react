import React, {Component} from 'react'
import './fetchNotice.css'
import {connect} from 'react-redux'
import {setVisibility} from '../../redux/actions.js'
class FetchNotice extends Component{
  constructor(){
    super()
    this.handleClick=this.handleClick.bind(this)
  }
  render(){
    const {fetchNotice} = this.props
    return (
      <div className='fetch-notice'
      style={!fetchNotice.show? {display:'none'}: null}
      >
        <div>
          <h1>操作提示<span
            onClick={this.handleClick}
          >×</span></h1>
          <p>{fetchNotice.msg}</p>
          <h2 onClick={this.handleClick}>确定</h2>
        </div>
      </div>
    )
  }
  handleClick(){
    this.props.dispatch(setVisibility({name:'FETCH_NOTICE', show: false}))
    const harsh= location.hash
    if(/addEvent/.test(harsh)){
      return history.back()
    }
    if(/editorPlan/.test(harsh)){
      return history.back()
    }
    if(/other/.test(harsh)){
      return history.back()
    }
    if(/addAlbum/.test(harsh)){
      return history.back()
    }
    if(/addTopic/.test(harsh)){
      return history.back()
    }
    if(/addPlan/.test(harsh)){
      return history.back()
    }
    if(/addBanner/.test(harsh)){
      return history.back()
    }
  }
}
function mapStateToProps(state){
  return {fetchNotice: state.visibility.fetchNotice}
}
export default connect(mapStateToProps)(FetchNotice)
