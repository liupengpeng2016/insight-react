import React, {Component} from 'react'
import './tingting.css'
import {connect} from 'react-redux'
import {getSearchMusicList,
  addToOwnMusicList, delMusicItem, saveSearchMusicList,
  getLinkAlbumList, linkToAlbum} from '../../../redux/actions.js'
import PageCtr from '../pageCtr/pageCtr.js'
import AddTo from '../addTo/addTo.js'
const formTime = time => {
  const m = parseInt(time/1000/60, 10);
  const s = parseInt(time/1000%60, 10);
  return m + '分' + s + '秒';
}
const formOrigin = origin => {
  switch(origin){
    case 1: return '葡萄'
    case 2: return '蜻蜓'
    case 3: return '喜马拉雅'
    case 4: return '自营'
    case 5: return '其它'
    default: return ''
  }
}
class Tingting extends Component{
  constructor(props){
    super(props)
    this.state={
      type: 'tingting',
      category: '1',
      userInput:'',
      page: 1,
      showPanel: false,
      addId:''
    }
  }
  render(){
    let {searchMusicList} = this.props
    return (
      <div className='tingting'>
        <ul className='tingting-scope'>
          <li>
            <span>分类</span>
            <select
              onChange={this.handleCategory.bind(this)}
              value={this.state.category}
              >
              <option value='1'>故事</option>
              <option value='2'>儿歌</option>
              <option value='3'>音乐</option>
            </select>
          </li>
          <li>
            <span>类型</span>
            <select
              onChange={this.handleType.bind(this)}
              value={this.state.type}
              >
              <option value='tingting'>葡萄听听</option>
              <option value='insight'>insight库</option>
            </select>
          </li>
          <li>
            <span>歌曲ID/歌名</span>
            <input type='text' placeholder='请输入歌曲ID／歌名'
              onChange={this.handleUserInput.bind(this)}
              value={this.state.userInput}
              />
            <span className='search-button'
              onClick={this.handleSearch.bind(this)}
              >搜索已选歌曲</span>
          </li>
        </ul>
        <table className='media-list'>
          <tbody>
            <tr>
              <td>编号</td>
              <td>类型</td>
              <td>歌曲名称</td>
              <td>歌曲时长</td>
              <td>播放次数</td>
              <td>歌词</td>
              <td>适合年龄</td>
              <td>上架</td>
              <td>来源</td>
              <td>上传时间</td>
              <td>操作</td>
            </tr>
            {((searchMusicList||[]).list||[]).map((val, i) => {
              return (
                <tr key={i}>
                  <td>{val.id}</td>
                  <td>{val.category === 1? '故事' : (val.category === 2? '儿歌': '音乐')}</td>
                  <td
                    style={{maxWidth:'0.1666rem','lineHeight':'0.0166rem'}}
                  >{val.name}</td>
                  <td>{formTime(val.duration)}</td>
                  <td>{val.play_times}</td>
                  <td>{val.lyric === 1 ? '是': '否'}</td>
                  <td>{val.age}</td>
                  <td>{val.status === 1 ? '是'  : '否'}</td>
                  <td>{formOrigin(val.origin)}</td>
                  <td>{val.created_at.slice(0,10)}</td>
                  <td className='tingting-list-button'>{!val.is_add? <span onClick={this.handleAdd.bind(this, this.state.type, val.id)}>添加</span>:
                     <p className='off'>
                      <span
                        onClick={()=> {
                          this.props.dispatch(delMusicItem({ids: [val.local_id]},this.search.bind(this)))
                        }}
                      >移除</span>
                      <span>已添加</span>
                      <span
                        onClick={this.handleAddToAlbum.bind(this, val.local_id)}
                        >添加到专辑
                      </span>
                    </p>
                  }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className='tingting-notice' style={searchMusicList === undefined ? {display: "none"} : ((searchMusicList.list||[]).length === 0 ? null: {display: 'none'})}>没有找到相应内容!</p>
        <AddTo
          target='专辑'
          isShow={this.state.showPanel}
          hidePanle={()=> this.setState({showPanel: false})}
          addId={this.state.addId}
          options={this.props.linkAlbumList}
          addTo={this.dispatchLinkToAlbum.bind(this)}
          />
        <PageCtr
          buttons='10'
          total={(searchMusicList||[]).pages}
          changePage={
            page=> {
              this.search({page})
              this.setState({page})
            }
          }
          />
      </div>
    )
  }
  handleSearch(){
    this.search()
  }
  componentWillUnmount(){
    this.props.dispatch(saveSearchMusicList(undefined))
  }
  search(newParams= null){
    const {type, category, userInput, page} = this.state
    const params= Object.assign({type, page, category, tingting_id: userInput}, newParams)
    this.props.dispatch(getSearchMusicList(params))
  }
  handleCategory(e){
    this.search({category: e.target.value})
    this.setState({category: e.target.value})
  }
  handleType(e){
    this.search({type: e.target.value})
    this.setState({type: e.target.value})
  }
  handleUserInput(e){
    this.setState({userInput: e.target.value})
  }
  handleAdd(type, id){
    this.props.dispatch(addToOwnMusicList({type, id},()=> {this.search()}))
  }
  handleAddToAlbum(id){
    this.props.dispatch(getLinkAlbumList({id}))
    this.setState({showPanel:true, addId: id})
  }
  dispatchLinkToAlbum(id, album_id){
    this.props.dispatch(linkToAlbum({id, album_id}))
  }
}
function mapStateToProps (state) {
  return {
    searchMusicList: state.mediaData.searchMusicList,
    linkAlbumList: state.mediaData.linkAlbumList
  }
}
export default connect(mapStateToProps)(Tingting)
