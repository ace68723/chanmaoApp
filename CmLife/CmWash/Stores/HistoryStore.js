import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';


const HistoryStore = Object.assign({},EventEmitter.prototype,{
  state:{
    ea_store_info:[],
    ea_orders:[],
  },
  initState(){
    this.state = {
      ea_store_info:[],
      ea_orders:[],
    };
  },



	emitChange(){
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
      this.initState();
	},

  getState(){
    return this.state
  },

  updateHistory(data){
    // console.log(data);
    this.state = Object.assign({},this.state,data);

  },

	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.HISTORY_LIST:
								HistoryStore.updateHistory(action.data);
								HistoryStore.emitChange();
                break;
        default:
                break;

		  }

	})

});
module.exports = HistoryStore;
