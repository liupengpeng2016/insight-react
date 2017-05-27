import React from 'react'
import {Router, Route, hashHistory, IndexRedirect} from 'react-router'
import App from '../components/app/app.js'
import Home from '../components/home/root/home.js'
//media
import Media from '../components/media/root/media.js'
import MediaList from '../components/media/mediaList/mediaList.js'
import Music from '../components/media/music/music.js'
import Album from '../components/media/album/album.js'
import Topic from '../components/media/topic/topic.js'
import Banner from '../components/media/banner/banner.js'
import AddMusic from '../components/media/addMusic/addMusic.js'
import Tingting from '../components/media/tingting/tingting.js'
import OtherPlatform from '../components/media/otherPlatform/otherPlatform.js'
import AddAlbum from '../components/media/addAlbum/addAlbum.js'
import AddBanner from '../components/media/addBanner/addBanner.js'
import AddTopic from '../components/media/addTopic/addTopic.js'
import EditorMusic from '../components/media/editorMusic/editorMusic.js'
import EditorAlbum from '../components/media/editorAlbum/editorAlbum.js'
import EditorTopic from '../components/media/editorTopic/editorTopic.js'
import EditorBanner from '../components/media/editorBanner/editorBanner.js'
import AlbumList from '../components/media/albumList/albumList.js'
import MusicOfAlbum from '../components/media/musicOfAlbum/musicOfAlbum.js'
import TopicList from '../components/media/topicList/topicList.js'
import AlbumOfTopic from '../components/media/albumOfTopic/albumOfTopic.js'
//habit
import Habit from '../components/habit/root/habit.js'
import ShowPlan from '../components/habit/showPlan/showPlan.js'
import AddPlan from '../components/habit/addPlan/addPlan.js'
import AddEvent from '../components/habit/addEvent/addEvent.js'
import EditorPlan from '../components/habit/editorPlan/editorPlan.js'
import EditorPlanEvent from '../components/habit/editorPlanEvent/editorPlanEvent.js'
//voice
import Voice from '../components/voice/root/voice.js'
import VoiceSystem from '../components/voice/voiceSystem/voiceSystem.js'
import VoiceManage from '../components/voice/voiceManage/voiceManage.js'
import Record from '../components/voice/record/record.js'
import RecordList from '../components/voice/recordList/recordList.js'
import VoiceOfRecord from '../components/voice/voiceOfRecord/voiceOfRecord.js'
import SceneManage from '../components/voice/sceneManage/sceneManage.js'
import SecondScene from '../components/voice/secondScene/secondScene.js'
//toy
import Toy from '../components/toy/root/toy.js'
import ToyPlan from '../components/toy/toyPlan/toyPlan.js'
import AddToyAction from '../components/toy/addToyAction/addToyAction.js'
import EditorToyAction from '../components/toy/editorToyAction/editorToyAction.js'
import EditorToyInformation from '../components/toy/editorToyInformation/editorToyInformation.js'
const router = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='home'></IndexRedirect>
      <Route path='home' component={Home}></Route>
      <Route path='media' component={Media}>
        <IndexRedirect to='mediaList'></IndexRedirect>
        <Route path='mediaList' component={MediaList}>
          <IndexRedirect to='music'></IndexRedirect>
          <Route path='music' component={Music}></Route>
          <Route path='album' component={Album}>
            <IndexRedirect to='albumList'></IndexRedirect>
            <Route path='albumList' component={AlbumList}/>
            <Route path='musicOfAlbum' component={MusicOfAlbum}/>
          </Route>
          <Route path='topic' component={Topic}>
            <IndexRedirect to='topicList'></IndexRedirect>
            <Route path='topicList' component={TopicList}></Route>
            <Route path='albumOfTopic' component={AlbumOfTopic}></Route>
          </Route>
          <Route path='banner' component={Banner}></Route>
        </Route>
        <Route path='editorMusic' component={EditorMusic}></Route>
        <Route path='editorAlbum' component={EditorAlbum}></Route>
        <Route path='editorTopic' component={EditorTopic}></Route>
        <Route path='editorBanner' component={EditorBanner}></Route>
        <Route path='addMusic' component={AddMusic}>
          <IndexRedirect to='tingting'/>
          <Route path='tingting' component={Tingting}></Route>
          <Route path='other' component={OtherPlatform}></Route>
        </Route>
        <Route path='addAlbum' component={AddAlbum}></Route>
        <Route path='addTopic' component={AddTopic}></Route>
        <Route path='addBanner' component={AddBanner}></Route>
      </Route>
      <Route path='habit' component={Habit}>
        <IndexRedirect to='showPlan'/>
        <Route path='showPlan' component={ShowPlan}/>
        <Route path='addPlan' component={AddPlan}/>
        <Route path='addEvent' component={AddEvent}/>
        <Route path='editorPlan' component={EditorPlan}/>
        <Route path='editorPlanEvent' component={EditorPlanEvent}/>
      </Route>
      <Route path='voice' component={Voice}>
        <IndexRedirect to='voiceSystem'/>
        <Route path='voiceSystem' component={VoiceSystem}>
          <IndexRedirect to='voiceManage'/>
          <Route path='voiceManage' component={VoiceManage}></Route>
          <Route path='sceneManage' component={SceneManage}></Route>
          <Route path='record' component={Record}>
            <IndexRedirect to='recordList'/>
            <Route path='recordList' component={RecordList}/>
            <Route path='voiceOfRecord' component={VoiceOfRecord}/>
          </Route>
        </Route>
        <Route path='secondScene' component={SecondScene}></Route>
      </Route>
      <Route path='toy' component={Toy}>
        <IndexRedirect to='toyPlan/shake'></IndexRedirect>
        <Route path='toyPlan/:id' component={ToyPlan}></Route>
        <Route path='addToyAction' component={AddToyAction}></Route>
        <Route path='editorToyAction' component={EditorToyAction}></Route>
        <Route path='editorToyInformation' component={EditorToyInformation}></Route>
      </Route>
    </Route>
  </Router>
)
export default router
