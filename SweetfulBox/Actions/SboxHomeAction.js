import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import ProductModule from '../Modules/ProductModule/ProductModule'
export default {
        async searchThemeList(io_data){
            try{
              const io_data = {
                number:2,
                lastid:0,
                tmid:2,
              }
              const data = await ProductModule.searchThemeList(io_data);

              dispatch({
                  actionType: SboxConstants.SEARCH_THEME_LIST, data
              })
            }catch(error){

            }
          },
          async getHomeData(io_data){
              try{
                const io_data = {

                }
                // const ea_home = ProductModule.getAPICache();
                // if(ea_home){
                //   const data = JSON.parse(ea_home);
                //   dispatch({
                //       actionType: SboxConstants.GET_HOME_DATA, data
                //   })
                // }
                // setTimeout(function () {
                //
                // }, 10);
                const data = await ProductModule.getHomeData(io_data);
                const {themeList} = data;
                dispatch({
                    actionType: SboxConstants.GET_HOME_DATA, data
                })
                dispatch({
                    actionType: SboxConstants.INIT_THEME_DATA, themeList
                })

              }catch(error){
                console.log(error)
              }
            },
}
