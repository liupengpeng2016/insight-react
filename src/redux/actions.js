import {
  SAVE_MUSIC_LIST, SAVE_MUSIC_OF_ALBUM,
  SAVE_ALBUM_LIST, SAVE_TOPIC_LIST,
  SAVE_BANNER_LIST, SAVE_LINK_ALBUM_LIST,
  SAVE_SEARCH_MUSIC_LIST, SAVE_LINK_TOPIC_LIST,
  SAVE_HABIT_PLAN, SAVE_HABIT_PLAN_EVENT,
  SAVE_TOY_PLAN, FETCH_NOTICE,
  SAVE_DATA_SITUATION, SAVE_USER_LIST,
  SAVE_VOICE_LIST, SAVE_CORPUS_LIST,
  SAVE_FIRST_SCENE_LIST, SAVE_SECOND_SCENE_LIST,
  SAVE_ALL_FIRST_SCENE_LIST, SAVE_ALL_SECOND_SCENE_LIST,
  SAVE_ALBUM_OF_TOPIC, SAVE_ALL_SCENE, SET_VISIBILITY
} from './actionTypes.js'
import {baseUrl} from '../config/config.js'
import fetch from 'isomorphic-fetch'
//visibility
export const setVisibility = data => ({type: data.name, show: data.show, msg: data.msg})
export const setVisibility2 = data => ({type: SET_VISIBILITY, data})
function fetchData(url, params, dispatch, action, callback){
  const headers= new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded')
  let formParams= {}
  let newParams= ''
  if(params){
    const keys=Object.keys(params)
    for(let i of keys){
      if(params[i] instanceof Array){
        for(let k= 0;k<params[i].length; k++){
            Object.assign(formParams, {[i + '['+ k +']']: params[i][k]})
        }
      }else{
        Object.assign(formParams, {[i]: params[i]})
      }
    }
    const keys2= Object.keys(formParams)
    for(let i of keys2){
        newParams+= (i + '='+ formParams[i]+ '&')
    }
    newParams= newParams.slice(0, -1)
  }else{
    formParams=null
  }
  fetch(baseUrl + url, {
    method: 'post',
    body: newParams,
    mode: 'cors',
    headers
  }).then(res => res.json())
  .then(json => {
    if(json.http_status_code === 200 ){
      if(action){
        dispatch(action(json.data))
      }else{
        dispatch(setVisibility({name:FETCH_NOTICE, show: true, msg:'操作成功'}))
      }
      if(callback){
        callback()
      }
    }else{
      dispatch(setVisibility({name:FETCH_NOTICE, show: true, msg: json.msg ||'操作失败'}))
    }
  }).catch(error => {
    dispatch(setVisibility({name:FETCH_NOTICE, show: true, msg: '获取数据失败'}))
  })
}
/********************* home part ******************/
const saveDataSituation = data => ({type:SAVE_DATA_SITUATION, data})
const saveUserList = data => ({type:SAVE_USER_LIST, data})
export const getDataSituation =
  params =>
    dispatch => fetchData('/index/index/index', params, dispatch, saveDataSituation)
export const getUserList =
  params =>
    dispatch => fetchData('/index/index/lists', params, dispatch, saveUserList)
/******* media part **********/
//存储media列表
const saveMusicList = data => ({type:SAVE_MUSIC_LIST, data})
const saveAlbumList = data => ({type:SAVE_ALBUM_LIST, data})
const saveTopicList = data => ({type:SAVE_TOPIC_LIST, data})
const saveBannerList = data => ({type:SAVE_BANNER_LIST, data})
const saveLinkAlbumList = data => ({type:SAVE_LINK_ALBUM_LIST, data})
export const saveSearchMusicList = data => ({type:SAVE_SEARCH_MUSIC_LIST, data})
const saveLinkTopicList = data => ({type: SAVE_LINK_TOPIC_LIST, data})
const saveMusicOfAlbum = data => ({type: SAVE_MUSIC_OF_ALBUM, data})
const saveAlbumOfTopic = data => ({type: SAVE_ALBUM_OF_TOPIC, data})
//获取music列表
export const getMusicList =
  (params, callback) =>
    dispatch => fetchData('/tingting/music/lists', params, dispatch, saveMusicList, callback)
