## 下单API


|  Tables  |          说明          | 默认值  |
| :------: | :------------------: | :--: |
|   URL    | /api/sb/v1/add_order |      |
| HTTP请求方式 |         POST         |      |
|  是否需要登录  |          否           |      |
|  授权访问限制  |          暂无          |      |
|  授权范围()  |          暂无          |      |
|   支持格式   |         JSON         |      |


表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| authortoken | string | token验证信息 |      |


请求字段：

| ia_boxes | 类型及其范围 | 说明    | 默认值  |
| -------- | ------ | ----- | ---- |
| prod     | array  | 产品及数量 |      |

| prod     | 类型及其范围 | 说明   |
| -------- | ------ | ---- |
| sku_id   | number | 产品ID |
| quantity | number | 数量   |


请求字段例子(默认JSON):
``` 
{
     "prod": [
      	{
      		"sku_id": 1,
      		"quantity": 13
      		
      	},
      	{
      		"sku_id": 2,
      		"quantity": 13
      		
      	}]
}
```


返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_error   | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |



返回结果(默认JSON):
```
{
  ev_error :#0: successful 1:fail
  ev_message:
}
```
