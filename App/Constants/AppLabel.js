import { cme_getLanguage, cme_getRegion } from '../../App/Modules/Database';
const Label = {
  getCMLabel(key) {
          // console.log(cme_getLanguage());
          const language = cme_getLanguage();
          const region = cme_getRegion();
          let labelPackage
          if (language == 'chinese_simple') {
            switch(region){
              case '3':
                labelPackage = require('./CMLabel/hamilton/LabelsCNHM');
                break;
              default:
                labelPackage = require('./CMLabel/LabelsCN');
                break;
            }
            return labelPackage[key];
          } else if (language == 'english') {

            switch(region){
              case '3':
                labelPackage = require('./CMLabel/hamilton/LabelsENHM');
                break;
              default:
                labelPackage = require('./CMLabel/LabelsEN');
                break;
            }
            return labelPackage[key];
          }
          else if (language == 'french') {
            switch(region){
              case '3':
                labelPackage = require('./CMLabel/hamilton/LabelsFRHM');
                break;
              default:
                labelPackage = require('./CMLabel/LabelsFR');
                break;
            }
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
