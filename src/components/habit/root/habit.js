import React, {Component} from 'react'
import {Link} from 'react-router'
class Habit extends Component{
  render(){
    const activeCSS = {
      borderBottom: '4px solid #5cc1df'
    }
    return (
      <div className='content'>
        <h1>习惯养成</h1>
        <h2>系统计划</h2>
        <ul className='sub-tab'>
          <li><Link to='/media/music' activeClassName='a-link-active' activeStyle={activeCSS}>睡眠习惯养成计划</Link></li>
          <li><Link to='/media/album' activeClassName='a-link-active' activeStyle={activeCSS}>早起习惯养成计划</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
export default Habit
