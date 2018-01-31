##  历史订单 API


|  Tables  |            说明            | 默认值  |
| :------: | :----------------------: | :--: |
|   URL    | /api/sb/v2/order_history |      |
| HTTP请求方式 |           POST           |      |
|  是否需要登录  |            是             |      |
|  授权访问限制  |            暂无            |      |
|  授权范围()  |            暂无            |      |
|   支持格式   |           JSON           |      |


表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| authortoken | string | token验证信息 |      |



返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_error   | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |
| ea_order   | array  | 订单信息   | 空为没有       |


| ea_order     | 类型及其范围 | 说明              |
| ------------ | ------ | --------------- |
| obid         | number | 订单ID            |
| created      | string | 下单时间（unix time） |
| created_date | array  | 下单时间（文字显示）      |
| delifee      | float  | 总运费             |
| total        | float  | 总价              |
| addr         | object | 地址              |
| prod         | array  | 产品列表           |
| tax          | float  | 税               |

| addr | 类型及其范围 | 说明   |
| ---- | ------ | ---- |
| abid | number | 地址ID |
| name | string | 名字   |
| addr | string | 地址   |
| tel  | string | 电话   |
| unit | string | unit |


| prod | 类型及其范围 | 说明    |
| --------- | ------ | ----- |
| sku_id      | number | 产品ID  |
| sku_fullname  | string | 产品短描述 |
| sku_price     | string  | 单价    |
| sku_quantity  | number | 数量    |
| sku_image  | string | 图片url    |


| trace       | 类型及其范围 | 说明   |
| ----------- | ------ | ---- |
| time       | string | 当前时间   |
| status      | enum(0,10,20,30,40,50) | 描述   |

```
trace status: 
50 = completed
40 = delivered
30 = distributed
20 = packed
10 = accepted
0 = error
```

