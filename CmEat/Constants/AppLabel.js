const CMLabel = {
    getCNLabel(key){
        let labelPackage = require('./Label/LabelsCN');
        return labelPackage[key];
    }
}
module.exports = CMLabel;