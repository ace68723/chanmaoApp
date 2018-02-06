import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';
const SboxOrderStore = Object.assign({},EventEmitter.prototype,{
  state:{
    cusid:"",
    last4:"",
    cardBrand:"",
    oos:"",
    prod:[],
    addr:{},
    checkoutStatus:"",
  },
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
  initState(){
    this.state = {  cusid:"",
                    last4:"",
                    oos:"",
                    prod:[],
                    addr:{},
                    shouldDoAuth:false,
                    shouldAddCard:false,
                    shouldAddAddress:false,
                    checkoutSuccessful:false,
                    showCheckoutLoading:false,
                    soldOut:false,}
  },
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
      this.initState();
			this.removeListener(CHANGE_EVENT, callback)
	},
  updateCheckoutState({data}){
    if(data.checkoutStatus === "readyToCheckout"){
      this.state = Object.assign({},this.state,{showCheckoutLoading:false});
    }

    this.state = Object.assign({},this.state,data);
  },
  updateCard({data}){
    this.state.cusid = data[0].card_id;
    this.state.cardBrand = data[0].brand;
    this.state.last4 = data[0].last4;
    this.state.checkoutStatus = "addedCard";
  },

  checkoutSuccessful(){
    this.state = {
      cusid:"",
      last4:"",
      oos:"",
      prod:[],
      addr:{},
      shouldAddCard:false,
      shouldAddAddress:false,
      checkoutSuccessful:true,
      showCheckoutLoading:false,
      productList:[],
      box:{},
    }
    setTimeout(() => {
      this.state = {
        cusid:"",
        last4:"",
        oos:"",
        prod:[],
        addr:{},
        shouldAddCard:false,
        shouldAddAddress:false,
        checkoutSuccessful:false,
      }
    }, 1000);
  },
  checkoutFail(){
    this.state.checkoutSuccessful = false;
    this.state.showCheckoutLoading = false;
  },

  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
     case SboxConstants.SBOX_CHECKOUT:
       SboxOrderStore.updateCheckoutState(action);
       SboxOrderStore.emitChange();
       break;
      case SboxConstants.SBOX_UPDATECARD:
        SboxOrderStore.updateCard(action);
        SboxOrderStore.emitChange();
        break;




        case SboxConstants.CHECKOUT_FAIL:
          SboxOrderStore.checkoutFail();
          SboxOrderStore.emitChange();
					break;
        case SboxConstants.CHECKOUT_FAIL:
          SboxOrderStore.shouldDoAuth();
          SboxOrderStore.emitChange();
          break;
        default:
         // do nothing
		  }

	})

});
module.exports = SboxOrderStore;
