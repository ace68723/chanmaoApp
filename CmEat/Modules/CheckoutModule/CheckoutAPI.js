import { API_ORDER_BEFORE,
         API_ADD_CARD,
         API_ADD_ORDER,
         API_SIGN_ALIPAY_ORDER,
         API_CHARGE_UPDATE } from '../../Config/API';
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
  oneTimeCharge(io_data){
    let url = "https://norgta.com/api/payment/v2/one_time_charge";
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
        amount: io_data.amount,
        info:io_data.oid_str,
        token:io_data.token
    })
    return fetch(url,options)
            .then((res) => {
                console.log(res);
                return res.json();
            })
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
  },

  stripeChargeAndUpdate(reqData){
    const url = API_CHARGE_UPDATE;
    // const url = "https://norgta.com/api/payment/v2/charge_and_update";
    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const amount = reqData.amount;
    const oid = reqData.oid;
    const POST_DATA = { amount, oid }
    options.headers.authortoken = reqData.token;
    options.body =  JSON.stringify(POST_DATA)
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
}
