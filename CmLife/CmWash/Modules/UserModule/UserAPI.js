// import { API_ORDER_HISTORY, API_USER_ADDR } from '../../Config/API';
export default  {

  putUserAddr(io_data){
    const url = 'https://chanmao.us/api/cmclean/v1/user';
    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        authortoken: io_data.authortoken,
    })

    options.body = JSON.stringify({
      iv_addr: io_data.iv_addr,
      iv_province: io_data.iv_province,
      iv_lat:  io_data.iv_lat,
      iv_lng:  io_data.iv_lng,
      iv_name: io_data.iv_name,
      // iv_unit: io_data.iv_unit,
      iv_phone:  io_data.iv_phone,
    })
    console.log(options);

    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {console.log('1111');throw error})
  }
}