export const getAlbumList =
  (params, callback) =>
    dispatch => fetchData('/tingting/album/lists', params, dispatch, saveAlbumList, callback)
export const getTopicList =
  (params, callback) =>
    dispatch => fetchData('/tingting/subject/lists', params, dispatch, saveTopicList, callback)
export const getBannerList =
 (params, callback) =>
  dispatch => fetchData('/tingting/banner/lists', params, dispatch, saveBannerList, callback)
  //获取关联专辑列表
export const getLinkAlbumList =
  (params, callback) =>
    dispatch => fetchData('/tingting/music/getCanAssociateAlbums', params,dispatch,saveLinkAlbumList, callback)
//删除music列表项
export const delMusicItem =
  (params, callback) =>
    dispatch => fetchData('/tingting/music/delete', params, dispatch, null, callback)
//修改music列表项状态
export const toggleMusicStatus =
  (params, callback) =>
    dispatch => fetchData('/tingting/music/modifyStatus',params, dispatch, null, callback)
//歌曲关联专辑
export const linkToAlbum =
  (params, callback) =>
    dispatch => fetchData('/tingting/music/associateAlbum', params, dispatch, null, callback)
//编辑歌曲信息
export const editorMusic =
  (params, callback) =>
    dispatch => fetchData('/tingting/music/edit', params, dispatch, null, callback)
//获取搜索音乐列表
export const getSearchMusicList =
  (params, callback) =>
    dispatch => fetchData('/tingting/music/searchMusic', params, dispatch, saveSearchMusicList, callback)
//添加搜索音乐到自己音乐列表
export const addToOwnMusicList =
  (params, callback) =>
    dispatch => fetchData('/tingting/music/addMusic', params, dispatch, null, callback)
//添加歌曲
export const addOtherPlatformMusic =
  (params, callback) =>
    dispatch => fetchData('/tingting/music/create', params, dispatch, null, callback)
//删除专辑
export const delAlbumItem =
  (params, callback) =>
    dispatch => fetchData('/tingting/album/delete', params, dispatch, null, callback)
//新增专辑
export const addAlbumItem =
  (params, callback) =>
    dispatch => fetchData('/tingting/album/create', params, dispatch, null, callback)
//切换编辑状态
export const toggleAlbumStatus =
  (params, callback) =>
    dispatch => fetchData('/tingting/album/modifyStatus', params, dispatch, null, callback)
//获取专辑关联专题
export const getLinkTopicList =
  (params, callback) =>
    dispatch => fetchData('/tingting/album/getCanAssociateSubjects', params, dispatch, saveLinkTopicList, callback)
//编辑专辑
export const editorAlbum =
  (params, callback) =>
    dispatch => fetchData('/tingting/album/edit', params, dispatch, null, callback)
//关联专辑到专题
export const linkToTopic =
  (params, callback) =>
    dispatch => fetchData('/tingting/album/associateSubject', params, dispatch, null, callback)
//获取专辑下的音乐
export const getMusicOfAlbum =
  (params, callback) =>
    dispatch => fetchData('/tingting/album/musics', params, dispatch, saveMusicOfAlbum, callback)
//删除专题项
export const delTopicItem =
  (params, callback) =>
    dispatch => fetchData('/tingting/subject/delete', params, dispatch, null, callback)
//添加专题项
export const addTopicItem =
  (params, callback) =>
    dispatch => fetchData('/tingting/subject/create', params, dispatch, null, callback)
//修改专题status
export const toggleTopicStatus =
  (params, callback) =>
    dispatch => fetchData('/tingting/subject/modifyStatus', params, dispatch, null, callback)
//编辑专题
export const editorTopic =
  (params, callback) =>
    dispatch => fetchData('/tingting/subject/edit', params, dispatch, null, callback)
