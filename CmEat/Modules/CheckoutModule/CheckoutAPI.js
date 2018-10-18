import { API_ORDER_BEFORE,
         API_ADD_CARD,
         API_ADD_ORDER,
         API_SIGN_ALIPAY_ORDER,
         API_CHARGE_UPDATE,
         API_ONE_TIME_CHARGE,
         API_BEFORE_CHECKOUT_INIT,
         API_BEFORE_CHECKOUT_UPDATE,
         API_CHECKOUT,
         API_CHECK_COUPON } from '../../Config/API';
export default  {
  beforeCheckoutInit(io_data) {
    const url = API_BEFORE_CHECKOUT_INIT;

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
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  beforeCheckoutUpdate(io_data) {
    const url = API_BEFORE_CHECKOUT_UPDATE;

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
    // return this.fetchWithTimeout(url, options, 10)
    //             .then((result) => {
    //               console.log(result);
    //               return result.data;
    //             })
    //             .catch((error) => {
    //               console.log(error);
    //               throw error;
    //             })
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
  checkout(io_data){
    const url = API_CHECKOUT;

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
    return fetch(url,options)
            .then((res) => res.json())
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
  checkCouponCode(reqData){
    const url = API_CHECK_COUPON;
    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    options.headers.Authortoken = reqData.token;
    options.body = JSON.stringify({
      coupon_code: reqData.coupon,
    })
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  fetchWithTimeout(url, options, timeout=5000) {
    var timeoutPromise = new Promise(function(resolve,reject){
                            setTimeout(resolve, timeout, {status: 'error', code: 666, data: 'Verbinding met de cloud kon niet tot stand gebracht worden: Timeout.'});
                          });
    return Promise.race([timeoutPromise, fetch(url, options)]).then((result) => {
                        console.log(result);
                        var Status = result.status;
                        if (result.status === 500 || result.status === 404) {
                          return {status: 'error', code: 666, data: 'server failed'};
                        }
                        return result.json().then(function(data){
                          if (Status === 200 || Status === 0) {
                            return {status: 'success', code: Status, data: data};
                          }
                          else {
                            return {status: 'error', code: Status, data: 'Error (' + data.status_code + '): ' + data.message};
                          }
                        },function (response) {
                          return {status: 'error', code: Status, data: 'json promise failed' + response};
                        }).catch((error) => {
                          return {status: 'error', code: 666, data: 'no json response'};
                        });
                      }, function(error){
                          return {status: 'error', code: 666, data: 'connection timed out'};
                      }).catch((error) => {
                          return {status: 'error', code: 666, data: 'connection timed out'};
                      });
  }
}
