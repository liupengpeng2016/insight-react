import {
  SAVE_MUSIC_LIST,
  SAVE_ALBUM_LIST,
  SAVE_TOPIC_LIST,
  SAVE_BANNER_LIST,
  SAVE_LINK_ALBUM_LIST,
  SAVE_SEARCH_MUSIC_LIST,
  SAVE_LINK_TOPIC_LIST
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
const saveLinkTopicList = data => ({type: SAVE_LINK_TOPIC_LIST, data})
function fetchData(url, params, dispatch, action){
  let formParams=''
  if(params){
    const keys=Object.keys(params)
    for(let i of keys){
      if(params[i] instanceof Array){
        for(let k=0; k<params[i].length; k++){
          formParams += i + '['+ k +']=' + params[i][k] + '&'
        }
      }else{
        formParams+= (i+'='+params[i]) + '&'
      }
    }
    formParams=formParams.slice(0,-1)
  }
  const headers=new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  })
  fetch(baseUrl + url, {
    method: 'post',
    headers,
    body: formParams,
    mode: 'cors'
  }).then(res => res.json())
  .then(json => {
      const result = action === getMusicList||action === getAlbumList || action === getTopicList||action === getBannerList
      return action ? dispatch(action(result ? undefined : json.data)) : ''
  }).catch(error => console.log(error))
}
//获取media列表
export const getMusicList =
  (params={category: 0,page:1}) =>
    dispatch => fetchData('/tingting/music/lists', params, dispatch, saveMusicList)
export const getAlbumList =
  (params={category: 0,page:1}) =>
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
//歌曲关联专辑
export const linkToAlbum =
  params =>
    dispatch => fetchData('/tingting/music/associateAlbum', params, dispatch, null)
//编辑歌曲信息
export const editorMusic =
  params =>
    dispatch => fetchData('/tingting/music/edit', params, dispatch, null)
//获取搜索音乐列表
export const getSearchMusicList =
  params =>
    dispatch => fetchData('/tingting/music/searchMusic', params, dispatch, saveSearchMusicList)
//添加歌曲
export const addOtherPlatformMusic =
  params =>
    dispatch => fetchData('/tingting/music/create', params, dispatch, null)
//删除专辑
export const delAlbumItem =
  params =>
    dispatch => fetchData('/tingting/album/delete', params, dispatch, getAlbumList)
//切换编辑状态
export const toggleAlbumState =
  params =>
    dispatch => fetchData('/tingting/album/modifyStatus', params, dispatch, getAlbumList)
//获取专辑关联专题
export const getLinkTopicList =
  params =>
    dispatch => fetchData('/tingting/album/getCanAssociateSubjects', params, dispatch, saveLinkTopicList)
//编辑专辑
export const editorAlbum =
  params =>
    dispatch => fetchData('/tingting/album/edit', params, dispatch, getAlbumList)
//关联专辑到专题
export const linkToTopic =
  params =>
    dispatch => fetchData('/tingting/album/associateSubject', params, dispatch, null)
//删除专题项
export const delTopicItem =
  params =>
    dispatch => fetchData('/tingting/subject/delete', params, dispatch, getTopicList)
//修改专题status
export const toggleTopicStatus =
  params =>
    dispatch => fetchData('/tingting/subject/modifyStatus', params, dispatch, getTopicList)
//编辑专题
export const editorTopic =
  params =>
    dispatch => fetchData('/tingting/subject/edit', params, dispatch, getTopicList)
//banner删除
export const delBannerItem =
  params =>
    dispatch => fetchData('/tingting/banner/delete', params, dispatch, getBannerList)
//banner status
export const toggleBannerStatus =
  params =>
    dispatch => fetchData('/tingting/banner/modifyStatus', params, dispatch, getBannerList)
//banner编辑
export const editorBanner =
  params =>
    dispatch => fetchData('/tingting/banner/edit', params, dispatch, null)
