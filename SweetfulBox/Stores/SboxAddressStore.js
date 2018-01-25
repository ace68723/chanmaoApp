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
    showAlert: 0,
  },
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
      // console.log(callback);
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
  checkWhetherInRange(data) {
    console.log(this.state);
    console.log(data.ev_can_deliver);
    this.state = Object.assign({},this.state,{showAlert: data.ev_can_deliver});
  },
  getState(){
    return this.state;
  },
  getAlertState() {
    return this.state.showAlert;
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case SboxConstants.CHECK_CAN_DELIVER:
          console.log("In store,", action.data);
          SboxAddressStore.checkWhetherInRange(action.data);
          console.log("In store after check, ", this.state.showAlert);
          SboxAddressStore.emitChange();
					break;
        case SboxConstants.UPDATE_SELECTED_ADDRESS:
          SboxAddressStore.updateSelectedAddress(action.data.selectedAddress);
          SboxAddressStore.emitChange();
          break;
        case SboxConstants.UPDATE_TEXTINPUT:
          SboxAddressStore.updateTextInput(action.data.textInput);
          break;
        case SboxConstants.NOT_IN_RANGE:
          break;
        default:
         // do nothing
		  }

	})

});
module.exports = SboxAddressStore;
