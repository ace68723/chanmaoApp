import { cme_getLanguage } from '../../App/Modules/Database';
const CMLabel = {
    getLabel(key){
        // console.log(cme_getLanguage());
        const language = cme_getLanguage();
        if (language == 'chinese_simple') {
          let labelPackage = require('./Label/LabelsCN');
          return labelPackage[key];
        } else if (language == 'english') {
          let labelPackage = require('./Label/LabelsEN');
          return labelPackage[key];
        }
        else if (language == 'french') {
          let labelPackage = require('./Label/LabelsFR');
          return labelPackage[key];
        }
    }
}
module.exports = CMLabel;
