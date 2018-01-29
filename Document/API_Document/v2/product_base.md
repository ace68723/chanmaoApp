
## 单个商品获取 API


|  Tables  |          说明          | 默认值  |
| :------: | :------------------: | :--: |
|   URL    | /api/sb/v2/prod_base |      |
| HTTP请求方式 |         POST         |      |
|  是否需要登录  |          否           |      |
|  授权访问限制  |          暂无          |      |
|  授权范围()  |          暂无          |      |
|   支持格式   |         JSON         |      |


表头参数:

| Tables      | 类型及其范围 | 说明    | 默认值  |
| ----------- | ------ | ----- | ---- |
| authortoken | string | 接口验证用 |      |

请求字段：

| Tables  | 类型及其范围 | 说明             | 默认值  |
| ------- | ------ | -------------- | ---- |
| iv_spu_id | int | SPU ID |      |

返回字段说明:

| Tables         | 类型及其范围 | 说明     | 默认值        |
| -------------- | ------ | ------ | ---------- |
| ev_error       | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message     | string | 报错信息   | 空          |
| eo_spu_base   | object  | 产品信息   |            |

| eo_spu_base | 类型及其范围 | 说明    |
| -------------- | ------ | ----- |
| spu_id           | number | 产品组ID |
| spu_name       | string | 产品组名字 |
| status           | number  | 产品组状态 0为正常 1为缺货  |
| sku_image           | array  | 相关SKU的正面图片  |
| sku_fact           | array  | 相关SKU的反面/营养表图片  |
| sku_list           | array  | 相关的SKU  |


| sku_image/fact item | 类型及其范围 | 说明      |
| ---------- | ------ | ------- |
| image_id  | string | 图片ID |
| image_url  | string | 图片 URL |


| ea_prod_base | 类型及其范围 | 说明           |
| ------------ | ------ | ------------ |
| spu_id         | number | 产品组ID         |
| sku_id         | number | 产品ID         |
| sku_name       | string | SKU 名称（属性名） |
| sku_status    | number | 产品状态 0为正常 1为缺货        |
| price        | string  | 单价           |
| original_price        | string  | 原售价 |
| amount       | number | available的数量 |
| sku_image_id        | number | 营养表图片ID     |
| sku_fact_image_id      | number | 正面图片ID  |
| sku_image_url        | number | 营养表图片Url    |
| sku_fact_image_url      | number | 正面图片Url  |




返回结果(默认JSON):
```
{
    "ev_error": 0,
    "ev_message": "",
    "eo_spu_base": {
        "spu_id": 1,
        "spu_name": "浪味仙",
        "spu_status": 0,
        "sku_image": [
            {
                "image_id": 14,
                "image_url": "https://chanmao.us/storage/image/sb_app/2.0/tmp/3_20170828.png"
            },
            {
                "image_id": 15,
                "image_url": "https://chanmao.us/storage/image/sb_app/2.0/tmp/4_20170828.png"
            }
        ],
        "sku_fact": [
            {
                "image_id": 18,
                "image_url": "https://chanmao.us/storage/image/sb_app/2.0/tmp/109_20180125.png"
            },
            {
                "image_id": 19,
                "image_url": "https://chanmao.us/storage/image/sb_app/2.0/tmp/110_20180125.png"
            }
        ],
        "sku_list": [
            {
                "spu_id": 1,
                "sku_id": 3,
                "sku_name": "田园蔬菜 10G",
                "sku_status": 0,
                "amount": 10,
                "sku_image_id": 14,
                "sku_fact_image_id": 18,
                "sku_original_price": "16.99",
                "sku_price": "12.99",
                "sku_image_url": "https://chanmao.us/storage/image/sb_app/2.0/tmp/3_20170828.png",
                "sku_fact_image_url": "https://chanmao.us/storage/image/sb_app/2.0/tmp/109_20180125.png"
            },
            {
                "spu_id": 1,
                "sku_id": 4,
                "sku_name": "烧烤味 10G",
                "sku_status": 0,
                "amount": 15,
                "sku_image_id": 15,
                "sku_fact_image_id": 19,
                "sku_original_price": "16.99",
                "sku_price": "12.99",
                "sku_image_url": "https://chanmao.us/storage/image/sb_app/2.0/tmp/4_20170828.png",
                "sku_fact_image_url": "https://chanmao.us/storage/image/sb_app/2.0/tmp/110_20180125.png"
            }
        ]
    }
}
```
