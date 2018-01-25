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
    textInput: '',
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
      this.state.condoList = [...this.state.condoList, ...la_condoList];
  },
  refreshCondoListState(la_condoList, textInput){
    // if (textInput == this.state.textInput) {
      this.state.condoList = la_condoList;
    // }
  },
  updateSelectedAddress(selectedAddress){
    this.state = Object.assign({},this.state,{selectedAddress:selectedAddress});
  },
  updateTextInput(textInput) {
    this.state = Object.assign({},this.state,{textInput:textInput});
  },
  getState(){
    return this.state;
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case SboxConstants.CHECK_CAN_DELIVER:
          SboxAddressStore.updateCondoListState(action.data.condoList);
          SboxAddressStore.emitChange();
					break;
        case SboxConstants.UPDATE_SELECTED_ADDRESS:
          SboxAddressStore.updateSelectedAddress(action.data.selectedAddress);
          SboxAddressStore.emitChange();
          break;
        case SboxConstants.UPDATE_TEXTINPUT:
          SboxAddressStore.updateTextInput(action.data.textInput);
          break;
        default:
         // do nothing
		  }

	})

});
module.exports = SboxAddressStore;
