import { API_ORDER_HISTORY, API_USER_ADDR } from '../../Config/API';
export default  {
  getOrderHistory(io_data){
    const url = API_ORDER_HISTORY;

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

    })

    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  putUserAddr(io_data){
    const url = API_USER_ADDR;
    let options = {
        method: 'PUT',
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
      iv_unit: io_data.iv_unit,
      iv_tel:  io_data.iv_tel,
    })


    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  }
}
