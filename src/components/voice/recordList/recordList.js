import React, {Component} from 'react'
import PageCtr from '../../media/pageCtr/pageCtr.js'
import {connect} from 'react-redux'
import { getAllRecord } from '../../../redux/actions.js'
class VoiceList extends Component{
  constructor(){
    super()
    this.state={
      toggleEditorVoice: false,
      page:1,
      buttonMode:1,
      editorData:undefined,
      checkbox:''
    }
  }
  render(){
    const {allRecord} = this.props
    return (
      <div className='scene-manage'>
        <table className='scene-manage-list'>
          <thead>
            <tr>
              <td>时间</td>
              <td>作者</td>
              <td>修改记录</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            {
              allRecord.map((val, i)=> {
                return (
                  <tr key={i}>
                      <td style={{cursor:'auto'}}>{i<= 10? '0'+ (i+1): i+1}</td>
                      <td style={{color:'black'}}>{val.editor}</td>
                      <td>{this.formOperate(val)}</td>
                      <td>{val.time}</td>
                      <td style={{cursor: 'pointer'}}>查看</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <PageCtr
          buttons='10'
          total=''
          changePage=''
        />
      </div>
    )
  }
  formOperate(data){
    let result= data.corpus+ ' '
    if(Number(data.add)){
      result+= '新增 '+ data.add + ' | '
    }
    if(Number(data.del)){
      result+= '删除 '+ data.del + ' | '
    }
    if(Number(data.edit)){
      result+= '编辑'+ data.edit + ' | '
    }
    if(Number(data.enable)){
      result+= '启用 '+ data.enable + ' | '
    }
    if(Number(data.disable)){
      result+= '弃用 '+ data.disable + ' | '
    }
    return result.slice(0, -2)
  }
  getAllRecord(obj= null){
    const params= Object.assign({num: 15, page: this.state.page}, obj)
    this.props.dispatch(getAllRecord(params))
  }
  componentDidMount(){
    this.getAllRecord()
  }
}
function mapStateToProps({voiceData}){
  return {
    allRecord: voiceData.allRecord
  }
}
export default connect(mapStateToProps)(VoiceList)
