export default  {
  getOrderBefore(io_data){
    const url = 'https://chanmao.us//api/sb/v1/order_before';

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
      ia_prod: io_data.ia_prod,
    })

    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  }
}
