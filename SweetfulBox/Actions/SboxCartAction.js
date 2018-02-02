import SboxConstants from '../Constants/SboxConstants';
import ProductModule from '../Modules/ProductModule/ProductModule'
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {sbox_getAllItemsFromCart, sbox_addQuantity, sbox_subQuantity, sbox_deleteItem} from '../Modules/Database';
export default {
     getAllItemsFromCart(lastid){
        try{
          const data =  sbox_getAllItemsFromCart();

          // dispatch({
          //     actionType: SboxConstants.GET_CONDO_LIST, data
          // })
        }catch(error){

        }
      },
      addQuantity(item){
        if(item.sku_quantity>=item.sku_amount) return;
        sbox_addQuantity(item)
        dispatch({
            actionType: SboxConstants.UPDATE_CART_ITEM_QUANTITY
        })
        dispatch({
          actionType: SboxConstants.UPDATE_CART_TOTAL_QUANTITY
        })
        // const data = sbox_getAllItemsFromCart();
        // dispatch({
        //     actionType: SboxConstants.GET_PRODUCT_LISTS, data
        // })
      },
      subQuantity(item){
        if(item.sku_quantity<=1) return;
        sbox_subQuantity(item)
        dispatch({
            actionType: SboxConstants.UPDATE_CART_ITEM_QUANTITY
        })
        dispatch({
          actionType: SboxConstants.UPDATE_CART_TOTAL_QUANTITY
        })
        // const data = sbox_getAllItemsFromCart();
        // dispatch({
        //     actionType: SboxConstants.GET_PRODUCT_LISTS, data
        // })
      },
      deleteItem(item){
        console.log(item)
        sbox_deleteItem(item)
        dispatch({
            actionType: SboxConstants.UPDATE_CART_ITEM_QUANTITY
        })
        dispatch({
          actionType: SboxConstants.UPDATE_CART_TOTAL_QUANTITY
        })
        // const data = sbox_getAllItemsFromCart();
        // dispatch({
        //     actionType: SboxConstants.GET_PRODUCT_LISTS, data
        // })
      },
      async checkStock() {
          try {
              const data = await ProductModule.checkStock();
              if (data.ev_error ===0) {
                dispatch({
                    actionType: SboxConstants.UPDATE_CART_ITEM_QUANTITY
                })
                dispatch({
                  actionType: SboxConstants.UPDATE_CART_TOTAL_QUANTITY
                })
              }

          }catch(error){
          console.log(error)
        }
      }
}
