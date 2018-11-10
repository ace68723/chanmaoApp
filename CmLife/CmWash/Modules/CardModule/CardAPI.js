// import { API_ORDER_BEFORE, API_ADD_CARD, API_ADD_ORDER } from '../../Config/API';
export default  {

  addCard(io_data) {

    const url = 'https://norgta.com/api/cmclean/v1/card';

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
    console.log(options);
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },

}
