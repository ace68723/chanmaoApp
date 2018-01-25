import { API_THEME_QUERY } from '../../Config/API';
export default  {
  getProductList(io_data){
    const url = API_THEME_QUERY;

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        uuid: io_data.uuid,
    })

    options.body = JSON.stringify({
      "iv_tmid": io_data.iv_tmid,
      "iv_lastid": io_data.iv_lastid,
      "iv_number": io_data.iv_number
    })


    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
}
