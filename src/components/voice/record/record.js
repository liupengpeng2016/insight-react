import React, {Component} from 'react'
import PageCtr from '../../media/pageCtr/pageCtr.js'
class Record extends Component{
  render(){
    return (
      <div className='scene-manage'>
        <h1>录入记录</h1>
        <table className='scene-manage-list'>
          <thead>
            <tr>
              <td>编号</td>
              <td>作者</td>
              <td>修改记录</td>
              <td>时间</td>
              <td>操作</td>
            </tr>
          </thead>
        </table>
        <PageCtr
          buttons='10'
          total=''
          changePage=''
        />
      </div>
    )
  }
}
export default Record
