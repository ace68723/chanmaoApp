import SboxConstants from '../../Constants/SboxConstants';
import {dispatch, register} from '../../Dispatchers/SboxDispatcher';
// import UserModule from '../../Modules/UserModule/UserModule'
export default {
      async getSectionList(){
        try{

          // const data = await UserModule.getOrderHistory(io_data);
          var data = {
              optionsList: [{title: "尺寸[必选]", limit: 1, options: [{name: "小杯", selected: true}, {name: "中杯 + $0.50", selected: false}, {name: "大杯 + $1.00", selected: false}]},
                            {title: "加料[多选]", limit: 4, options: [{name: "仙草 + $0.50", selected: true},
                                                                    {name: "珍珠 + $0.50", selected: true},
                                                                    {name: "椰果 + $0.50", selected: false},
                                                                    {name: "红豆 + $0.50", selected: false},
                                                                    {name: "奶泡 + $0.50", selected: true},
                                                                    {name: "中杯 + $0.50", selected: true}]},
                            {title: "甜度[必选]", limit: 1, options: [{name: "0%"}, {name: "30%"}, {name: "50%"}, {name: "100%"}]},
                            {title: "冷热[必选]", limit: 1, options: [{name: "无冰"}, {name: "少冰"}, {name: "正常冰"}, {name: "热饮"}]},
                            {title: "冷热[必选]", limit: 1, options: [{name: "无冰"}, {name: "少冰"}, {name: "正常冰"}, {name: "热饮"}]},
                            {title: "冷热[必选]", limit: 1, options: [{name: "无冰"}, {name: "少冰"}, {name: "正常冰"}, {name: "热饮"}]},
                            {title: "冷热[必选]", limit: 1, options: [{name: "无冰"}, {name: "少冰"}, {name: "正常冰"}, {name: "热饮"}]}],
          }
          // var index = 0;
          // for (let item of data) {
          //   for (let option of item.options) {
          //     option.key = index;
          //     index++;
          //   }
          // }
          dispatch({
              actionType: SboxConstants.GET_SECOND_MENU_DATA, data
          })
        }catch(error){

        }
      },
      updateOptions(sectionList) {
        try{
          const data = sectionList;
          dispatch({
              actionType: SboxConstants.UPDATE_SECTION_LIST, data
          })
        }catch(error){

        }
      }
}
