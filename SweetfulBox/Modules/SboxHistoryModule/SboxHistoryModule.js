import SboxHistoryAPI from './SboxHistoryAPI';
import {GetUserInfo} from '../../../App/Modules/Database';
const historyData = {
  ev_error: 0,
  ev_message: "",
  ea_order: [
          {
            obid: 325,
            created: 1516162657,
            delifee: "0.00",
            total: "15.42",
            created_date: "2018-01-16 23:17",
              addr: {
                  abid: 200,
                  addr: "122228 Pemberton Ave, North York, ON M2M 4L9, Canada",
                  name: "Jacob",
                  tel: "6477777777",
                  unit: "1211"
              },
              tax: 1.77,
              prod: [
                      {
                          sku_id: 9,
                          sku_fullname: "好巴食经典豆干乐享装", //spu_name + sku_name = sku_fulln1ame
                          sku_quantity: 2,
                          sku_price: "1.69",
                          sku_image: "https://chanmao.us/storage/image/sb_app/image/9_20170828.png"
                      },
                      {
                          sku_id: 79,
                          sku_fullname: "三足旺华派自加热米线 - 红烧牛肉",
                          sku_quantity: 1,
                          sku_price: "5.99",
                          sku_image: "https://chanmao.us/storage/image/sb_app/image/79_20171129.png"
                      },
                      {
                          sku_id: 89,
                          sku_fullname: "北田 能量99棒 蛋黄味",
                          sku_quantity: 1,
                          sku_price: "2.99",
                          sku_image: "https://chanmao.us/storage/image/sb_app/image/89_20171229.png"
                      },
                      {
                          sku_id: 94,
                          sku_fullname: "娃哈哈乳酸菌饮料 原味 100ml*4",
                          sku_quantity: 1,
                          sku_price: "1.29",
                          sku_image: "https://chanmao.us/storage/image/sb_app/image/94_20171229.png"
                      }
                  ],
                  trace: {
                    status: 10,
                    time: "2018-01-30 10:01"
                  }
            }
    ]
}
export default  {
  async getInitData() {
    // return historyData.ea_order
    try {
      const {uid,token,version} = GetUserInfo();
      const lo_data ={
        authortoken: token,
      }
      const res = await SboxHistoryAPI.getDefaultData(lo_data);
      for (let lo_order of res.ea_order){
        // lo_order.key = lo_order.obid;
        lo_order = Object.assign(lo_order, {key:lo_order.obid})
      }
      return res.ea_order;
    } catch (e) {
      throw e;
    }
  }
}
