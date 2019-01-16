import Constants from '../Constants/Constants';
import {dispatch, register} from '../Dispatchers/Dispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const UserStore = Object.assign({},EventEmitter.prototype,{
  state:{
    orderHistory:[],
    shouldDoAuth: true,
  },
	emitChange(){
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
  updateOrderHistoryState(la_orderHistory){

      this.state.orderHistory = la_orderHistory;
  },
  updateUserAuth(flag) {
      this.state.shouldDoAuth = flag;
  },
  clearUserAuth(flag) {
      this.state.shouldDoAuth = flag;
  },
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
        case Constants.UPDATE_USER_AUTH:
          UserStore.updateUserAuth(action.data);
          UserStore.emitChange();
          break;
        case Constants.CLEAR_USER_AUTH:
          UserStore.clearUserAuth(action.data);
          UserStore.emitChange();
          break;
				case Constants.GET_ORDER_HISTORY:
          UserStore.updateOrderHistoryState(action.data.orderHistory)
          UserStore.emitChange()
					break;

        case Constants.PUT_USER_ADDR:
          UserStore.emitChange()
  				break;

        default:
         // do nothing
		  }

	})

});
module.exports = UserStore;
