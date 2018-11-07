import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';


const CheckoutStore = Object.assign({},EventEmitter.prototype,{
  state:{
    ea_store_info:[],
    ea_products:[],
    ev_delifee:'',
    ev_pretax:'',
    ev_tax:'',
    ev_total:'',
    eo_user_info:{},
    ev_can_deliver:-1,
    ea_pickup_time:[],
    ev_wash_time:-1,
    eo_last4:{},
    delivery_time:[],
    selectedPickUpDate:'',
    selectedPickUpTime:'',
    selectedDeliveryDate:'',
    selectedDeliveryTime:'',
    comment:'',
  },
  initState(){
    this.state = {
      ea_store_info:[],
      ea_products:[],
      ev_delifee:'0',
      ev_pretax:'0',
      ev_tax:'0',
      ev_total:'0',
      eo_user_info:{},
      ev_can_deliver:-1,
      ea_pickup_time:[],
      ev_wash_time:-1,
      eo_last4:{},
      delivery_time:[],
      selectedPickUpDate:'',
      selectedPickUpTime:'',
      selectedDeliveryDate:'',
      selectedDeliveryTime:'',
      comment:'',
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

  updateCheckout(data){
    console.log(data);
    this.state = Object.assign({},this.state,data);

  },
  updateDeliveryTime(data){
    // console.log(data);
    this.state = Object.assign({},this.state,data);
    console.log(this.state);
  },
  updateCard(data)
  {
    this.state = Object.assign({},this.state,data);
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.CHECKOUT_INFORMATION:
                console.log(action.data);
								CheckoutStore.updateCheckout(action.data);
								CheckoutStore.emitChange();
                break;
        case AppConstants.CARD_NUMBER:
                console.log(action.data);
        				CheckoutStore.updateCard(action.data);
        				CheckoutStore.emitChange();
                break;
        case AppConstants.DELIVERY_TIME:
                console.log(action.data);
                CheckoutStore.updateDeliveryTime(action.data);
                CheckoutStore.emitChange();
                break;
        case AppConstants.SELECTED_DELIVERY_TIME:
                console.log(action.data);
                CheckoutStore.updateDeliveryTime(action.io_data);
                CheckoutStore.emitChange();
                break;
        case AppConstants.PLACE_INFO:
                console.log(action.data);
                CheckoutStore.updateDeliveryTime(action.data);
                CheckoutStore.emitChange();
                break;
        default:
                break;

		  }

	})

});
module.exports = CheckoutStore;
