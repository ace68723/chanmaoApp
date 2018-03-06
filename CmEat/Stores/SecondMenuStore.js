import AppConstants from '../Constants/AppConstants';
import { dispatch, register } from '../Dispatchers/AppDispatcher';
import { EventEmitter } from 'events';
import { find, filter, findIndex } from 'lodash';
const CHANGE_EVENT = 'change4422';

const SecondMenuStore = Object.assign({},EventEmitter.prototype,{
  state:{
    toppingGroupList: [],
    qty: 1,
    total: 0
  },
	emitChange(){
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
      this.state ={toppingGroupList: [], qty: 1, total: 0}
			this.removeListener(CHANGE_EVENT, callback)
	},
  getOptions({toppingGroupList, price, qty}){
    this.state.toppingGroupList = toppingGroupList;
    this.state.total = price;
    this.state.qty = qty;
  },
  updateOptions(data) {
    // if (flag === 'init') {
      sectionList.optionsList.map(tpgs => {
        const tpg_id = tpgs.tpg_id;
        const tpg_name = tpgs.tpg_name;
        const tpg_limit = tpgs.tpg_limit;
        const tps = tpgs.tps.map(tps => {
          const tp_id = tps.tp_id;
          const tp_name = tps.tp_name;
          const tp_price = tps.tp_price;
          const selected = false;
        });
      });
    // }
    this.state = data;
  },
  updateTopping({tpg_id,tp_id}){
    const tpg_max_limit = this.state.toppingGroupList[tpg_id].tpg_max_limit;
    const tpg_min_limit = this.state.toppingGroupList[tpg_id].tpg_min_limit;
    const tps = this.state.toppingGroupList[tpg_id].tps;
    if(tpg_max_limit === 1) {
      if (tpg_min_limit === 1) {
        if (this.state.toppingGroupList[tpg_id].tps[tp_id].quantity != 1) {
          let temp_tps = {};
          let origin_price = 0;
          for (let key in tps) {
            if (tps[key].quantity === 1) {
              origin_price = tps[key].tp_price;
            }
            if (tps[key].tp_id === parseInt(tp_id)) {
              temp_tps[key] = Object.assign({},tps[key], {quantity: 1});
            } else {
              temp_tps[key] = Object.assign({},tps[key], {quantity: 0});
            }
          }
          const _tps = Object.assign({},this.state.toppingGroupList[tpg_id].tps,temp_tps);
          const _tpg = Object.assign({},this.state.toppingGroupList[tpg_id],{tps:_tps});
          this.state.toppingGroupList = Object.assign({},this.state.toppingGroupList,{[tpg_id]:_tpg});
          this.state.total = parseFloat(this.state.total) - parseFloat(origin_price) + parseFloat(this.state.toppingGroupList[tpg_id].tps[tp_id].tp_price);
        }
      }
      else {
        let _tp;
        let _tps;
        let _tpg;
        let counter = 0;
        for (let key in tps) {
            if (tps[key].quantity) {
              counter += (1 * tps[key].quantity);
            }
        }
        if (this.state.toppingGroupList[tpg_id].tps[tp_id].quantity != 1 && counter === 0) {
          _tp = Object.assign({}, this.state.toppingGroupList[tpg_id].tps[tp_id], {quantity: 1});
          this.state.total = parseFloat(this.state.total) + parseFloat(this.state.toppingGroupList[tpg_id].tps[tp_id].tp_price);
          _tps = Object.assign({},this.state.toppingGroupList[tpg_id].tps,{[tp_id]:_tp});
          _tpg = Object.assign({},this.state.toppingGroupList[tpg_id],{tps:_tps});
          this.state.toppingGroupList = Object.assign({},this.state.toppingGroupList,{[tpg_id]:_tpg});
        }
        else if (this.state.toppingGroupList[tpg_id].tps[tp_id].quantity === 1) {
          _tp = Object.assign({}, this.state.toppingGroupList[tpg_id].tps[tp_id], {quantity: 0});
          this.state.total = parseFloat(this.state.total) - parseFloat(this.state.toppingGroupList[tpg_id].tps[tp_id].tp_price);
          _tps = Object.assign({},this.state.toppingGroupList[tpg_id].tps,{[tp_id]:_tp});
          _tpg = Object.assign({},this.state.toppingGroupList[tpg_id],{tps:_tps});
          this.state.toppingGroupList = Object.assign({},this.state.toppingGroupList,{[tpg_id]:_tpg});
        }
      }
    }
    else {
      let counter = 0;
      for (let key in tps) {
          if (tps[key].quantity) {
            counter += (1 * tps[key].quantity);
          }
      }
      if (counter < tpg_max_limit) {
        let _tp;
        let _tps;
        let _tpg;
        if (this.state.toppingGroupList[tpg_id].tps[tp_id].quantity) {
          _tp = Object.assign({}, this.state.toppingGroupList[tpg_id].tps[tp_id],
                                    {quantity: this.state.toppingGroupList[tpg_id].tps[tp_id].quantity + 1});
        }
        else {
          _tp = Object.assign({}, this.state.toppingGroupList[tpg_id].tps[tp_id], {quantity: 1});
        }
        _tps = Object.assign({},this.state.toppingGroupList[tpg_id].tps,{[tp_id]:_tp});
        _tpg = Object.assign({},this.state.toppingGroupList[tpg_id],{tps:_tps});
        this.state.toppingGroupList = Object.assign({},this.state.toppingGroupList,{[tpg_id]:_tpg});
        this.state.total = parseFloat(this.state.total) + parseFloat(this.state.toppingGroupList[tpg_id].tps[tp_id].tp_price);
      }
    }

  },
  decreaseToppingQuantity({tpg_id,tp_id}) {
    const tps = this.state.toppingGroupList[tpg_id].tps;
    const tpg_min_limit = this.state.toppingGroupList[tpg_id].tpg_min_limit;
    let counter = 0;
    for (let key in tps) {
        if (tps[key].quantity) {
          counter += (1 * tps[key].quantity);
        }
    }
    if (this.state.toppingGroupList[tpg_id].tps[tp_id].quantity > 0) {
        const _tp = Object.assign({},
                                  this.state.toppingGroupList[tpg_id].tps[tp_id],
                                  {quantity: this.state.toppingGroupList[tpg_id].tps[tp_id].quantity - 1});
        const _tps = Object.assign({},this.state.toppingGroupList[tpg_id].tps,{[tp_id]:_tp});
        const _tpg = Object.assign({},this.state.toppingGroupList[tpg_id],{tps:_tps});
        this.state.toppingGroupList = Object.assign({},this.state.toppingGroupList,{[tpg_id]:_tpg});
        this.state.total = parseFloat(this.state.total) - parseFloat(this.state.toppingGroupList[tpg_id].tps[tp_id].tp_price);
    }
  },
  updateProductQty(data) {
    if (this.state.qty > 1 || data.difference === 1) {
      this.state.qty = this.state.qty + data.difference;
    }
  },
  getState(){
    return this.state;
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
        case AppConstants.UPDATE_TOPPING:
          SecondMenuStore.updateTopping(action.data);
          SecondMenuStore.emitChange();
          break;
        case AppConstants.DECREASE_TOPPING_QUANTITY:
          SecondMenuStore.decreaseToppingQuantity(action.data);
          SecondMenuStore.emitChange();
          break;
        case AppConstants.UPDATE_PRODUCT_QTY:
          SecondMenuStore.updateProductQty(action.data);
          SecondMenuStore.emitChange();
          break;
        default:
          break;
		  }

	})

});
module.exports = SecondMenuStore;
