## Add Sku


|    Tables    |           说明           | 默认值 |
| :----------: | :----------------------: | :----: |
|     URL      | /api/sbmanage/v2/add_sku |        |
| HTTP请求方式 |           POST           |        |
| 是否需要登录 |            否            |        |
| 授权访问限制 |           暂无           |        |
|  授权范围()  |           暂无           |        |
|   支持格式   |           JSON           |        |


表头参数:

| Tables      | 类型及其范围 | 说明       | 默认值 |
| ----------- | ------------ | ---------- | ------ |
| uuid        | string       | 接口验证用 |        |
| Authortoken | string       | 接口验证用 |        |

接口说明：
修改SKU

请求字段:

| Tables             | 类型及其范围 | 必填 | 说明                           |
| ------------------ | ------------ | ---- | ---------------------------|
| spu_id           | string       | 否   | spu_id                           |
| sku_name           | string       | 否   | 名称                           |
| sku_fullname           | string       | 否   | 全名                        |
| sku_alias          | string       | 否   | 别名（搜索用）                 |
| sku_status         | number       | 否   | 0 = ok, 1 = sold out, 9 = 下线 |
| sku_price          | string       | 否   | 价钱（string格式返回）         |
| sku_original_price | string       | 否   | 价钱（string格式返回）         |
| sku_amount         | number       | 否   | 库存（含threshold）            |
| sku_threshold      | number       | 否   | 保留库存                       |
| sku_uplimit | number | 否 | 限购数， -1不限制 |


返回字段说明:

| Tables     | 类型及其范围 | 说明         | 默认值           |
| ---------- | ------------ | ------------ | ---------------- |
| ev_error   | number       | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string       | 报错信息     | 空               |
| updated    | boolean      |              |                  |



返回结果(默认JSON): 
```

{
    "ev_error": 0,
    "ev_message": "",
    "updated":true
}
```
