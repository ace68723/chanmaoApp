export default  {

  getProductList(){
    const url = 'https://norgta.com/api/blackhawk/v1/get_product_list';

    let options = {
        method: 'GET',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{

    })

    // options.body = JSON.stringify({
    //   iv_lng: lng,
    //   iv_lat: lat
    // })
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  }
}
