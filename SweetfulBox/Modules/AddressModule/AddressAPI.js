import { API_CONDO_LIST, API_CONDO_FUZZY } from '../../Config/API';
export default  {
  getCondoList(io_data){
    // console.log('getdata')
    // console.log("io_data",io_data)
    const url = API_CONDO_LIST;

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
    const url = API_CONDO_FUZZY;

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
