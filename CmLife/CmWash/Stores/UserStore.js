import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';

const UserStore = Object.assign({},EventEmitter.prototype,{
  state:{
    eo_user:{},
  },
	emitChange(){
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
  updateUserInfo(data)
  {
      this.state = Object.assign(this.state,{data});
  },
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){

        case AppConstants.PUT_USER_ADDR:
          UserStore.emitChange()
          updateUserInfo(data);
  				break;

        default:
         // do nothing
		  }

	})

});
module.exports = UserStore;
