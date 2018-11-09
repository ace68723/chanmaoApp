'use strict';
import {
  Alert
} from 'react-native';
import Label from '../../Constants/AppLabel';

const AlertModule = {
  errorAlert(message){
    Alert.alert(
      Label.getCMLabel('CHANMAO_REMINDING'),
      message.toString(),
      [
        {text: 'OK', onPress: () => {}},
      ]
    )
  }
}

module.exports = AlertModule;
