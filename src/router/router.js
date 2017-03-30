import React from 'react'
import {Router, Route, browserHistory, IndexRedirect} from 'react-router'
import App from '../components/app/app.js'
import Home from '../components/home/root/home.js'
import Media from '../components/media/root/media.js'
import Habit from '../components/habit/root/habit.js'
import Product from '../components/product/root/product.js'
import Toy from '../components/toy/root/toy.js'

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
const router = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='home'></IndexRedirect>
      <Route path='home' component={Home}></Route>
      <Route path='media' component={Media}>
        <IndexRedirect to='music'></IndexRedirect>
        <Route path='music' component={Music}></Route>
        <Route path='album' component={Album}></Route>
        <Route path='topic' component={Topic}></Route>
        <Route path='banner' component={Banner}></Route>
        <Route path='editorMusic' component={EditorMusic}></Route>
        <Route path='editorAlbum' component={EditorAlbum}></Route>
      </Route>
      <Route path='habit' component={Habit}></Route>
      <Route path='product' component={Product}></Route>
      <Route path='Toy' component={Toy}></Route>
      <Route path='addMusic' component={AddMusic}>
        <IndexRedirect to='tingting'/>
        <Route path='tingting' component={Tingting}></Route>
        <Route path='other' component={OtherPlatform}></Route>
      </Route>
      <Route path='addAlbum' component={AddAlbum}></Route>
      <Route path='addTopic' component={AddTopic}></Route>
      <Route path='addBanner' component={AddBanner}></Route>
    </Route>
  </Router>
)
export default router
