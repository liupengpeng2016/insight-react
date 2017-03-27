import {
  SAVE_MUSIC_LIST,
  SAVE_ALBUM_LIST,
  SAVE_TOPIC_LIST,
  SAVE_BANNER_LIST,
  SAVE_LINK_ALBUM_LIST,
  SAVE_SEARCH_MUSIC_LIST
} from './actionTypes.js'
import {baseUrl} from '../config/config.js'
import fetch from 'isomorphic-fetch'
//存储media列表
const saveMusicList = data => ({type:SAVE_MUSIC_LIST, data})
const saveAlbumList = data => ({type:SAVE_ALBUM_LIST, data})
const saveTopicList = data => ({type:SAVE_TOPIC_LIST, data})
const saveBannerList = data => ({type:SAVE_BANNER_LIST, data})
const saveLinkAlbumList = data => ({type:SAVE_LINK_ALBUM_LIST, data})
const saveSearchMusicList = data => ({type:SAVE_SEARCH_MUSIC_LIST, data})
function fetchData(url, params, dispatch, action){
  const keys=Object.keys(params)
  let formParams=''
  for(let i of keys){
    if(params[i] instanceof Array){
      for(let k=0; k<params[i].length; k++){
        formParams += i + '['+ k +']=' + params[i][k] + '&'
      }
    }else{
      formParams+=(i+'='+params[i])+'&'
    }
  }
  formParams=formParams.slice(0,-1)
  const headers=new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
  })
  fetch(baseUrl + url, {
    method: 'post',
    headers,
    body: formParams,
    mode: 'cors'
  }).then(res => res.json())
  .then(json => {
      return action ? dispatch(action(json.data)) : ''
  }).catch(error => console.log(error))
}
//获取media列表
export const getMusicList =
  (params={category: 1,page:1}) =>
    dispatch => fetchData('/tingting/music/lists', params, dispatch, saveMusicList)
export const getAlbumList =
  (params={}) =>
    dispatch => fetchData('/tingting/album/lists', params, dispatch, saveAlbumList)
export const getTopicList =
  params =>
    dispatch => fetchData('/tingting/subject/lists', params, dispatch, saveTopicList)
export const getBannerList =
 params =>
  dispatch => fetchData('/tingting/banner/lists', params, dispatch, saveBannerList)
  //获取关联专辑列表
export const getLinkAlbumList =
  params =>
    dispatch => fetchData('/tingting/music/getCanAssociateAlbums', params,dispatch,saveLinkAlbumList)
//删除media列表项
export const delMusicItem =
  params =>
    dispatch => fetchData('/tingting/music/delete', params, dispatch, getMusicList)
//修改media列表项状态
export const toggleMusicState =
  params =>
    dispatch => fetchData('/tingting/music/modifyStatus',params, dispatch, getMusicList)
//link music  To album
export const linkToAlbum =
  params =>
    dispatch => fetchData('/tingting/music/getCanAssociateAlbums', params, dispatch, null)
//编辑歌曲信息
export const editorMusic =
  params =>
    dispatch => fetchData('/tingting/music/edit', params, dispatch, null)
//获取搜索音乐列表
export const getSearchMusicList =
  params =>
    dispatch => fetchData('/tingting/music/searchMusic', params, dispatch, saveSearchMusicList)
