import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const SboxHomeStore = Object.assign({},EventEmitter.prototype,{
  state:{
    bannerList:[],
    themeList:[],
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
  updateThemeList(la_themeList){
    this.state.themeList = la_themeList;
  },
  updateHomedata(data) {
      //
      console.log('updateHomedata',data)
      this.state = Object.assign({}, this.state, data);
  },
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
        case SboxConstants.SEARCH_THEME_LIST:
          SboxHomeStore.updateThemeList(action.data.themeList)
          SboxHomeStore.emitChange()
          break;
        case SboxConstants.GET_HOME_DATA:
          SboxHomeStore.updateHomedata(action.data)
          SboxHomeStore.emitChange()
          break;
        default:
         // do nothing
		  }
	})
});
module.exports = SboxHomeStore;
