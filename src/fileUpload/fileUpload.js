import fetch from 'isomorphic-fetch'
import {baseUrl} from '../config/config.js'
function fileUpload(file, callBack){
  if(file=== 'ignore'){
    return callBack('')
  }
  if(!file){
    return callBack('')
  }
  const formParams= new FormData()
  formParams.append('files',file)
  fetch(baseUrl+'/core/common/upload',{
    method:'post',
    body: formParams,
    mode: 'cors'
  }).then(res=> res.json())
  .then(json=>json.data.file_name)
  .then(callBack)
}
export default fileUpload
