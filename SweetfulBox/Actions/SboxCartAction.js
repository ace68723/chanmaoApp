import SboxConstants from '../Constants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher';
import {sbox_getAllItemsFromCart} from '../Modules/Database';
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
}
