### 2018-01-31 update
- 新增API [3.7 Theme Query](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/SweetfulBox/API_Document/v2/theme_query.md) 首页列表下拉时获取数据用


### 2018-01-30 update
- 新增Data sample [1.4 Order history data sample](#1.4) 历史订单
- 新增API [3.5 Check Stock](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/SweetfulBox/API_Document/v2/check_stock.md)
- [Database schema ](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/SweetfulBox/database_schema.md) 旧表`sb_order_base`重命名`sbox_order_base`
- [Database schema ](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/SweetfulBox/database_schema.md) 新增表`sbox_order_item`
- [Database schema ](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/SweetfulBox/database_schema.md) 新增表`sbox_order_trace` (替代旧表`sb_box_trace`, 属性bbid改为obid)
- 新增API [3.6 Order History](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/SweetfulBox/API_Document/v2/order_history.md)


### 2018-01-29 update
- 新增API Document [3.1 Home Data](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/SweetfulBox/API_Document/v2/home_data.md) [3.2 Product base](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/SweetfulBox/API_Document/v2/product_base.md)
[3.3 Before checkout](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/SweetfulBox/API_Document/v2/before_checkout.md)
-  [Database schema ](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/SweetfulBox/database_schema.md) 新增表`sbox_addr_base` 替换旧表`sb_addr_base`，移除`cbid`字段
- [3.2 Product base](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/SweetfulBox/API_Document/v2/product_base.md) 和  [1.1 Single product spu data sample](#1.1) 新增字段`spu_service_img`
-  [3.3 Add order](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/SweetfulBox/API_Document/v2/add_order.md)

### 2018-01-26 update
- spu价格参数 `spu_price` （skulist中最低的sku_price）
- sku价格参数 `sku_original_price` `sku_price`
- sku通过 `sku_original_price` === `sku_price` 判断sku是否打折 
- 所有结算价格以 `sku_price` 为准
