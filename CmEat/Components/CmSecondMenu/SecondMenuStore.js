import AppConstants from '../../Constants/AppConstants';
import { dispatch, register } from '../../Dispatchers/AppDispatcher';
import { EventEmitter } from 'events';
import { find, filter, findIndex } from 'lodash';
const CHANGE_EVENT = 'change4422';

const SecondMenuStore = Object.assign({},EventEmitter.prototype,{
  state:{
    toppingGroupList: [
        {
            "tpg_id": 2,
            "tpg_name": "冰量",
            "tpg_limit": 3,
            "tps": [
                {
                    "tp_id": 4,
                    "tp_name": "少冰",
                    "tp_price": "0.00"
                },
                {
                    "tp_id": 5,
                    "tp_name": "多冰",
                    "tp_price": "0.00",
                },
                {
                    "tp_id": 6,
                    "tp_name": "不要冰",
                    "tp_price": "0.00"
                },
                {
                    "tp_id": 15,
                    "tp_name": "给老子加到满",
                    "tp_price": "1.00"
                }
            ]
        },
        {
            "tpg_id": 17,
            "tpg_name": "Size",
            "tpg_limit": 1,
            "tps": [
                {
                    "tp_id": 34,
                    "tp_name": "大杯",
                    "tp_price": "2.00"
                },
                {
                    "tp_id": 35,
                    "tp_name": "中杯",
                    "tp_price": "1.00"
                }
            ]
        }
    ],
  },
	emitChange(){
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
      this.state ={optionsList: [],}
			this.removeListener(CHANGE_EVENT, callback)
	},
  getOptions({toppingGroupList}){
    console.log(toppingGroupList);
    this.state.toppingGroupList = toppingGroupList;
    console.log(this.state)
    // console.log(this.state.toppingGroupList);
    // this.state = Object.assign({},this.state,{toppingGroupList:toppingGroupList});
    // console.log(this.state.toppingGroupList);
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
  updateTopping({topping,tpg_id}){

    let _toppingGroup = find(this.state.toppingGroupList,{tpg_id});
    console.log(1,_toppingGroup)
    const { tpg_limit } =_toppingGroup
    if(tpg_limit === 1) {
      console.log(2,find(this.state.toppingGroupList,{tpg_id}).tps)
      const toppingGroup = find(this.state.toppingGroupList,{tpg_id}).tps.map(_topping => {
        console.log(3,_topping)
          if(_topping.tp_id === topping.tp_id){
            return {..._topping,selected:true};
          } else {
            return {..._topping,selected:false};
          }
      })
      console.log(4,findIndex(this.state.toppingGroupList,{tpg_id}))
      const index = findIndex(this.state.toppingGroupList,{tpg_id})
      console.log(5,index,this.state.toppingGroupList[index].tps )
      this.state.toppingGroupList = [];
      console.log(6,this.state.toppingGroupList[index].tps)
      console.log(7,this.state)
    } else {

      const counter = filter(_toppingGroup.tps, 'selected').length;
      let toppingGroup;
      if (counter < tpg_limit ) {
         toppingGroup = find(this.state.toppingGroupList,{tpg_id}).tps.map(_topping => {
          if(_topping.tp_id === topping.tp_id){
            return {..._topping,selected:!_topping.selected};
          }else {
            return _topping;
          }
        });
        const index = findIndex(this.state.toppingGroupList,{tpg_id});
        this.state.toppingGroupList[index].tps= toppingGroup;
      } else if (find(find(this.state.toppingGroupList,{tpg_id}).tps, {tp_id:topping.tp_id}).selected) {
         toppingGroup = find(this.state.toppingGroupList,{tpg_id}).tps.map(_topping => {
          if(_topping.tp_id === topping.tp_id){
            return {..._topping,selected:false};
          }else {
            return _topping;
          }
        });
        const index = findIndex(this.state.toppingGroupList,{tpg_id})
        this.state.toppingGroupList[index].tps = toppingGroup;
      }
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
        default:
          break;
		  }

	})

});
module.exports = SecondMenuStore;
