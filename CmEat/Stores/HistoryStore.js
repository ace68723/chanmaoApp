import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const ERRROR_TITLE = AppConstants.ERRROR_TITLE;
let state = {
          historylist:[],
          orderData:[],
          current:null,
          unavailable:[],
          isRefreshing:false,
          showReviewAdded: false,
          cusid: '',
          last4: '',
          brand: '',
          fees: {},
          showPriceDetail: false,
          oid: 0,
          payment_channel: 0,
          doRepay: false
        };
let HistoryDetailData;
const HistoryStore = Object.assign({},EventEmitter.prototype,{
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
	autoRefresh(){
		// setInterval(()=>{
		// 	state = Object.assign({},state,{doRefresh:true})
		// 	HistoryStore.emitChange();
		// },30000)
	},
	getHistorySuccess(data){
		data.isRefreshing = false;
		state = Object.assign({},state,data,{doRefresh:false})
	},
  getOrders(orderData){
    state = Object.assign({},state,{orderData},{doRefresh:false})
  },
  getState(){
    return state
  },
	saveHistoryDetail(data){
		HistoryDetailData = Object.assign({},data);
	},
	getHistoryDetail(){
		return HistoryDetailData
		HistoryDetailData = {};
	},
	verifyPhone(data){
		if(data.result === 0){
				state.verifyPhoneResult = 'SUCCESS';
		}else{
			  state.verifyPhoneResult = 'FAIL';
		}
	},
  reviewAdded(data) {
    if (data.ev_error == 0) {
      state.showReviewAdded = true;
    }
  },
  resetShowReviewedAdd() {
    state.showReviewAdded = false;
  },
  initVerifyPhoneResult(){
      state.verifyPhoneResult = '';
  },
  updateLast4(data) {
    state.cusid = data.cusid;
    state.last4 = data.last4;
    state.brand = data.brand;
  },
  getLast4(){
    return {
      cusid: state.cusid,
      last4: state.last4,
      brand: state.brand,
    }
  },
  showPriceDetailForRepay(data) {
    state.oid = data.oid;
    state.payment_channel = data.payment_channel;
    state.fees = data.fees;
    state.showPriceDetail = true;
    state.doRepay = false;
    state.goToHistory = false;
  },
  changeOrderCase(data) {
    state.oid = data.oid;
    state.payment_channel = data.payment_channel;
    state.fees = data.fees;
    state.showPriceDetail = false;
    state.doRepay = true;
    state.doRefresh = false;
    state.goToHistory = data.goToHistory;
  },
	doRefresh(){
		state = Object.assign({},state,{doRefresh:true})
	},
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
         case AppConstants.GET_ORDERS:
              HistoryStore.getOrders(action.orderData)
              HistoryStore.emitChange()
              break;
				 case AppConstants.VERIFY_PHONE:
					    HistoryStore.verifyPhone(action.data)
						 	HistoryStore.emitChange()
		          break;
				 case AppConstants.GET_HISTORY_DETAIL:
						 HistoryStore.saveHistoryDetail(action.data)
						 HistoryStore.emitChange()
		         break;
				 // case AppConstants.CHECKOUT:
							// HistoryStore.doRefresh()
							// HistoryStore.emitChange()
			   // break;
         case AppConstants.GET_HISTORY_SUCCESS:
             HistoryStore.getHistorySuccess(action.data)
             HistoryStore.emitChange()
             break;
         case AppConstants.GET_LAST4:
             HistoryStore.updateLast4(action.data);
             break;
         case AppConstants.SHOW_PRICE_DETAIL_FOR_REPAY:
             HistoryStore.showPriceDetailForRepay(action.data);
             HistoryStore.emitChange();
             break;
         case AppConstants.CHANGE_ORDER_CASE:
             HistoryStore.changeOrderCase(action.data);
             HistoryStore.emitChange();
             break;
         default:
             break;
		  }

	})

});
module.exports = HistoryStore;
