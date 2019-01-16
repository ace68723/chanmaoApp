import Constants from '../Constants/Constants';
import {dispatch, register} from '../Dispatchers/Dispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';




const AddressStore = Object.assign({},EventEmitter.prototype,{
  state:{
    selectedAddress: {},
    textInput: '',
    showAlert: 1,
  },
	emitChange(){
      this.emit(CHANGE_EVENT)
      // console.log(CHANGE_EVENT)
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
  checkWhetherInRange(data) {
    // console.log(this.state);
    this.state.showAlert = data.geolocation.ev_can_deliver;
    this.state.selectedAddress = data.addrInfo;
    // console.log(data.addrInfo);
  },
  getState(){
    return this.state;
  },
  getAlertState() {
    return this.state.showAlert;
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case Constants.CHECK_CAN_DELIVER:

          AddressStore.checkWhetherInRange(action.io_data);
          AddressStore.emitChange();
					break;
        case Constants.UPDATE_SELECTED_ADDRESS:
          AddressStore.updateSelectedAddress(action.data.selectedAddress);
          AddressStore.emitChange();
          break;
        case Constants.UPDATE_TEXTINPUT:
          AddressStore.updateTextInput(action.data.textInput);
          break;
        case Constants.NOT_IN_RANGE:
          break;
        default:
         // do nothing
		  }

	})

});
module.exports = AddressStore;
