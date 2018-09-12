import { API_ORDER_BEFORE,
         API_ADD_CARD,
         API_ADD_UNIONPAY_CARD,
         API_ADD_ORDER,
         API_SIGN_ALIPAY_ORDER,
         API_CHARGE_UPDATE,
         API_ONE_TIME_CHARGE,
         API_UNION_CHARGE_UPDATE } from '../../Config/API';
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
  addUnionpayCard(io_data) {

    const url = API_ADD_UNIONPAY_CARD;

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
      account_number: io_data.account_number,
      expire_month: io_data.expire_month,
      expire_year: io_data.expire_year,
      first_name: io_data.first_name,
      last_name: io_data.last_name,
    })

    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  oneTimeCharge(io_data){
    let url = API_ONE_TIME_CHARGE;
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
        oid:io_data.oid,
        token:io_data.token
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
  unionPayChargeAndUpdate(reqData) {
    const url = API_UNION_CHARGE_UPDATE;
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
    const sec_code = reqData.securityCode;
    const POST_DATA = { amount, oid, sec_code }
    options.headers.authortoken = reqData.token;
    options.body =  JSON.stringify(POST_DATA)
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
}
