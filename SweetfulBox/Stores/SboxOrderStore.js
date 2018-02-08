import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';
import SboxCartStore from './SboxCartStore';
const SboxOrderStore = Object.assign({},EventEmitter.prototype,{
  state:{
    cartList:[],
    cusid:"",
    last4:"",
    cardBrand:"",
    oos:"",
    prod:[],
    addr:{},
    checkoutStatus:"firstLoading",
  },
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
  initState(){
    this.state = {
      cartList:[],
      cusid:"",
      last4:"",
      cardBrand:"",
      oos:"",
      prod:[],
      addr:{},
      checkoutStatus:"firstLoading",
    }
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
      this.state = Object.assign({},this.state);
    }

    this.state = Object.assign({},this.state,data);
  },
  getState(){
    this.state.cartList = SboxCartStore.getState().cartList;
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
     case SboxConstants.SBOX_CHECKOUT:
       SboxOrderStore.updateCheckoutState(action);
       SboxOrderStore.emitChange();
       break;
		  }

	})

});
module.exports = SboxOrderStore;
