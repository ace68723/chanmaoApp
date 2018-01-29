import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import ProductModule from '../Modules/ProductModule/ProductModule'
export default {
    async getCategoryList(showpm){

        try{
          const io_data = {
            showpm:showpm
          }
          const data = await ProductModule.getCategoryList(io_data);

          dispatch({
              actionType: SboxConstants.GET_CATEGORY_LIST, data
          })
        }catch(error){

        }
      },
      async searchCategoryList(io_data){
          try{
            const io_data = {
              number:1,
              lastid:1,
              cmid:1,
            }
            const data = await ProductModule.searchCategoryList(io_data);

            dispatch({
                actionType: SboxConstants.SEARCH_CATEGORY_LIST, data
            })
          }catch(error){

          }
        },
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
                const data = await ProductModule.getHomeData(io_data);

                dispatch({
                    actionType: SboxConstants.GET_HOME_DATA, data
                })
              }catch(error){

              }
            },
            async getSingleProduct(io_data){
              console.log('action')
                try{
                  const lo_data = {
                    pmid: io_data.pmid
                  }
                  const data = await ProductModule.getSingleProduct(lo_data);

                  dispatch({
                      actionType: SboxConstants.GET_SINGLE_PRODUCT, data
                  })
                }catch(error){

                }
              },
      addToCart({selectedProduct,selectedAmount}){
        try {
          ProductModule.addToCart({selectedProduct,selectedAmount});
        } catch (e) {

        }

      }
}
