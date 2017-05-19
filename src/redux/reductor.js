import { combineReducers } from 'redux'
import {
  SAVE_MUSIC_LIST,SAVE_ALBUM_LIST,
  SAVE_TOPIC_LIST,SAVE_BANNER_LIST,
  SAVE_LINK_ALBUM_LIST,SAVE_SEARCH_MUSIC_LIST,
  SAVE_LINK_TOPIC_LIST,SAVE_HABIT_PLAN,SAVE_HABIT_PLAN_EVENT,
  SAVE_TOY_PLAN, FETCH_NOTICE,SAVE_USER_LIST,SAVE_DATA_SITUATION,
  SAVE_VOICE_LIST, SAVE_CORPUS_LIST,SAVE_FIRST_SCENE_LIST,
  SAVE_SECOND_SCENE_LIST,SCENE_TREE,SAVE_MUSIC_OF_ALBUM,
  SAVE_ALL_FIRST_SCENE_LIST, SAVE_ALL_SECOND_SCENE_LIST,
  SAVE_ALBUM_OF_TOPIC, SAVE_ALL_SCENE, SET_VISIBILITY
} from './actionTypes.js'
/********** visibility *********/
function visibility(state={
  fetchNotice:{
    show:false,
    msg:'操作成功'
  },
  sceneTree:{
    show: false
  }
},action){
  switch(action.type){
    case FETCH_NOTICE:
    return Object.assign({}, state, {fetchNotice:{show: action.show, msg: action.msg}})
    case SCENE_TREE:
    return Object.assign({}, state, {sceneTree:{show: action.show, msg: action.msg}})
    default:
    return state
  }
}
function visibility2(
  state={
    secondConfirm:{
      show: false,
      msg:'确认要删除吗？',
      callback: function(){}
    }
  },action
){
  switch(action.type){
    case SET_VISIBILITY:
    return Object.assign({}, state, action.data)
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
  linkTopicList: [],
  musicOfAlbum:[],
  albumOfTopic:[]
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
    case SAVE_MUSIC_OF_ALBUM:
    return Object.assign({}, state, {musicOfAlbum: action.data})
    case SAVE_ALBUM_OF_TOPIC:
    return Object.assign({}, state, {albumOfTopic: action.data})
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
    const habitPlan= action.data
    habitPlan.sort(function(a, b){
      return a.sort-b.sort
    })
    return Object.assign({}, state, {habitPlan})
    case SAVE_HABIT_PLAN_EVENT:
    const habitPlanEvent= action.data
    habitPlanEvent.sort(function(a, b){
      return b.sort- a.sort
    })
    return Object.assign({}, state, {habitPlanEvent})
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
/************** VOICE PART ***************/
function voiceData(state={
  voiceList: {},
  corpusList: [],
  firstSceneList: [],
  secondSceneList: [],
  allFirstSceneList: [],
  allSecondSceneList: [],
  allScene:[]
},action){
  switch(action.type){
    case SAVE_VOICE_LIST:
    return Object.assign({}, state, {voiceList: action.data})
    case SAVE_CORPUS_LIST:
    return Object.assign({}, state, {corpusList: action.data})
    case SAVE_FIRST_SCENE_LIST:
    return Object.assign({}, state, {firstSceneList: action.data})
    case SAVE_SECOND_SCENE_LIST:
    return Object.assign({}, state, {secondSceneList: action.data})
    case SAVE_ALL_FIRST_SCENE_LIST:
    return Object.assign({}, state, {allFirstSceneList: action.data})
    case SAVE_ALL_SECOND_SCENE_LIST:
    return Object.assign({}, state, {allSecondSceneList: action.data})
    case SAVE_ALL_SCENE:
    return Object.assign({}, state, {allScene: action.data})
    default : return state
  }
}

export default combineReducers({
  visibility,
  visibility2,
  homeData,
  mediaData,
  habitData,
  toyData,
  voiceData
})
