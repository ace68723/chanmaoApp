import AppConstants from '../../Constants/AppConstants';
import {dispatch, register} from '../../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const SecondMenuStore = Object.assign({},EventEmitter.prototype,{
  state:{
    optionsList: [],
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
  getState(){
    return this.state;
  },
  updataData(data) {
    this.state = data;
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
        case AppConstants.GET_SECOND_MENU_DATA:
          SecondMenuStore.updataData(action.data);
          SecondMenuStore.emitChange();
          break;
        case AppConstants.UPDATE_SECTION_LIST:
          SecondMenuStore.updataData(action.data);
          SecondMenuStore.emitChange();
          break;
        default:
          break;
         // do nothing
		  }

	})

});
module.exports = SecondMenuStore;
