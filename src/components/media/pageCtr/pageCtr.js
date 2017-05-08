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
    return (
      <div className='pageCtr'
        style={!this.props.total || this.props.total === 1 ? {display: 'none'} : null}
        >
        <ul>
          <li
            style={this.state.arr[0] === this.state.active? {display:'none'}: null}
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
                    onClick={this.handleClick.bind(this, val,i)}
                    style={parseInt(this.state.active,10) === val? {border: 'none', color:'#5cc1df'}: null}

                  >{val}</li>
                )
              })
          }
        <li
          style={this.state.arr[this.state.arr.length-1] === this.state.active? {display:'none'}: null}
          onClick={
            ()=>{
              this.handleClick(this.state.active+1)
            }
          }
        >下一页</li>
        </ul>
      </div>
    )
  }
  initArr(total, buttons){
      const arr=[]
      if(!(total&&buttons)){
        return arr
      }
      total=parseInt(total,10)
      buttons=parseInt(buttons,10)
      buttons = total>buttons ? buttons :total
      for(let i=0;i<buttons;i++){
        arr[i]= i+1
      this.setState({arr})
      }
      return arr
    }
    componentDidMount(){
      const {total, buttons} =this.props
      this.initArr(total, buttons)
    }
    componentWillReceiveProps(nextProps){
      const {total, buttons} =this.props
      if(!total || !buttons ){
        this.initArr(nextProps.total, nextProps.buttons)
      }
    }  move(step){
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
    const arr=this.state.arr
    const middlePage=parseInt((arr[0]+arr[arr.length-1])/2, 10)
    this.move(pageTo-middlePage)
    this.setState({active:pageTo})
    this.props.changePage(pageTo)
    window.scrollTo(0,0)
  }
}
export default PageCtr
