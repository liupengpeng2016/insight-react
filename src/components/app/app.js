import React, {Component} from 'react'
import './app.css'
import Header from '../header/header.js'
import Aside from '../aside/aside.js'
class App extends Component{

  render(){
    return (
      <div>
        <Header></Header>
        <div className='container'>
          <Aside></Aside>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default App
