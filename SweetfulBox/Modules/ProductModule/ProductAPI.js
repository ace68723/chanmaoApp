export default  {
  getCategoryList(io_data){
    const url = 'https://chanmao.us/api/sb/v1/category';

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
      iv_showpm: io_data.iv_showpm,
    })
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },

  searchCategoryList(io_data){
    const url = 'https://chanmao.us/api/sb/v1/category_query';

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
      iv_cmid: io_data.iv_cmid,
      iv_lastid: io_data.iv_lastid,
      iv_number: io_data.iv_number,
    })
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  searchThemeList(io_data){
    const url = 'https://chanmao.us/api/sb/v1/theme_query';

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
      iv_tmid: io_data.iv_tmid,
      iv_lastid: io_data.iv_lastid,
      iv_number: io_data.iv_number,
    })
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  getHomeData(io_data){
    const url = 'https://chanmao.us/api/sb/v1/home_data';

    let options = {
        method: 'GET',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    options.headers = Object.assign(options.headers,{
        uuid: io_data.uuid,
    })

    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  getSingleProduct(io_data){
    const url = 'https://chanmao.us/api/sb/v1/prod_base';

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
      iv_pmid: io_data.iv_pmid,
    })
    
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
}
