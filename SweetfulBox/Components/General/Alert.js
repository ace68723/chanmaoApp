'use strict';
import {
  Alert
} from 'react-native';
const AlertModule = {
  errorAlert(message){
    Alert.alert(
      '小明配送提醒您',
      message.toString(),
      [
        {text: 'OK', onPress: () => {}},
      ]
    )
  }
}

module.exports = AlertModule;
