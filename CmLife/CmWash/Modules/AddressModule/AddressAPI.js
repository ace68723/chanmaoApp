// import { API_CAN_DELIVER} from '../../Config/API';
export default  {

  checkCanDeliver(lat,lng){
    const url = 'https://chanmao.us/api/cmclean/v1/can_deliver';

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
      iv_lng: lng.toString(),
      iv_lat: lat.toString()
    })
    console.log(options);
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  }
}
