## 菜单菜品 API - 读取菜单


|  Tables  |           说明            | 默认值  |
| :------: | :---------------------: | :--: |
|   URL    | /api/cmapp/v1/get_menu |      |
| HTTP请求方式 |          POST           |      |
|  是否需要登录  |            否            |      |
|  授权访问限制  |           暂无            |      |
|  授权范围()  |           暂无            |      |
|   支持格式   |          JSON           |      |
|   测试接口   |          http://norgta.com/api/cmapp/v1/get_menu           |      |
|   测试商家   |           rid 5            |      |
|   测试菜品   |          鱼香肉丝a           |      |

表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |
| uuid | string |  |      |


请求参数:

| Tables  | 类型及其范围 | 说明     | 默认值  |
| ------- | ------ | ------ | ---- |
| rid     | number | 餐馆ID   |      |


返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_result  | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |
| ea_dishes | array | 菜单列表   |           |


| ea_dishes     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ds_id     | number | 菜品ID  |    |
| rid     | number | 餐馆ID   |      |
| int_no  | string | 菜品内部ID |      |
| dt_id   | number | 菜品分类ID |      |
| ds_name | string | 菜品名字   |      |
| ds_desc | string | 菜品描述   |      |
| ds_price   | number | 价格     |      |
| tpg_ids   | array(int) | topping group IDs    |      |
| tpgs   | array | topping groups（**可能不含此属性**）    |      |

| tpgs  | 类型及其范围 | 说明     | 默认值  |
| ------- | ------ | ------ | ---- |
| tpg_id     | number | Topping group ID   |    |
| tpg_name     | string | Topping group name   |    |
| tpg_max_limit     | number | Topping group limit（最多选几项）  |    |
| tpg_min_limit     | number | Topping group limit（最少选几项）>=1时 为必填 |    |
| tps     | array | Topping 选项  |    |

| tps  | 类型及其范围 | 说明     | 默认值  |
| ------- | ------ | ------ | ---- |
| tp_id     | number | Topping ID   |    |
| tp_name     | string | Topping Name   |    |
| tp_price     | number | Topping Price   |    |


返回结果(默认JSON):

```
{
    ev_result: number,
    ev_message: string
}
```


Data Sample
```
{
    'catalog': [
                {'dstype': "3907", name: "点心", count: 30},
                {'dstype': "3920", name: "甜品", count: 8}
                ],
    'menu': [
            {'name': "甜品",
            "ds_id": 68998,
            "int_no": "123",
            "ds_name": "鱼香肉丝a",
            "ds_desc": "",
            "price": "998.99",
            "tpgs": {
              2:{
                  "tpg_id": 2,
                  "tpg_name": "冰量",
                  "tpg_max_limit": 3,
                  "tpg_min_limit": 1,
                  "tps": {
                      4:{
                          "tp_id": 4,
                          "tp_name": "少冰",
                          "tp_price": "0.00"
                      },
                      5:{
                          "tp_id": 5,
                          "tp_name": "多冰",
                          "tp_price": "0.00",
                      },
                      6:{
                          "tp_id": 6,
                          "tp_name": "不要冰",
                          "tp_price": "0.00"
                      }
                },
              17:{
                  "tpg_id": 17,
                  "tpg_name": "Size",
                  "tpg_limit": 1,
                  "tps": {
                    34:{
                        "tp_id": 34,
                        "tp_name": "大杯",
                        "tp_price": "2.00"
                    },
                    35:{
                          "tp_id": 35,
                          "tp_name": "中杯",
                          "tp_price": "1.00"
                    }
                  }
              }
            }
          }
    ],             
    'name': string,
    'open': 1,
    'promo': null,
    'result': '',
}
```
