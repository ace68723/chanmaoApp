// import { API_ORDER_BEFORE, API_ADD_CARD, API_ADD_ORDER } from '../../Config/API';
export default  {
  getHistoryOrder(io_data){
    const url =  'https://norgta.com/api/cmclean/v1/order_history';

    let options = {
        method: 'GET',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        authortoken: io_data.authortoken,
    })

    // options.body = JSON.stringify({
    //   ia_prod: io_data.ia_prod,
    //   version:io_data.version,
    // })

    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },

}
