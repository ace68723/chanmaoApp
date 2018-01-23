import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';




const SboxAddressStore = Object.assign({},EventEmitter.prototype,{
  state:{
    condoList:[],
    filter: "ALL",
    locationOptions: ['ALL', 'North York', 'Markham', 'Scarborough',
    'Richmond Hill', 'York'],
    selectedAddress:{},
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
  updateCondoListState(la_condoList){

      this.state.condoList = la_condoList;
  },
  updateSelectedAddress(selectedAddress){
    this.state = Object.assign({},this.state,{selectedAddress:selectedAddress});
    
  },
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case SboxConstants.GET_CONDO_LIST:
          SboxAddressStore.updateCondoListState(action.data.condoList);
          SboxAddressStore.emitChange();
					break;
        case SboxConstants.GET_CONDO_FUZZY:
          SboxAddressStore.updateCondoListState(action.data.condoList);
          SboxAddressStore.emitChange();
          break;
        case SboxConstants.UPDATE_SELECTED_ADDRESS:
          SboxAddressStore.updateSelectedAddress(action.data.selectedAddress);
          // SboxAddressStore.emitChange();
          break;
        default:
         // do nothing
		  }

	})

});
module.exports = SboxAddressStore;
