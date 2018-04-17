import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const ERRROR_TITLE = AppConstants.ERRROR_TITLE;
let state = {
          showReviewAdded: false,
        };
const CommentsStore = Object.assign({},EventEmitter.prototype,{
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
      this.resetShowReviewedAdd();
			this.removeListener(CHANGE_EVENT, callback);
	},
  reviewAdded(data) {
    if (data.ev_error == 0) {
      state.showReviewAdded = true;
    }
  },
  resetShowReviewedAdd() {
    state.showReviewAdded = false;
  },
  getState(){
    return state;
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
         case AppConstants.REVIEW_ADDED:
             CommentsStore.reviewAdded(action.data);
             CommentsStore.emitChange();
             break;
         default:
             break;
		  }

	})

});
module.exports = CommentsStore;
