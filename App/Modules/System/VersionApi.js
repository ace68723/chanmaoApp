'use strict';
const VersionApi = {

    getLatestVersion(curVersion, platform){
      const url = 'https://chanmao.us/api/general/v2/get_version';
      let options = {
          method: 'GET',
      }
      options.headers = Object.assign({
          current_version: curVersion,
          platform,
          appid: 1
      });
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },

}

module.exports = VersionApi;
