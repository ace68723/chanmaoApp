'use strict';
import React, {
	Component,
} from 'react';
import {
  AlertIOS
} from 'react-native';
const showAlert = false;
const Alert = {
  errorAlert(message){
    if(!showAlert){
      showAlert = !showAlert;
			let _message;
			if (typeof message != 'string') {
				_message = message.toString();
			}
			else {
				_message = message;
			}
      AlertIOS.alert(
        '小明配送提醒您',
        _message,
        [
          {text: 'OK', onPress: () =>{ showAlert = !showAlert}},
        ]
      )
    }

  }
}

module.exports = Alert;
