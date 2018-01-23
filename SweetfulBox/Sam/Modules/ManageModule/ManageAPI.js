export default  {
  getDailyRedis(io_data){
    const url = 'https://chanmao.us//api/sb/v1/daily_load';

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
  }
}
