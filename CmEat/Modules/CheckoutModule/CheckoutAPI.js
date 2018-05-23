import { API_ORDER_BEFORE, API_ADD_CARD, API_ADD_ORDER, API_SIGN_ALIPAY_ORDER } from '../../Config/API';
export default  {
  addCard(io_data) {

    const url = API_ADD_CARD;

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
      iv_token: io_data.iv_token,
    })
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },


  signAlipayOrder(io_data) {

    const url = API_SIGN_ALIPAY_ORDER;

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        Authortoken: io_data.Authortoken,
    })

    options.body = JSON.stringify({
      sign_str: io_data.sign_str,
      data: io_data.data,
    })

    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  }
}
