import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import UserModule from '../Modules/UserModule/UserModule'
// import OrderModule from '../Modules/OrderModule/OrderModule'

export default {

      async putUserAddr(io_data){
        try{
          const data = await UserModule.putUserAddr(io_data);
          // console.log(data);
          dispatch({
            actionType: AppConstants.PUT_USER_ADDR, data
          })
        }catch(error){
          console.log(error)
        }
      },
}
