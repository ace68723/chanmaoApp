import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const SboxOrderStore = Object.assign({},EventEmitter.prototype,{
  state:{
    cusid:"",
    last4:"",
    oos:"",
    prod:[],
    addr:[],
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
  updateOrderBeforeListState(lo_data){
    this.state.cusid = lo_data.cusid;
    this.state.last4 = lo_data.last4;
    this.state.oos = lo_data.oos;
    this.state.prod = lo_data.prod;
    this.state.addr = lo_data.addr;
  },
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case SboxConstants.GET_ORDER_BEFORE:
          SboxOrderStore.updateOrderBeforeListState(action.data)
          SboxOrderStore.emitChange()
					break;

        default:
         // do nothing
		  }

	})

});
module.exports = SboxOrderStore;
