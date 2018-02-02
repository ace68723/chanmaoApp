import { API_CATEGORY,
         API_CATEGORY_QUERY,
         API_THEME_QUERY,
         API_HOME_DATA,
         API_SINGLE_PRODUCT,
         API_CHECK_STOCK
        } from '../../Config/API';
export default  {
  getCategoryList(io_data){
    const url = API_CATEGORY;

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
    const url = API_CATEGORY_QUERY;

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
      iv_tmid: io_data.iv_tmid,
      iv_lastid: io_data.iv_lastid,
      iv_number: io_data.iv_number,
    })
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  getHomeData(io_data){
    const url = API_HOME_DATA;

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
    const url = API_SINGLE_PRODUCT;

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
        iv_spu_id: io_data.iv_spu_id,
    })

    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },
  checkStock(io_data){
      console.log(io_data)
    const url = API_CHECK_STOCK;

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
   console.log(options)
    return fetch(url,options)
            .then((res) => res.json())
            .catch((error) => {throw error})
  },

}
