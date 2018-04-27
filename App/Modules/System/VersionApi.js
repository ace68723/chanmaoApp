'use strict';
const VersionApi = {

    getLatestVersion(curVersion){
      const url = 'https://norgta.com/api/general/v2/get_version';
      let options = {
          method: 'GET',
      }
      options.headers = Object.assign({
          current_version: curVersion,
      });
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },

}

module.exports = VersionApi;
