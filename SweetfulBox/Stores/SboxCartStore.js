import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';

import Label from '../../App/Constants/AppLabel';

const CHANGE_EVENT = 'change4422';

import { SBOX_REALM_PATH } from '../Config/API';
const Realm               = require('realm');
let realm = new Realm({ path: SBOX_REALM_PATH });


const SboxCartStore = Object.assign({},EventEmitter.prototype,{
  state:{
    totalQuantity:0,
    canCheckout:true,
    checkoutFont: '去结账',
    cartList:[],
    total:0,
    totalQuantity:0,
    outOfStock: false,
  },
	emitChange(){
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback){
      this.on(CHANGE_EVENT, callback)
      this.updateTotalQuantity();
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
  checkStock(data) {
    // console.log(data)
  },
  updateTotalQuantity(){
    this._cart = realm.objects('sbox_cart');
    let totalQuantity = 0;
    let _total = 0;
    this._cart.forEach((item) => {
      totalQuantity += item.sku_quantity;
      _total += item.sku_price * item.sku_quantity;
    });
    this.state.totalQuantity = totalQuantity;
    this.state.total = _total;
    this.state.cartList = this._cart;
    SboxCartStore.emitChange();
  },
  updateOutOfStock() {
    this.state =  Object.assign({},this.state,{outOfStock: true});
    setTimeout( () => {
      this.state =  Object.assign(this.state,{outOfStock: false});
    }, 500);
  },
  getTotalQuantity(){
    return this.state.totalQuantity
  },
  getState(){
    return this.state;
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
        case SboxConstants.UPDATE_CART_ITEM_QUANTITY:
             SboxCartStore.updateTotalQuantity();
             break
        case SboxConstants.SET_OUT_OF_STOCK:
             SboxCartStore.updateOutOfStock();
             SboxCartStore.emitChange();
             break;
        case SboxConstants.CHECK_STOCK:
             SboxCartStore.checkStock(action.data);
             break

        default:
         // do nothing
		  }

	})

});
module.exports = SboxCartStore;
