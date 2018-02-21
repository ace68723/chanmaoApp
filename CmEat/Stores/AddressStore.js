import AppConstants from '../Constants/AppConstants';
import CheckoutAction from '../Actions/CheckoutAction';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

import { realm, cme_getAllAddress, cme_getSelectedAddress } from '../../App/Modules/Database';

let addressList = []
let addressListState = Object.assign({},
	{ addressList:[],
	  predictionsData:[],
		placeId:"",
		showAddInfo:false,
		addressType:"",
		formattedAddress:"",
		searchAddress:"",
    showConfirmBtn:true,
	},{addressList},
)

const AddressStore = Object.assign({},EventEmitter.prototype,{
  state:{
    addressList:[],
	  predictionsData:[],
		placeId:"",
		showAddInfo:false,
		addressType:"",
		formattedAddress:"",
		searchAddress:"",
    addressStatus:"",
    showConfirmBtn:true,
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
  submitAddress(selectedUaid){
    this.state.selectedUaid = selectedUaid;
    this.state.addressStatus = "backToAddressList";
  },
	showAddInfo(placeId){
		addressListState.placeId = placeId;
		addressListState.showAddInfo = true;
	},
  saveAddress(ia_address){
		addressListState.addressList = ia_address;
  },
	updateAddresslist(){
    this.state.addressList = cme_getAllAddress();
    this.state.selectedAddress = cme_getSelectedAddress();
	},
	formatAddress(io_addrInfo){
    this.state.formattedAddress = io_addrInfo;
    this.state.addressStatus = "AddAddressInfo";
	},
	getFormatAddress(){
		return lo_addrInfo;
	},
  getSeletedAddress(){
    return cme_getSelectedAddress();
  },
	getState(){
    this.state.addressList = cme_getAllAddress();
    this.state.selectedAddress = cme_getSelectedAddress();
		return this.state;
	},

	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.PREDICTIONS_SUCCESS:
					   AddressStore.getPredictionsSuccess(action.autocompleteData)
             AddressStore.emitChange()
					break;
        case AppConstants.GET_ADDRESSES:
             AddressStore.saveAddress(action.addressList)
             AddressStore.emitChange()
          break;
				case AppConstants.FORMAT_ADDRESS:
             AddressStore.formatAddress(action.addrInfo)
             AddressStore.emitChange()
          break;
				case AppConstants.SUBMIT_ADDRESS:
             AddressStore.submitAddress(action.selectedUaid)
             AddressStore.emitChange()
          break;
				case AppConstants.UPDATA_ADDRESSLIST:
						 AddressStore.emitChange()
					break;
        default:
         // do nothing
		  }

	})

});
module.exports = AddressStore;
