export default  {
  getDefaultData(io_data){
    const url = 'https://www.chanmao.ca';

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
    })

    options.body = JSON.stringify({
      // iv_lastid: io_data.iv_lastid,
    })


    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
}
