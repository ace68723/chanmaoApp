
## Get SPU Detail API


|  Tables  |          说明          | 默认值  |
| :------: | :------------------: | :--: |
|   URL    | /api/sbmanage/v2/get_spu_detail |      |
| HTTP请求方式 |         POST          |      |
|  是否需要登录  |          否           |      |
|  授权访问限制  |          暂无          |      |
|  授权范围()  |          暂无          |      |
|   支持格式   |         JSON         |      |


表头参数:

| Tables | 类型及其范围 | 说明    | 默认值  |
| ------ | ------ | ----- | ---- |
| uuid   | string | 接口验证用 |      |
| Authortoken   | string | 接口验证用 |      |

接口说明：
获取SPU List

请求字段:

| Tables | 类型及其范围 | 必填  | 默认值  |  说明  |
| ------ | ------ | ----- | ---- | ---- |
| iv_spu_id | number | 是 |   |  |
| iv_page_size | number | 否 |  20  |  |
| iv_page_num | number | 否 |  1  |  |


返回字段说明:

| Tables     | 类型及其范围 | 说明       | 默认值        |
| ---------- | ------ | -------- | ---------- |
| ev_error   | number | 请求是否成功   | 0为成功, 1为错误 |
| ev_message | string | 报错信息     | 空          |
| eo_spu  | array  |  |          |

| eo_spu | 类型及其范围 | 说明          |
| --------------- | ------ | --------------------------------------- |
| spu_id          | number | spu ID                                  |
| spu_name           | string  | 名称                                     |
| spu_image_id         | number | 图片ID                                    |
| spu_image         | string | 图片url                                    |
| spu_price    | string | 价钱（string格式返回）                       |
| spu_status     | number  | 0 = ok, 1 = sold out, 9 = 下线 |
| sku_total_count | number |      |           |
| sku_total_page | number |      |           |
| sku_page_num | number |      |           |
| sku_page_size | number |      |           |
| sku_list | array |      |           |

| sku_list | 类型及其范围 | 说明          |
| --------------- | ------ | --------------------------------------- |
| spu_id          | number | spu ID                                  |
| sku_id          | number | sku ID                                  |
| sku_name           | string  | 名称                                     |
| sku_alias          | string  | 别名（搜索用）                               |
| sku_status     | number  | 0 = ok, 1 = sold out, 9 = 下线 |
| sku_price    | string | 价钱（string格式返回）                       |
| sku_original_price    | string | 价钱（string格式返回）                       |
| sku_amount    | number |   库存（含threshold）                     |
| sku_threshold    | number |   保留库存                     |
| sku_image_id         | number | 图片ID                                    |
| sku_image         | string | 图片url                                    |
| sku_fact_image_id         | number | fact图片ID                                    |
| sku_fact_image         | string | fact图片url                                    |
| sku_limit | number | 否 | 限购数， -1不限制 |


返回结果(默认JSON): 
```
{
    "ev_error": 0,
    "ev_message": "",
    "eo_spu": {
        "spu_id": 2,
        "spu_name": "与美懒人大厨四川冒菜",
        "spu_price": "0.00",
        "spu_image": "https://chanmao.us/storage/image/sb_app/image/2_20170828.png",
        "spu_status": 9,
        "sku_total_count": 2,
        "sku_total_page": 1,
        "sku_page_num": 1,
        "sku_page_size": 20,
        "sku_list": [
            {
                "spu_id": 2,
                "sku_id": 2,
                "sku_name": "豚骨菌菇",
                "sku_status": 9,
                "sku_alias": "",
                "sku_price": "0.00",
                "sku_amount": 0,
                "sku_threshold": 1,
                "sku_original_price": "0.00",
                "sku_image_id": 2,
                "sku_fact_image_id": 202,
                "sku_image": "https://chanmao.us/storage/image/sb_app/image/2_20170828.png",
                "sku_fact_image": "https://chanmao.us/storage/image/sb_app/facts/2_20170828.png"
            },
            {
                "spu_id": 2,
                "sku_id": 3,
                "sku_name": "浓香麻辣",
                "sku_status": 9,
                "sku_alias": "",
                "sku_price": "0.00",
                "sku_amount": 1,
                "sku_threshold": 1,
                "sku_original_price": "0.00",
                "sku_image_id": 3,
                "sku_fact_image_id": 203,
                "sku_image": "https://chanmao.us/storage/image/sb_app/image/3_20170828.png",
                "sku_fact_image": "https://chanmao.us/storage/image/sb_app/facts/3_20170828.png"
            }
        ]
    }
}
```

