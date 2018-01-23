export default  {
  getDefaultData(io_data){
    const url = 'https://chanmao.us/api/sb/v1/order_history';

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        // authortoken: io_data.authortoken,
        authortoken: io_data.authortoken
    })

    options.body = JSON.stringify({
      // iv_lastid: io_data.iv_lastid,
    })


    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
}
