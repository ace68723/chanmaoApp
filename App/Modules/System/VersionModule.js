'use strict';
import VersionApi from './VersionApi';
const  VersionModule = {
  getCurrentVersion(){
      return new Promise((resolve, reject) =>{
        VersionApi.getVersion().then((versiondata) => resolve(versiondata.ea_data))
        .catch((e)=>reject(e));
      })
      
  }
}
module.exports = VersionModule;