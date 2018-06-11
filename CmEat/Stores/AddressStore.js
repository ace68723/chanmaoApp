import AppConstants from '../Constants/AppConstants';
import CheckoutAction from '../Actions/CheckoutAction';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

import {realm, cme_getAllAddress, cme_getSelectedAddress} from '../../App/Modules/Database';

let addressList = []
let addressListState = Object.assign({}, {
  addressList: [],
  predictionsData: [],
  placeId: "",
  showAddInfo: false,
  addressType: "",
  formattedAddress: "",
  searchAddress: "",
  showConfirmBtn: true
}, {
  addressList
},)

const AddressStore = Object.assign({}, EventEmitter.prototype, {
  state: {
    addressList: [],
    predictionsData: [],
    placeId: "",
    showAddInfo: false,
    addressType: "",
    formattedAddress: "",
    searchAddress: "",
    addressStatus: "",
    showConfirmBtn: true,
    selectedUaid: null,
    currentLocation: "",
    shouldDismissAddressPromptView: false,
    edittingAddress: null
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
  submitAddress(selectedUaid) {
    this.state.selectedUaid = selectedUaid;
    this.state.addressStatus = "backToAddressList";
    this.resetCurrentEdittingAddress();
  },
  showAddInfo(placeId) {
    addressListState.placeId = placeId;
    addressListState.showAddInfo = true;
  },
  saveAddress(ia_address) {
    addressListState.addressList = ia_address;
  },
  updateAddresslist() {
    this.state.addressList = cme_getAllAddress();
    this.state.selectedAddress = cme_getSelectedAddress();
  },
  updateSelectedUaid(data) {
    this.state.selectedUaid = data.uaid;
  },
  updateAddressStatus(data) {
    this.state.addressStatus = data.status;
  },
  updateCurrentLocation(data) {
    this.state.currentLocation = data.currentLocation;
  },
  clearAddressInput() {
    this.state.searchAddress = '';
    this.resetCurrentEdittingAddress();
  },
  formatAddress(io_addrInfo) {
    this.state.formattedAddress = io_addrInfo;
    this.state.addressStatus = "AddAddressInfo";
  },
  dismissAddressPromptView() {
    this.state.shouldDismissAddressPromptView = true;
  },
  setCurrentEdittingAddress(address) {
    this.state.edittingAddress = address;
  },
  resetCurrentEdittingAddress() {
    this.state.edittingAddress = null;
  },
  getFormatAddress() {
    return lo_addrInfo;
  },
  getSeletedAddress() {
    return cme_getSelectedAddress();
  },
  getState() {
    this.state.addressList = cme_getAllAddress();
    this.state.selectedAddress = cme_getSelectedAddress();
    if (!this.state.selectedUaid) {
      this.state.selectedUaid = cme_getSelectedAddress().uaid;
    }
    return this.state;
  },

  dispatcherIndex: register(function(action) {
    switch (action.actionType) {
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
      case AppConstants.UPDATA_SELECTED_UAID:
        AddressStore.updateSelectedUaid(action.data)
        AddressStore.emitChange()
        break;
      case AppConstants.UPDATA_ADDRESS_STATUS:
        AddressStore.updateAddressStatus(action.data);
        AddressStore.emitChange()
        break;
      case AppConstants.UPDATA_CURRENT_LOCATION:
        AddressStore.updateCurrentLocation(action.data);
        AddressStore.emitChange()
        break;
      case AppConstants.CLEAR_ADDRESS_INPUT:
        AddressStore.clearAddressInput();
        AddressStore.emitChange()
        break;
      case AppConstants.DISMISS_ADDRESS_PROMPT:
        AddressStore.dismissAddressPromptView()
        AddressStore.emitChange()
        break;
      case AppConstants.SET_EDITTING_ADDRESS:
        AddressStore.setCurrentEdittingAddress(action.data);
        AddressStore.emitChange()
        break;
      case AppConstants.RESET_EDITTING_ADDRESS:
        AddressStore.resetCurrentEdittingAddress();
        AddressStore.emitChange()
        break;
      default:
        // do nothing
    }

  })

});
module.exports = AddressStore;
