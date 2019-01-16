export default  {
getOrderBefore(io_data){
    const url = 'http://norgta.com/api/blackhawk/v1/order_before';

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
  checkUaid(uid) {

    const url = 'https://norgta.com/api/blackhawk/v1/ckeck_uaid';

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }


    options.body = JSON.stringify({
      uid: uid,
    })

    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  checkout(io_data) {
    const url = API_ADD_ORDER;

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
      prod: io_data.prod,
      version:io_data.version,
      comment: io_data.comment,
    })
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  }
}
