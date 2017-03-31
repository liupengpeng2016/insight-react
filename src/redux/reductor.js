import { combineReducers } from 'redux'
import {
  SAVE_MUSIC_LIST,SAVE_ALBUM_LIST,
  SAVE_TOPIC_LIST,SAVE_BANNER_LIST,
  SAVE_LINK_ALBUM_LIST,SAVE_SEARCH_MUSIC_LIST,
  SAVE_LINK_TOPIC_LIST,SAVE_HABIT_PLAN,SAVE_HABIT_PLAN_EVENT
} from './actionTypes.js'
function mediaData(state={
  musicList: [],
  albumList: [],
  topicList: [],
  bannerList: [],
  linkAlbumList: [],
  searchMusicList: [],
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
export default combineReducers({
  mediaData,
  habitData
})