返回结果(默认JSON):
```
{
    "ev_error": 0,
    "ev_message": "",
    "ea_order": [
        {
            "obid": 337,
            "created": 1517348415,
            "delifee": "0.00",
            "total": "37.26",
            "created_date": "2018-01-30 16:40",
            "addr": {
                "abid": 140,
                "addr": "113 granton drive",
                "name": "Sam",
                "tel": "6472248006",
                "unit": ""
            },
            "tax": 4.29,
            "prod": [
                {
                    "sku_id": 1,
                    "sku_fullname": "张君雅海苔味10G",
                    "sku_quantity": 1,
                    "sku_price": "10.99",
                    "sku_image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/1_20170828.png"
                },
                {
                    "sku_id": 2,
                    "sku_fullname": "张君雅原味味10G",
                    "sku_quantity": 2,
                    "sku_price": "10.99",
                    "sku_image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/2_20170828.png"
                }
            ],
            "trace": {
                "time": "2018-01-30 22:01",
                "status": 10
            }
        },
        {
            "obid": 336,
            "created": 1517344505,
            "delifee": "0.00",
            "total": "37.26",
            "created_date": "2018-01-30 15:35",
            "addr": {
                "abid": 140,
                "addr": "113 granton drive",
                "name": "Sam",
                "tel": "6472248006",
                "unit": ""
            },
            "tax": 4.29,
            "prod": [
                {
                    "sku_id": 1,
                    "sku_fullname": "张君雅海苔味10G",
                    "sku_quantity": 1,
                    "sku_price": "10.99",
                    "sku_image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/1_20170828.png"
                },
                {
                    "sku_id": 2,
                    "sku_fullname": "张君雅原味味10G",
                    "sku_quantity": 2,
                    "sku_price": "10.99",
                    "sku_image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/2_20170828.png"
                }
            ],
            "trace": {
                "time": "2018-01-30 22:01",
                "status": 0
            }
        },
        {
            "obid": 335,
            "created": 1517344123,
            "delifee": "0.00",
            "total": "41.78",
            "created_date": "2018-01-30 15:28",
            "addr": {
                "abid": 140,
                "addr": "113 granton drive",
                "name": "Sam",
                "tel": "6472248006",
                "unit": ""
            },
            "tax": 4.81,
            "prod": [
                {
                    "sku_id": 1,
                    "sku_fullname": "张君雅海苔味10G",
                    "sku_quantity": 1,
                    "sku_price": "10.99",
                    "sku_image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/1_20170828.png"
                },
                {
                    "sku_id": 3,
                    "sku_fullname": "浪味仙田园蔬菜10G",
                    "sku_quantity": 2,
                    "sku_price": "12.99",
                    "sku_image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/3_20170828.png"
                }
            ],
            "trace": {
                "time": "2018-01-30 22:01",
                "status": 0
            }
        },
        {
            "obid": 333,
            "created": 1517343745,
            "delifee": "0.00",
            "total": "41.78",
            "created_date": "2018-01-30 15:22",
            "addr": {
                "abid": 140,
                "addr": "113 granton drive",
                "name": "Sam",
                "tel": "6472248006",
                "unit": ""
            },
            "tax": 4.81,
            "prod": [],
            "trace": {
                "time": "2018-01-30 22:01",
                "status": 0
            }
        },
        {
            "obid": 332,
            "created": 1517324873,
            "delifee": "0.00",
            "total": "24.84",
            "created_date": "2018-01-30 10:07",
            "addr": {
                "abid": 140,
                "addr": "113 granton drive",
                "name": "Sam",
                "tel": "6472248006",
                "unit": ""
            },
            "tax": 2.86,
            "prod": [],
            "trace": {
                "time": "2018-01-30 22:01",
                "status": 0
            }
        },
        {
            "obid": 331,
            "created": 1516306566,
            "delifee": "0.00",
            "total": "72.40",
            "created_date": "2018-01-18 15:16",
            "addr": {
                "abid": 140,
                "addr": "113 granton drive",
                "name": "Sam",
                "tel": "6472248006",
                "unit": ""
            },
            "tax": 8.33,
            "prod": [],
            "trace": {
                "time": "2018-01-30 22:01",
                "status": 0
            }
        },
        {
            "obid": 277,
            "created": 1515185368,
            "delifee": "0.00",
            "total": "22.37",
            "created_date": "2018-01-05 15:49",
            "addr": {
                "abid": 140,
                "addr": "113 granton drive",
                "name": "Sam",
                "tel": "6472248006",
                "unit": ""
            },
            "tax": 2.57,
            "prod": [],
            "trace": {
                "time": "2018-01-30 22:01",
                "status": 0
            }
        },
        {
            "obid": 249,
            "created": 1514495309,
            "delifee": "0.00",
            "total": "1.91",
            "created_date": "2017-12-28 16:08",
            "addr": {
                "abid": 140,
                "addr": "113 granton drive",
                "name": "Sam",
                "tel": "6472248006",
                "unit": ""
            },
            "tax": 0.22,
            "prod": [],
            "trace": {
                "time": "2018-01-30 22:01",
                "status": 0
            }
        },
        {
            "obid": 246,
            "created": 1514392773,
            "delifee": "0.00",
            "total": "18.23",
            "created_date": "2017-12-27 11:39",
            "addr": {
                "abid": 140,
                "addr": "113 granton drive",
                "name": "Sam",
                "tel": "6472248006",
                "unit": ""
            },
            "tax": 2.1,
            "prod": [],
            "trace": {
                "time": "2018-01-30 22:01",
                "status": 0
            }
        },
        {
            "obid": 211,
            "created": 1513281278,
            "delifee": "0.00",
            "total": "21.78",
            "created_date": "2017-12-14 14:54",
            "addr": {
                "abid": 91,
                "addr": "",
                "name": "Kathy",
                "tel": "6479799087",
                "unit": "1506"
            },
            "tax": 2.51,
            "prod": [],
            "trace": {
                "time": "2018-01-30 22:01",
                "status": 0
            }
        }
    ]
}
```
