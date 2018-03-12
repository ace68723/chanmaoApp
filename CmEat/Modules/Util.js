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
  }
}
