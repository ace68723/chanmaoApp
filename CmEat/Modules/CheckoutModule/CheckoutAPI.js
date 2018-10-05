import { API_ORDER_BEFORE,
         API_ADD_CARD,
         API_ADD_ORDER,
         API_SIGN_ALIPAY_ORDER,
         API_CHARGE_UPDATE,
         API_ONE_TIME_CHARGE } from '../../Config/API';
export default  {
  beforeCheckoutInit(io_data) {
    const url = "https://www.cmapi.ca/cm_qa_lumen/backend/index.php/api/checkout/v1/before_co_init";

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        authortoken: io_data.authortoken
    });
    options.body = JSON.stringify(io_data.body);
    console.log(options);
    return fetch(url,options)
            .then(
              // (res) => res.json()
              (res) => {
                console.log(res);
                return res.json();
              }
            )
            .catch((error) => {throw error})
  },
  beforeCheckoutUpdate(io_data) {
    const url = "https://www.cmapi.ca/cm_qa_lumen/backend/index.php/api/checkout/v1/before_co_update";

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
    });

    options.body = JSON.stringify(io_data.body);
    console.log(options);
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  checkout(io_data){
    const url = "https://www.cmapi.ca/cm_qa_lumen/backend/index.php/api/checkout/v1/checkout";

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        authortoken: io_data.authortoken
    });
    options.body = JSON.stringify(io_data.body);
    console.log(url);
    console.log(options);
    return fetch(url,options)
            .then(
              // (res) => res.json()
              (res) => {
                console.log(res);
                return res.json();
              }
            )
            .catch((error) => {throw error})
  },
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
}
