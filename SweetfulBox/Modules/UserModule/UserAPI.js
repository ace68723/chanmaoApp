export default  {
  getOrderHistory(io_data){
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
        authortoken: io_data.authortoken,
    })

    options.body = JSON.stringify({

    })

    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  putUserAddr(io_data){
    const url = 'https://chanmao.us/api/sb/v1/user_addr';

    let options = {
        method: 'PUT',
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
        iv_cbid: io_data.iv_cbid,
        iv_name: io_data.iv_name,
        iv_unit: io_data.iv_unit,
        iv_tel: io_data.iv_tel,

    })


    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  }
}
