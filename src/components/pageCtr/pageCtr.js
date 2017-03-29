import React, {Component} from 'react'
import './pageCtr.css'
class PageCtr extends Component{
  constructor(props){
    super(props)
    this.state={
      arr:[],
      active:1
    }
  }
  render(){
    let {total} = this.props
    total=parseInt(total,10)
    return (
        <ul className='pageCtr'>
          <li
            style={this.state.arr[0] === 1? {display:'none'}: null}
            onClick={
              ()=>{
                this.handleClick(this.state.active-1)
              }
            }
          >上一页</li>
          {
              this.state.arr.map((val,i)=>{
                return (
                  <li key={i}
                    onClick={this.handleClick.bind(this, val)}
                    style={parseInt(this.state.active,10) === val? {border: 'none'}: null}

                  >{val}</li>
                )
              })
          }
        <li
          style={this.state.arr[this.state.arr.length-1] === total? {display:'none'}: null}
          onClick={
            ()=>{
              this.handleClick(this.state.active+1)
            }
          }
        >下一页</li>
        </ul>
    )
  }
  componentWillMount(){
    let {total, buttons} =this.props
    const arr=[]
    total=parseInt(total,10)
    buttons=parseInt(buttons,10)
    buttons=total>buttons? buttons :total
    for(let i=0;i<buttons;i++){
      arr[i]=i+1
    }
    this.arr=arr
    this.setState({arr})
  }
  move(step){
    let {total, buttons} =this.props
    total=parseInt(total,10)
    buttons=parseInt(buttons,10)
    buttons=total>buttons? buttons :total
    const arr= this.state.arr.map((val, i)=>{
      return val+step
    })
    if(arr[0]<1){
      for(let i=0;i<buttons;i++){
        arr[i]=i+1
      }
      this.setState({arr})
      return
    }
    if(arr[buttons-1]>total){
      for(let i=0;i<buttons;i++){
        arr[i]=total-buttons + 1 + i
      }
      this.setState({arr})
      return
    }
    this.setState({arr})
  }
  handleClick(pageTo){
    let {total, buttons} =this.props
    total=parseInt(total,10)
    buttons=parseInt(buttons,10)
    buttons=total>buttons? buttons :total
    pageTo=parseInt(pageTo, 10)
    this.move(pageTo-this.state.active)
    this.setState({active:pageTo})
    this.props.changePage(pageTo)
  }
}
export default PageCtr
