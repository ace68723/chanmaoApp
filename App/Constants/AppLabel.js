import { cme_getLanguage } from '../../App/Modules/Database';
const Label = {
    getCMLabel(key) {
        // console.log(cme_getLanguage());
        const language = cme_getLanguage();
        if (language == 'chinese_simple') {
          let labelPackage = require('./CMLabel/LabelsCN');
          return labelPackage[key];
        } else if (language == 'english') {
          let labelPackage = require('./CMLabel/LabelsEN');
          return labelPackage[key];
        }
        else if (language == 'french') {
          let labelPackage = require('./CMLabel/LabelsFR');
          return labelPackage[key];
        }
    },
    getSboxLabel(key) {
      const language = cme_getLanguage();
      if (language == 'chinese_simple') {
        let labelPackage = require('./SboxLabel/LabelsCN');
        return labelPackage[key];
      } else if (language == 'english') {
        let labelPackage = require('./SboxLabel/LabelsEN');
        return labelPackage[key];
      }
      else if (language == 'french') {
        let labelPackage = require('./SboxLabel/LabelsFR');
        return labelPackage[key];
      }
    }
}
module.exports = Label;
