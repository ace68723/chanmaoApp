import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

import { SBOX_REALM_PATH } from '../Config/API';
const Realm               = require('realm');
let realm = new Realm({ path: SBOX_REALM_PATH });


const SboxCartStore = Object.assign({},EventEmitter.prototype,{
  state:{
    totalQuantity:0,
    cartList:[],
  },
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
      this.updateTotalQuantity();
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
  addQuantity(){

  },
  subQuantity(){

  },
  updateTotalQuantity(){
    this._cart = realm.objects('sbox_cart');
    let totalQuantity = 0;
    this._cart.forEach((item) => {
      totalQuantity += item.sku_quantity
    });
    this.state.totalQuantity = totalQuantity;
    this.state.cartList = this._cart;
    SboxCartStore.emitChange();
  },
  getTotalQuantity(){
    return this.state.totalQuantity
  },
  initState(){
    this.state = Object.assign({},{

    });
  },
  getState(){
    return this.state;
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
        case SboxConstants.UPDATE_CART_ITEM_QUANTITY:
             SboxCartStore.updateTotalQuantity();
        break

        default:
         // do nothing
		  }

	})

});
module.exports = SboxCartStore;
