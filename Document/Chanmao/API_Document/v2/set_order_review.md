## 历史订单评价 API 修改评价



|  Tables  |           说明            | 默认值  |
| :------: | :---------------------: | :--: |
|   URL    | /api/cmapp/v2/set_order_review |      |
| HTTP请求方式 |          POST           |      |
|  是否需要登录  |            否            |      |
|  授权访问限制  |           暂无            |      |
|  授权范围()  |           暂无            |      |
|   支持格式   |          JSON           |      |
|   测试接口   |          http://norgta.com//api/cmapp/v2/set_order_review          |      |


表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |
| uuid | string |  |      |


请求参数:

| Tables  | 类型及其范围 | 说明     | 默认值  |
| ------- | ------ | ------ | ---- |
| oid     | number | 订单ID   |      |
| complete_time | int | 订单送达时间(unix timestamp) |  |  
| driver_score | int | 司机评分   |           |
| driver_comment | string | 司机评价   |           |
| restaurant_score | int | 餐馆评分   |           |
| restaurant_comment | string | 餐馆评价   |           |
| dish_ratings  | array | 订单菜品score |      |

| dish_ratings   | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| otid    | int | 菜品流水ID |    |
| rating  | int | 菜品评分 | 0:默认; 1:喜欢; -1:不喜欢   |


返回:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_error  | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |

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
