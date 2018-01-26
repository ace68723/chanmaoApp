import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const SboxUserStore = Object.assign({},EventEmitter.prototype,{
  state:{
    orderHistory:[]
  },
	emitChange(){
			this.emit( CHANGE_EVENT)
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
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case SboxConstants.GET_ORDER_HISTORY:
          SboxUserStore.updateOrderHistoryState(action.data.orderHistory)
          SboxUserStore.emitChange()
					break;

        case SboxConstants.PUT_USER_ADDR:

          SboxUserStore.emitChange()
  				break;

        default:
         // do nothing
		  }

	})

});
module.exports = SboxUserStore;
