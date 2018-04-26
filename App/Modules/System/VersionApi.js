'use strict';
const VersionApi = {

    getVersion(){
      const url = 'https://norgta.com/api/general/v2/get_version';
      let options = {
          method: 'GET',
      }
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
   
}

module.exports = VersionApi;
