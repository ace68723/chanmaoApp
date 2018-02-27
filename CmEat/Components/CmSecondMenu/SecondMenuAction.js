import AppConstants from '../../Constants/AppConstants';
import {dispatch, register} from '../../Dispatchers/AppDispatcher';
// import UserModule from '../../Modules/UserModule/UserModule'
export default {
      async getSectionList(){
        try{

          // const data = await UserModule.getOrderHistory(io_data);
          var lo_data = {
                      "ds_id": 68998,
                      "int_no": "123",
                      "rid": 5,
                      "dt_id": 2,
                      "ds_name": "原味奶茶",
                      "ds_desc": "",
                      "price": "998.99",
                      "tpgs": [
                          {
                              "tpg_id": 2,
                              "tpg_name": "冰量",
                              "tpg_limit": 1,
                              "tps": [
                                  {
                                      "tp_id": 4,
                                      "tp_name": "少冰",
                                      "tp_price": "0.00"
                                  },
                                  {
                                      "tp_id": 5,
                                      "tp_name": "多冰",
                                      "tp_price": "0.00"
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
                              "tpg_name": "size",
                              "tpg_limit": 1,
                              "tps": [
                                  {
                                      "tp_id": 34,
                                      "tp_name": "大",
                                      "tp_price": "2.00"
                                  },
                                  {
                                      "tp_id": 34,
                                      "tp_name": "中",
                                      "tp_price": "1.00"
                                  },
                                  {
                                      "tp_id": 34,
                                      "tp_name": "小",
                                      "tp_price": "0.00"
                                  }
                              ]
                          }
                      ]
                  };
          // var data = {
          //     optionsList: [{title: "尺寸[必选]", limit: 1, options: [{name: "小杯", selected: true}, {name: "中杯 + $0.50", selected: false}, {name: "大杯 + $1.00", selected: false}]},
          //                   {title: "加料[多选]", limit: 4, options: [{name: "仙草 + $0.50", selected: true},
          //                                                           {name: "珍珠 + $0.50", selected: true},
          //                                                           {name: "椰果 + $0.50", selected: false},
          //                                                           {name: "红豆 + $0.50", selected: false},
          //                                                           {name: "奶泡 + $0.50", selected: true},
          //                                                           {name: "中杯 + $0.50", selected: true}]},
          //                   {title: "甜度[必选]", limit: 1, options: [{name: "0%"}, {name: "30%"}, {name: "50%"}, {name: "100%"}]},
          //                   {title: "冷热[必选]", limit: 1, options: [{name: "无冰"}, {name: "少冰"}, {name: "正常冰"}, {name: "热饮"}]},
          //                   {title: "冷热[必选]", limit: 1, options: [{name: "无冰"}, {name: "少冰"}, {name: "正常冰"}, {name: "热饮"}]},
          //                   {title: "冷热[必选]", limit: 1, options: [{name: "无冰"}, {name: "少冰"}, {name: "正常冰"}, {name: "热饮"}]},
          //                   {title: "冷热[必选]", limit: 1, options: [{name: "无冰"}, {name: "少冰"}, {name: "正常冰"}, {name: "热饮"}]}],
          // }
          lo_data.tpgs.map(tpgs => {
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
          console.log(lo_data.tpgs);
          var data = {
            optionsList: lo_data.tpgs
          }
          // var index = 0;
          // for (let item of data) {
          //   for (let option of item.options) {
          //     option.key = index;
          //     index++;
          //   }
          // }
          dispatch({
              actionType: AppConstants.GET_SECOND_MENU_DATA, data
          })
        }catch(error){

        }
      },
      updateTopping({topping,tpg_id}) {
        try{
          const data = {topping,tpg_id};
          dispatch({
              actionType: AppConstants.UPDATE_TOPPING, data
          })
        }catch(error){

        }
      }
}
