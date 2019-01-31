export default  {
  addCard(io_data) {

    const url = 'https://chanmao.us/api/sb/v2/stripe_card';

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
      // iv_uid: 2,
      iv_token: io_data.iv_token,
    })
    console.log(options)
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  addOrder(io_data) {

    const url = 'https://chanmao.us/api/blackhawk/v1/buy_ecard';

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.body = JSON.stringify({
      uid: io_data.uid,
      productLists: io_data.productLists,
    })
    console.log(options)
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  getOrderBefore(io_data){
    const url = 'https://chanmao.us/api/sb/v2/order_before';

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    options.body = JSON.stringify({
      iv_uid: 1
    })
    console.log(options)
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
}