//获取专题下的专辑列表
export const getAlbumOfTopic =
  (params, callback) =>
    dispatch => fetchData('/tingting/subject/albums', params, dispatch, saveAlbumOfTopic, callback)
//banner删除
export const delBannerItem =
  (params, callback) =>
    dispatch => fetchData('/tingting/banner/delete', params, dispatch, null, callback)
//banner添加
export const addBannerItem =
  (params, callback) =>
    dispatch => fetchData('/tingting/banner/create', params, dispatch, null, callback)
//banner status
export const toggleBannerStatus =
  (params, callback) =>
    dispatch => fetchData('/tingting/banner/modifyStatus', params, dispatch, null, callback)
//banner编辑
export const editorBanner =
  (params, callback) =>
    dispatch => fetchData('/tingting/banner/edit', params, dispatch, null, callback)
/********** habit part **********/
const saveHabitPlan = data => ({type: SAVE_HABIT_PLAN, data})
const saveHabitPlanEvent = data => ({type: SAVE_HABIT_PLAN_EVENT, data})
//计划列表
export const getHabitPlan =
  (params, callback) =>
    dispatch => fetchData('/plan/defaultPlan/planList', params, dispatch, saveHabitPlan, callback)
//计划事件
export const getHabitPlanEvent =
  (params, callback) =>
    dispatch => fetchData('/plan/defaultPlan/planEventList', params, dispatch, saveHabitPlanEvent, callback)
//添加计划
export const addHabitPlan =
  (params, callback) =>
    dispatch => fetchData('/plan/defaultPlan/addPlan', params, dispatch, null, callback)
//添加事件
export const addHabitPlanEvent =
  (params, callback) =>
    dispatch => fetchData('/plan/defaultPlan/addPlanEvent', params, dispatch, null, callback)
//删除计划
export const delHabitPlan =
  (params, callback) =>
    dispatch => fetchData('/plan/defaultPlan/deletePlan', params, dispatch, null, callback)
//删除事件
export const delHabitPlanEvent =
  (params, callback) =>
    dispatch => fetchData('/plan/defaultPlan/deletePlanEvent', params, dispatch, null, callback)
//编辑计划
export const editorHabitPlan =
  (params, callback) =>
    dispatch => fetchData('/plan/defaultPlan/updatePlan', params, dispatch, null, callback)
//编辑事件
export const editorHabitPlanEvent =
  (params, callback) =>
    dispatch => fetchData('/plan/defaultPlan/updatePlanEvent', params, dispatch, null, callback)
/************* toy part **************/
export const saveToyPlan= data => ({type: SAVE_TOY_PLAN, data})
export const getToyPlan =
  (params, callback) =>
    dispatch => fetchData('/toy/toy/index', params, dispatch, saveToyPlan, callback)
export const addToyAction =
  (params, callback) =>
    dispatch => fetchData('/toy/toy/addActionContent', params, dispatch, null, callback)
export const editorToyAction =
  (params, callback) =>
    dispatch => fetchData('/toy/toy/editAction', params, dispatch, null, callback)
export const editorToyInformation =
  (params, callback) =>
        dispatch => fetchData('/toy/toy/edit', params, dispatch, null, callback)
export const delToyAction =
  (params, callback) =>
    dispatch => fetchData('/toy/toy/delActionContent', params, dispatch, null, callback)
/************** voice part ***************/
export const saveVoiceList = data => ({type: SAVE_VOICE_LIST, data})
export const saveCorpusList = data => ({type: SAVE_CORPUS_LIST, data})
export const saveFirstSceneList = data => ({type: SAVE_FIRST_SCENE_LIST, data})
export const saveSecondSceneList = data => ({type: SAVE_SECOND_SCENE_LIST, data})
export const saveAllFirstSceneList = data => ({type: SAVE_ALL_FIRST_SCENE_LIST, data})
export const saveAllSecondSceneList = data => ({type: SAVE_ALL_SECOND_SCENE_LIST, data})
//获取语料库列表
export const getCorpusList= (params, callback) => dispatch =>
 fetchData('/corpus/corpus/getCorpusLibraries', params, dispatch, saveCorpusList, callback)
