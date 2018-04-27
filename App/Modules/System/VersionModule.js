'use strict';
import VersionApi from './VersionApi';
const  VersionModule = {
  getLatestVersion(curVersion){
      return new Promise((resolve, reject) =>{
        VersionApi.getLatestVersion(curVersion).then((versiondata) => resolve(versiondata.ea_data))
        .catch((e)=>reject(e));
      })

  }
}
module.exports = VersionModule;
