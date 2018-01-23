import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';

const SboxHistoryStore = Object.assign({},EventEmitter.prototype,{
  state:{
    items: []
  },
	emitChange() {
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback) {
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback) {
			this.removeListener(CHANGE_EVENT, callback)
	},
  updateState(data) {
    this.state = Object.assign({}, this.state, {items: data, refreshing: false});
  },
  getState(){
    return this.state;
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case SboxConstants.GET_HISTORY_LIST:
          SboxHistoryStore.updateState(action.data);
          SboxHistoryStore.emitChange();
					break;
        default:
         // do nothing
		  }

	})

});
module.exports = SboxHistoryStore;
