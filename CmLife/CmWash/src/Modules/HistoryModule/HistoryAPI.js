// import { API_ORDER_BEFORE, API_ADD_CARD, API_ADD_ORDER } from '../../Config/API';
export default  {
  HistoryOrder(io_data){
    const url = 'https://norgta.com/api/cmclean/v1/order_history';

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

}