//获取语料列表
export const getVoiceList= (params, callback) => dispatch =>{
  return fetchData('/corpus/corpus/getCorpusList', params, dispatch, saveVoiceList, callback)
}
//编辑语料
export const editorVoiceItem= (params, callback) => dispatch =>
 fetchData('/corpus/corpus/editCorpus', params, dispatch, null, callback)
//删除语料
export const delVoiceItem= (params, callback) => dispatch =>
 fetchData('/corpus/corpus/delCorpus', params, dispatch, null, callback)
//添加语料
export const addVoiceItem= (params, callback) => dispatch =>
 fetchData('/corpus/corpus/addCorpus', params, dispatch, null, callback)
//启用／弃用语料
export const toggleVoiceStatus= (params, callback) => dispatch =>
 fetchData('/corpus/corpus/enableCorpus', params, dispatch, null, callback)
//删除问题
export const delVoiceQuestion= (params, callback) => dispatch =>
  fetchData('/corpus/corpus/delQuestion', params, dispatch, null, callback)
//删除回答
export const delVoiceAnswer= (params, callback) => dispatch =>
  fetchData('/corpus/corpus/delAnswer', params, dispatch, null, callback)
//启用／弃用回答
export const toggleAnswerStatus= (params, callback) => dispatch =>
  fetchData('/corpus/corpus/enableAnswer', params, dispatch, null, callback)
//获取一级场景
export const getFirstSceneList= (params, callback) => dispatch =>
  fetchData('/corpus/scene/firstSceneList', params, dispatch, saveFirstSceneList, callback)
//获取所有二级场景列表
export const getAllSecondSceneList= (params, callback) => dispatch =>
  fetchData('/corpus/scene/allSecondScene', params, dispatch, saveAllSecondSceneList, callback)
//获取所有一级场景
export const getAllFirstSceneList= (params, callback) => dispatch =>
  fetchData('/corpus/scene/allFirstScene', params, dispatch, saveAllFirstSceneList, callback)
//更改一级场景status
export const toggleFirstSceneStatus= (params, callback) => dispatch =>
  fetchData('/corpus/scene/enableFirstScene', params, dispatch, null, callback)
//删除一级场景
export const delFirstSceneItem= (params, callback) => dispatch =>
  fetchData('/corpus/scene/delFirstScene', params, dispatch, null, callback)
//编辑一级场景
export const editorFirstSceneItem= (params, callback) => dispatch =>
  fetchData('/corpus/scene/editFirstScene', params, dispatch, null, callback)
//添加一级场景
export const addFirstSceneItem= (params, callback) => dispatch =>
  fetchData('/corpus/scene/addFirstScene', params, dispatch, null, callback)
//获取二级场景列表
export const getSecondSceneList= (params, callback)=> dispatch =>
  fetchData('/corpus/scene/secondSceneList', params, dispatch, saveSecondSceneList, callback)
//编辑二级场景
export const editorSecondSceneItem= (params, callback) => dispatch =>
  fetchData('/corpus/scene/editSecondScene', params, dispatch, null, callback)
//添加二级场景
export const addSecondSceneItem= (params, callback) => dispatch =>
  fetchData('/corpus/scene/addSecondScene', params, dispatch, null, callback)
//删除二级场景
export const delSecondSceneItem= (params, callback) => dispatch =>
  fetchData('/corpus/scene/delSecondScene', params, dispatch, null, callback)
//更改二级场景status
export const toggleSecondSceneStatus= (params, callback) => dispatch =>
  fetchData('/corpus/scene/enableSecondScene', params, dispatch, null, callback)
//存储场景树
export const saveAllScene= data => ({type: SAVE_ALL_SCENE, data})
//获取场景树
export const getAllScene= (params, callback) => dispatch =>
  fetchData('/corpus/scene/allScene', params, dispatch, saveAllScene, callback)
