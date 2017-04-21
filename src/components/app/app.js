import React, {Component} from 'react'
import './app.css'
import Header from '../header/header.js'
import Aside from '../aside/aside.js'
import FetchNotice from '../fetchNotice/fetchNotice.js'
class App extends Component{
  render(){
    return (
      <div>
        <Header></Header>
        <div className='container'>
          <Aside></Aside>
          {this.props.children}
        </div>
        <FetchNotice></FetchNotice>
      </div>
    )
  }
}
export default App
