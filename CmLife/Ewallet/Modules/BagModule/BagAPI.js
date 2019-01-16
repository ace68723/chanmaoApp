export default  {
    getCardList(io_data) {
  
      const url = 'https://norgta.com/api/blackhawk/v1/get_card_list';
  
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
  
      options.body = JSON.stringify({
        uid: io_data.uid
      })
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    getCardBalance(io_data) {
  
      const url = 'https://norgta.com/api/blackhawk/v1/get_card_balance';
  
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
  
      options.body = JSON.stringify({
        account_id:io_data.account_id
      })
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    }
  }
  