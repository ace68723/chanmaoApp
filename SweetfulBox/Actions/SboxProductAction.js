import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import ProductModule from '../Modules/ProductModule/ProductModule';
import {sbox_getCartQuantity,sbox_cartQuantityListener} from '../Modules/Database';
export default {
    async getSingleProduct(spu_id){
        try{
          const data = await ProductModule.getSingleProduct(spu_id);
          dispatch({
              actionType: SboxConstants.GET_SINGLE_PRODUCT, data
          })
        }catch(error){

        }
      },
    addToCart(selectedProduct,showLightBox,dismissLightBox){
        try {
          ProductModule.addToCart(selectedProduct);

          showLightBox({
            screen: "SboxCartAlert",
            passProps: {
              message:`成功添加入购物车`}, // simple serializable object that will pass as props to the lightbox (optional)
            adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
           });
           setTimeout(() => {
            dismissLightBox();
          }, 1500);

          dispatch({
              actionType: SboxConstants.UPDATE_CART_TOTAL_QUANTITY
          })
        } catch (errorMessage) {
          console.log(errorMessage)

          showLightBox({
            screen: "SboxCartAlert",
            passProps: {
              message:errorMessage}, // simple serializable object that will pass as props to the lightbox (optional)
            adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
           });
           setTimeout(() => {
            dismissLightBox();
          }, 1500);

        }
      },
    changeSelectAttr(selectedProduct){
      try{
        dispatch({
            actionType: SboxConstants.CHANGE_SELECT_ATTR, selectedProduct
        })
      }catch(error){

      }
    },
    addQuantity(){
      try{
        dispatch({
            actionType: SboxConstants.ADD_QUANTITY
        })
      }catch(error){

      }
    },
    subQuantity(){
      try{
        dispatch({
            actionType: SboxConstants.SUB_QUANTITY
        })
      }catch(error){
      }
    },
    changeProductImage(page) {
      try{
        dispatch({
            actionType: SboxConstants.CHANG_PRODUCT_IMAGE,page
        })
      }catch(error){
      }
    }
}
