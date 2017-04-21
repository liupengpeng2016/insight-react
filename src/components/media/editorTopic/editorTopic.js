import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editorTopic} from '../../../redux/actions.js'
class EditorTopic extends Component{
  constructor(props){
    super(props)
    this.state={
      name:'',
      sort:'0',
      location:'1',
      statusShow:true,
      statusHide:false
    }
  }
  render(){
    return (
      <div className='editor-music'>
        <h1>多媒体库>专题列表>编辑专题</h1>
        <h2>编辑专题</h2>
        <ul className='add-item'>
          <li>
            <span>专题名称</span>
            <input type='text' placeholder='请输入专辑名称'
              onChange={this.changeName.bind(this)}
              value={this.state.name}
              />
          </li>
          <li>
            <span>专题位置</span>
            <select
              onChange={this.changeLocation.bind(this)}
              value={this.state.location}
              >
              <option value='1'>首页</option>
              <option value='2'>故事</option>
              <option value='3'>儿歌</option>
              <option value='4'>音乐</option>
            </select>
          </li>
          <li>
            <span>权重</span>
            <select
              onChange={this.changeSort.bind(this)}
              value={this.state.sort}
              >
              <option value='0'> 0 </option>
              <option value='1'> 1 </option>
              <option value='2'> 2 </option>
              <option value='3'> 3 </option>
              <option value='4'> 4 </option>
              <option value='5'> 5 </option>
              <option value='6'> 6 </option>
              <option value='7'> 7 </option>
              <option value='8'> 8 </option>
              <option value='9'> 9 </option>
              <option value='10'> 10 </option>
            </select>
          </li>
          <li>
            <span>状态</span>
              <input type='checkbox' id='banner-show' name='editor'
                onChange={this.changeStatusShow.bind(this)}
                checked={this.state.statusShow}
                />
              <label htmlFor='banner-show'>显示</label>
              <input type='checkbox' id='banner-hide' name='editor'
                onChange={this.changeStatusHide.bind(this)}
                checked={this.state.statusHide}
                />
              <label htmlFor='banner-hide'>隐藏</label>
          </li>
          <li onClick={this.handleSubmit.bind(this)}>编辑信息</li>
        </ul>
      </div>
    )
  }
  componentDidMount(){
    const {name, sort, status} = this.props.location.state
    this.setState({name, sort, statusShow: status? true: false, statusHide: !status? true: false})
  }
  changeName(e){
    this.setState({name: e.target.value})
  }
  changeSort(e){
    this.setState({sort: e.target.value})
  }
  changeLocation(e){
    this.setState({location: e.target.value})
  }
  changeFile(e){
    const imgReader = new FileReader()
    imgReader.readAsDataURL(e.target.files[0])
    imgReader.onload=()=>{
      this.setState({fileUrl: imgReader.result})
    }
    this.setState({file: e.target.files[0]})
  }
  changeStatusShow(e){
    this.setState({
      statusShow: e.target.checked,
      statusHide: !e.target.checked
    })
  }
  changeStatusHide(e){
    this.setState({
      statusHide: e.target.checked,
      statusShow: !e.target.checked
    })
  }
  handleSubmit(){
    const {name, sort, statusShow, location} = this.state
    this.props.dispatch(editorTopic({
      name,
      sort,
      location,
      id: this.props.location.state.id,
      status: statusShow ? 1 : 0
    }))
  }
}
export default connect()(EditorTopic)
