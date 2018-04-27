import AppConstants from '../Constants/AppConstants';
// // import {dispatch, register} from '../Dispatchers/AppDispatcher';
import VersionModule from '../Modules/System/VersionModule';

export default {
    getLatestVersion(curVersion){
        return new Promise((resolve, reject) =>{
          VersionModule.getLatestVersion(curVersion).then((versiondata) => resolve(versiondata))
          .catch((e)=>reject(e));
        })

    }
}
