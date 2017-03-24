import {
  SAVE_MUSIC_LIST,
  SAVE_ALBUM_LIST,
  SAVE_TOPIC_LIST,
  SAVE_BANNER_LIST
} from './actionTypes.js'
import {baseUrl} from '../config/config.js'
import fetch from 'isomorphic-fetch'
//存储media列表
const saveMusicList = data => ({type:SAVE_MUSIC_LIST, data})
const saveAlbumList = data => ({type:SAVE_ALBUM_LIST, data})
const saveTopicList = data => ({type:SAVE_TOPIC_LIST, data})
const saveBannerList = data => ({type:SAVE_BANNER_LIST, data})
function fetchData(url, params, dispatch, action){
  fetch(baseUrl + url, {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: 'data=' + JSON.stringify(params),
    mode: 'cors'
  }).then(res => res.json())
  .then(json => {
    dispatch(action(json.data))
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
