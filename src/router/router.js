import React from 'react'
import {Router, Route, browserHistory, IndexRedirect} from 'react-router'
import App from '../components/app/app.js'
import Home from '../components/home/home.js'
import Media from '../components/media/media.js'
import Music from '../components/music/music.js'
import Album from '../components/album/album.js'
import Topic from '../components/topic/topic.js'
import Habit from '../components/habit/habit.js'
import Banner from '../components/banner/banner.js'
import Product from '../components/product/product.js'
import Toy from '../components/toy/toy.js'
import AddMusic from '../components/addMusic/addMusic.js'
import Tingting from '../components/tingting/tingting.js'
import OtherPlatform from '../components/otherPlatform/otherPlatform.js'
import AddAlbum from '../components/addAlbum/addAlbum.js'
import AddBanner from '../components/addBanner/addBanner.js'
import AddTopic from '../components/addTopic/addTopic.js'
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
