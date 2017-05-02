import React, {Component} from 'react'
import './lookDeviceInfo.css'
import QRCode from 'qrcode.react'
class LookDeviceInfo extends Component{
  render(){
    const {isShow, handleClick, device} = this.props
    return (
      <div className='popup' style={!isShow? {display: 'none'}: null}>
          <div>
            <span onClick={handleClick}>×</span>
            <h1>设备信息查看</h1>
            <QRCode value={device.qrcode||''}/>
            <p><span>设备id</span>{device.device_id}</p>
          </div>
      </div>
    )
  }
}
export default LookDeviceInfo
