import { combineReducers } from 'redux'
import {
  SAVE_MUSIC_LIST,SAVE_ALBUM_LIST,
  SAVE_TOPIC_LIST,SAVE_BANNER_LIST,
  SAVE_LINK_ALBUM_LIST,SAVE_SEARCH_MUSIC_LIST
} from './actionTypes.js'
function mediaData(state={
  musicList: [],
  albumList: [],
  topicList: [],
  bannerList: [],
  linkAlbumList: [],
  searchMusicList: []
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
    default:
    return state
  }
}
export default combineReducers({
  mediaData
})
