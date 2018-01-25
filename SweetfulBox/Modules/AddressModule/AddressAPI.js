import { API_CAN_DELIVER} from '../../Config/API';
export default  {
 
  checkCanDeliver(lat,lng){
    const url = API_CAN_DELIVER;

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        
    })

    options.body = JSON.stringify({
      iv_lng = lng,
      iv_lat = lat
    })


    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  }
}
