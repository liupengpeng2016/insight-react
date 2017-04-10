import { combineReducers } from 'redux'
import {
  SAVE_MUSIC_LIST,SAVE_ALBUM_LIST,
  SAVE_TOPIC_LIST,SAVE_BANNER_LIST,
  SAVE_LINK_ALBUM_LIST,SAVE_SEARCH_MUSIC_LIST,
  SAVE_LINK_TOPIC_LIST,SAVE_HABIT_PLAN,SAVE_HABIT_PLAN_EVENT,
  SAVE_TOY_PLAN, FETCH_NOTICE,SAVE_USER_LIST,SAVE_DATA_SITUATION,
} from './actionTypes.js'
/********** visibility *********/
function visibility(state={
  fetchNotice:{
    show:false,
    msg:'操作成功'
  }
},action){
  switch(action.type){
    case FETCH_NOTICE:
    return Object.assign({}, state, {fetchNotice:{show: action.show, msg: action.msg}})
    default:
    return state
  }
}
/********** home part **********/
function homeData(state={
  userList: [],
  dataSituation: {}
},action){
  switch(action.type){
    case SAVE_DATA_SITUATION:
    return Object.assign({}, state, {dataSituation: action.data})
    case SAVE_USER_LIST:
    return Object.assign({}, state, {userList: action.data})
    default: return state
  }
}
/********** media part**********/
function mediaData(state={
  musicList: [],
  albumList: [],
  topicList: [],
  bannerList: [],
  linkAlbumList: [],
  searchMusicList: undefined,
  linkTopicList: []
},action){
  switch(action.type){
    case SAVE_MUSIC_LIST:
    return Object.assign({}, state, {musicList: action.data})
    case SAVE_ALBUM_LIST:
    return Object.assign({}, state, {albumList: action.data})
    case SAVE_TOPIC_LIST:
    return Object.assign({}, state, {topicList: action.data})
    case SAVE_BANNER_LIST:
    return Object.assign({}, state, {bannerList: action.data})
    case SAVE_LINK_ALBUM_LIST:
    return Object.assign({}, state, {linkAlbumList: action.data})
    case SAVE_SEARCH_MUSIC_LIST:
    return Object.assign({}, state, {searchMusicList: action.data})
    case SAVE_LINK_TOPIC_LIST:
    return Object.assign({}, state, {linkTopicList: action.data})
    default:
    return state
  }
}
/**************** habit part ***************/
function habitData(state={
  habitPlan:[],
  habitPlanEvent:[]
}, action){
  switch(action.type){
    case SAVE_HABIT_PLAN:
    return Object.assign({}, state, {habitPlan: action.data})
    case SAVE_HABIT_PLAN_EVENT:
    return Object.assign({}, state, {habitPlanEvent: action.data})
    default: return state
  }
}
/************** toy part **************/
function toyData(state={
  toyPlan: []
},action){
  switch(action.type){
    case SAVE_TOY_PLAN:
    return Object.assign({}, state, {toyPlan: action.data})
    default : return state
  }
}
export default combineReducers({
  visibility,
  homeData,
  mediaData,
  habitData,
  toyData
})
