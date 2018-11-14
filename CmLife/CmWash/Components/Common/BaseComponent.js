
import React, { Component } from 'react';

import {
    Dimensions,
    PixelRatio,
    Platform,
} from 'react-native';

class BaseComponent extends Component {

    mScreenWidth = Dimensions.get('window').width;

    mScreenHeight = Dimensions.get('window').height;

    mSafeZoneHeight = this.isIphoneXorAbove() ? 18 : 0;

    //最小显示单位
    mOnePixel = (PixelRatio.get() == 3 ? 2 : 1) / PixelRatio.get();

    constructor(props) {
        super(props);
    }

    /**
     * return 當前分辨率下的數值
     * @param {*} size 375标注图下的值
     */
    getSize(size) {
        return parseInt(this.mScreenWidth * size / 375);
    }

    isIphoneXorAbove() {
      const dimen = Dimensions.get('window');
      return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
      );
    }

}

export default BaseComponent;
