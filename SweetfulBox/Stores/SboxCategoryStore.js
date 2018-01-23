import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';

const SboxCategoryStore = Object.assign({},EventEmitter.prototype,{
  state:{
    searchRecordList:[],
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
  updateState({ea_searchKeyword}) {
    const searchRecordList = ea_searchKeyword;
    this.state = Object.assign({}, this.state, {searchRecordList});
  },
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case SboxConstants.ADD_SEARCH_KEYWORD:
          SboxCategoryStore.emitChange();
					break;
        case SboxConstants.INIT_SEARCH_KEYWORD:
          SboxCategoryStore.emitChange();
					break;
        case SboxConstants.GET_SEARCH_KEYWORD:
          SboxCategoryStore.updateState(action.data);
          SboxCategoryStore.emitChange();
  				break;
        default:
         // do nothing
		  }

	})

});
module.exports = SboxCategoryStore;
