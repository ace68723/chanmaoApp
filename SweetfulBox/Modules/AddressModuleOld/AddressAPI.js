export default  {
  getCondoList(io_data){
    const url = 'https://chanmao.us/api/sb/v1/condo_list';

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        location: io_data.location,
        uuid: io_data.uuid,
    })

    options.body = JSON.stringify({
      iv_lastid: io_data.iv_lastid,
      iv_number: io_data.iv_number,
    })


    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },

  getCondoFuzzy(io_data){
    const url = 'https://chanmao.us/api/sb/v1/condo_fuzzy';

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
      iv_keyword: io_data.iv_keyword,
    })


    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  }
}
