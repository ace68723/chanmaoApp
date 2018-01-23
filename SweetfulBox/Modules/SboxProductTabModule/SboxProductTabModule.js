import SboxProductTabAPI from './SboxProductTabAPI';
const  DeviceInfo     = require('react-native-device-info');
export default  {
  async getProductList(io_data) {
    try {
      // uuid为devid unique id
      // iv_number为每次提取数据的数量
      const lo_data = {
        uuid:DeviceInfo.getUniqueID(),
        iv_number:5,
        iv_tmid:io_data.iv_tmid,
        iv_lastid:io_data.iv_lastid,
      }
      // 把每个item的pmid定义为它的key值
      const res = await SboxProductTabAPI.getProductList(lo_data);
      if(res.ev_error !== 0) throw res;
      let ea_prod = res.ea_prod;
      for (let lo_items of ea_prod) {
        lo_items = Object.assign(lo_items, {key:lo_items.pmid});
      }
      const eo_data = {
         tmid: io_data.iv_tmid,
         prod_list: ea_prod
      }
      return eo_data;
    } catch (e) {
      throw e
    }
  }
}
