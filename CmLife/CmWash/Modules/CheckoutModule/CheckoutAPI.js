// import { API_ORDER_BEFORE, API_ADD_CARD, API_ADD_ORDER } from '../../Config/API';
export default  {
  beforeOrder(io_data){
    const url = 'https://chanmao.us/api/cmclean/v1/before_order';

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        'authortoken':io_data.token,
    })

    options.body = JSON.stringify({
      iv_products: io_data.products,
    })

    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  getCard(io_data){
    const url = 'https://chanmao.us/api/cmclean/v1/card';

    let options = {
        method: 'GET',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        'authortoken':io_data.token,
    })



    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  getDeliveryTime(io_data){
    const url = 'https://chanmao.us/api/cmclean/v1/delivery_date_time';

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
      'authortoken':io_data.token,
    })
    options.body = JSON.stringify({
      'iv_date': io_data.date,
      'iv_wash_time': io_data.wash_time
    })


    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  placeOrder(io_data){
    const url = 'https://chanmao.us/api/cmclean/v1/order';

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        'authortoken':io_data.token,
    })
    options.body = JSON.stringify({
      'iv_method':1,
      'iv_location_id':io_data.iv_location_id,
      'iv_pickup_date':io_data.iv_pickup_date,
      'iv_pickup_time':io_data.iv_pickup_time,
      'iv_delivery_date':io_data.iv_delivery_date,
      'iv_delivery_time':io_data.iv_delivery_time,
      'iv_comment':io_data.iv_comment,
      'iv_products':io_data.iv_products,
    })


    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },

}
