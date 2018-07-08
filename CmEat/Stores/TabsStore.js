import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';

let state = {
  tabBarPosition:'bottom',
  showTabBar:true,
  goToHistory:false,
};
const TabsStore = Object.assign({},EventEmitter.prototype,{
	emitChange(){
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
  GO_TO_HISTORY(data){
    if (data.payment_channel == 0) {
      state = Object.assign({},state,{goToHistory:true})
      setTimeout(() => {
        state = Object.assign({},state,{goToHistory:false})
      }, 500);
    }
  },
  tab_go_to_history(data) {
    state = Object.assign({},state,{goToHistory:true, paymentFail:data.paymentFail})
    setTimeout(() => {
      state = Object.assign({},state,{goToHistory:false, paymentFail: false})
    }, 1000);
  },
  getState(){
    return state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				// case AppConstants.CHECKOUT:
					   // TabsStore.GO_TO_HISTORY(action.data);
             // TabsStore.emitChange();
             // break;
        case AppConstants.TAB_GO_TO_HISTORY:
             TabsStore.tab_go_to_history(action.data);
             TabsStore.emitChange();
	           break;
        default:
             break;
		  }

	})

});
module.exports = TabsStore;
