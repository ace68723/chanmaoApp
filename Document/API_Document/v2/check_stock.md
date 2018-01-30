##  检查库存 API


|  Tables  |           说明            | 默认值  |
| :------: | :---------------------: | :--: |
|   URL    | /api/sb/v2/check_stock |      |
| HTTP请求方式 |          POST           |      |
|  是否需要登录  |            是            |      |
|  授权访问限制  |           暂无            |      |
|  授权范围()  |           暂无            |      |
|   支持格式   |          JSON           |      |


表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| authortoken | string | token验证信息 |      |


请求字段：

| Tables  | 类型及其范围 | 说明    | 默认值  |
| ------- | ------ | ----- | ---- |
| ia_prod | array  | 产品及数量 |      |

| ia_prod  | 类型及其范围 | 说明   |
| -------- | ------ | ---- |
| sku_id   | number | 产品ID |
| quantity | number | 数量   |


返回字段说明:

| Tables     | 类型及其范围 | 说明          | 默认值        |
| ---------- | ------ | ----------- | ---------- |
| ev_error   | number | 请求是否成功      | 0为成功, 1为错误 |
| ev_message | string | 报错信息        | 空          |
| ev_oos     | number | 库存不足        | 0 为不缺，1为缺货 |
| ea_prod    | array  | 返回所有的产品，通过 `quantity` `actual` 判断缺货        |           |
| ev_pretax  | string | 税前总价        |            |
| ev_total   | string | 税后总价        |            |


| ia_prod  | 类型及其范围 | 说明   |
| -------- | ------ | ---- |
| sku_id   | number | 产品ID |
| quantity | number | 检查数量 |
| price    | string | 价钱   |
| actual   | number | 实际数量 |


请求表(默认JSON):
```
{

 ia_prod: [
  {
   sku_id: number,
   quantity: number
  }
 ]

}
```

返回结果(默认JSON):
```
{
ev_error :#0: successful 1:fail
ev_message: string,
ev_oos: number, 
ea_prod: [
   {
    sku_id: number,
    quantity: number,
    actual: number,
    price: string
   }
 ]
},
ev_pretax: string,
ev_total: string
```
