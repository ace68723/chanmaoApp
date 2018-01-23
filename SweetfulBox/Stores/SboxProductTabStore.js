import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';
import {findIndex} from 'lodash';
const SboxProductTabStore = Object.assign({},EventEmitter.prototype,{
  state:{
    theme_list: [],
    prod_list:[],
  },
	emitChange() {
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback) {
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback) {
			this.removeListener(CHANGE_EVENT, callback)
	},
  getStateFormProps(prod_list,tmid) {
    const lv_tmid = tmid
    const targeIndex =  findIndex(this.state.theme_list, function(o) {
      return o.tmid === lv_tmid;
    });
    if (targeIndex === -1) {
      //new prod_list
      this.state.theme_list = [...this.state.theme_list,
                                  {
                                    tmid:lv_tmid,
                                    prod_list:prod_list,
                                  }
                              ]
    }
  },
  //更新state, 将新提取的数据和旧的合并在一起
  updateState(data) {
    const targeIndex =  findIndex(this.state.theme_list, function(o) {
      return o.tmid === data.tmid;
    });
    if (targeIndex === -1) {
      //new prod_list
      const newProdList = {
                            tmid:lv_tmid,
                            prod_list:data.prod_list,
                          }
      this.state.theme_list = [...this.state.theme_list, newProdList]
    } else {
      let themeProdList = this.state.theme_list[targeIndex].prod_list;
      themeProdList = [...themeProdList,...data.prod_list];
      this.state.theme_list[targeIndex].prod_list = themeProdList;
    }
  },
  getState(){
    return this.state;
  },
  getStateByTmid(tmid) {
    const targeIndex =  findIndex(this.state.theme_list, function(o) {
      return o.tmid === tmid;
    });
    if (targeIndex === -1 ) {
      return {prod_list: [], tmid: 1};
    }
    return this.state.theme_list[targeIndex];
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case SboxConstants.GET_PRODUCT_LIST:
          SboxProductTabStore.updateState(action.data);
          SboxProductTabStore.emitChange();
					break;
        default:
         // do nothing
		  }

	})

});
module.exports = SboxProductTabStore;
