import {
  Platform,
  Dimensions,
} from 'react-native';

let waitingStatus = false;
const WAIT_TIME = 500;

export default {

  toggleWaitingStatus() {
    if (waitingStatus === true) {
      waitingStatus = false;
    } else {
      waitingStatus = true;
    }

    setTimeout(() => {
      if (waitingStatus === true) {
        waitingStatus = false;
      } else {
        waitingStatus = true;
      }
    }, WAIT_TIME);
  },

  getWaitingStatus() {
    return waitingStatus;
  },

  isiPhoneX() {
    return (Platform.OS === 'ios' &&
    ((Dimensions.get('window').height === 812 && Dimensions.get('window').width === 375) ||
    (Dimensions.get('window').height === 375 && Dimensions.get('window').width === 812)))
  },
}
