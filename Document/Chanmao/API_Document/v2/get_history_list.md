
## 历史订单 API 获取历史订单



|  Tables  |           说明            | 默认值  |
| :------: | :---------------------: | :--: |
|   URL    | /api/cmapp/v2/get_history_list |      |
| HTTP请求方式 |          GET           |      |
|  是否需要登录  |            否            |      |
|  授权访问限制  |           暂无            |      |
|  授权范围()  |           暂无            |      |
|   支持格式   |          JSON           |      |
|   测试接口   |          http://norgta.com//api/cmapp/v2/get_history_list          |      |


表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |



返回:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_error  | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |
| ea_history_list | array | 历史订单 |  |  


| ea_history_list   | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| order_oid    | string | 订单ID |    |
| order_created  | string | 创建订单时间 |    |
| order_comment  | string | 订单评价 |    |
| order_payment_channel  | int | 订单支付方式 |  0为Cash 1为信用卡 10为支付宝 20为微信支付  |
| order_payment_status  | int | 订单支付状态 |  0为新订单 10为已付款 20为已退款 30为已退单  |
| order_review_status  | int | 订单是否被评价 | 0为未评价 1为已评价  |
| order_status  | int | 订单状态 |  0为等待商家确认 10为商家已确认,准备中 20为商家已确认,准备中 30为送餐员已开始送餐 40为已送到,满意吗? 55为新用户订单确认中 60为客服稍后联系您改运费 5为槽糕,有的菜没了 90为订单已取消  |
| order_total  | string | 订单总价 |    |
| rr_name  | string | 餐馆名字 |    |
| rr_rid  | string | 餐馆ID |    |
| rr_url  | string | 餐馆图片 |    |
| user_address  | string | 用户地址 |    |
| user_name  | string | 用户名字 |    |
| user_tel  | string | 用户手机号码 |    |
| items  | array | 菜品 |    |


| items   | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ds_id    | int | 菜品ID |    |
| ds_name  | string | 菜品名字 |    |
| ds_desc  | string | 菜品描述 |    |
| otid  | int | 菜品ID |    |
| amount  | int | 数量 |    |
| int_no  | string | 订单ID |    |
| price  | string | 菜品价格 |    |
| soldout  | int | 缺货状态 |  0为有货 1为缺货  |
| tps  | array | 2级选项 |    |


```
{
    ev_error	
    ev_message	
}
```

Data Sample
```
{
	
}
```
