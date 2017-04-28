import React, {Component} from 'react'
import './lookDeviceInfo.css'
class LookDeviceInfo extends Component{
  render(){
    const {isShow, handleClick, device} = this.props
    return (
      <div className='popup' style={!isShow? {display: 'none'}: null}>
          <div>
            <span onClick={handleClick}>×</span>
            <h1>设备信息查看</h1>
            <div id='qrcode'>

            </div>
            <p><span>设备id</span>{device.device_id}</p>
          </div>
      </div>
    )
  }
  componentDidMount(){
    // new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie")
  }
}
export default LookDeviceInfo
