
##获取首页信息 API


|  Tables  |          说明          | 默认值  |
| :------: | :------------------: | :--: |
|   URL    | /api/sb/v2/home_data |      |
| HTTP请求方式 |         GET          |      |
|  是否需要登录  |          否           |      |
|  授权访问限制  |          暂无          |      |
|  授权范围()  |          暂无          |      |
|   支持格式   |         JSON         |      |


表头参数:

| Tables | 类型及其范围 | 说明    | 默认值  |
| ------ | ------ | ----- | ---- |
| uuid   | string | 接口验证用 |      |

接口说明：
获取首页banner的详细信息，以及每个theme的前十个产品信息

请求字段:
无


返回字段说明:

| Tables     | 类型及其范围 | 说明       | 默认值        |
| ---------- | ------ | -------- | ---------- |
| ev_error   | number | 请求是否成功   | 0为成功, 1为错误 |
| ev_message | string | 报错信息     | 空          |
| ea_banner  | array  | BANNER信息 |            |
| ea_theme   | array  | 口味列表     |            |


| ea_banner | 类型及其范围 | 说明          |
| --------- | ------ | ----------- |
| id        | number | 首页Banner ID |
| image     | string | 首页Banner图片  |
| type      | string | 类别          |
| param     | string | 参数          |

| ea_theme      | 类型及其范围 | 说明   |
| ------------- | ------ | ---- |
| tmid          | number | 口味ID |
| name          | string | 口味名字 |
| icon_active   | string | 口味图标 |
| icon_inactive | string | 口味图标 |
| section_list  | array  | 产品列表 |
| prod_list  | array  | 产品列表 |

| section_list    | 类型及其范围 | 说明                                      |
| --------------- | ------ | --------------------------------------- |
| section_name    | string | section名字                               |
| section_id      | number | section id                              |
| section_icon    | string  | section 图片url                            |
| prod_start_idx    | string  | 对应prod_list中起始的block的index                            |

| prod_list    | 类型及其范围 | 说明                                      |
| --------------- | ------ | --------------------------------------- |
| type            | string | 类型（看类型，下面的attribute不一定每个都有）             |
| spu_id          | number | spu ID                                  |
| sku_id          | number | sku ID                                  |
| name            | float  | 名称                                      |
| image           | string | 图片链接                                    |
| sku_price    | string | 实际价钱（string格式返回）                    |
| spu_original_price | string | 减价前的价钱（string格式返回）                       |
| status          | array  | 0 = ok, 1 = sold out, 9 = 下线（这个后端直接不返回） |



返回结果(默认JSON): 
```
{
    "ev_error": 0,
    "ev_message": "",
    "ea_banner": [
        {
            "id": 3,
            "image": "https://chanmao.us/storage/image/sb_app/home_banner/3_20170828.png",
            "type": 3,
            "param": "param3"
        },
        {
            "id": 2,
            "image": "https://chanmao.us/storage/image/sb_app/home_banner/2_20170828.png",
            "type": 2,
            "param": "param2"
        },
        {
            "id": 1,
            "image": "https://chanmao.us/storage/image/sb_app/home_banner/1_20170828.png",
            "type": 1,
            "param": "param"
        }
    ],
    "ea_theme": [
        {
            "tmid": 1,
            "name": "零食零食",
            "active_icon": "https://chanmao.us/storage/image/sb_app/theme_icon/1_active_20170828.png",
            "inactive_icon": "https://chanmao.us/storage/image/sb_app/theme_icon/1_inactive_20170828.png",
            "section_list": [
                {
                    "section_id": 1,
                    "section_name": "新品速递",
                    "section_icon": "https://chanmao.us/storage/image/sb_app/2.0/tmp/new.png",
                    "prod_start_idx": 0
                },
                {
                    "section_id": 2,
                    "section_name": "好货热卖",
                    "section_icon": "https://chanmao.us/storage/image/sb_app/2.0/tmp/hot.png",
                    "prod_start_idx": 6
                },
                {
                    "section_id": 3,
                    "section_name": "超值特价",
                    "section_icon": "https://chanmao.us/storage/image/sb_app/2.0/tmp/sale.png",
                    "prod_start_idx": 12
                }
            ],
            "prod_list": [
                {
                    "type": "section_left",
                    "section_id": 1
                },
                {
                    "type": "section",
                    "section_id": 1,
                    "section_name": "新品速递"
                },
                {
                    "type": "section_right",
                    "section_id": 1
                },
                {
                    "sku_id": 1,
                    "spu_id": 2,
                    "name": "张君雅海苔味10G",
                    "sku_original_price": "10.99",
                    "sku_price": "10.99",
                    "status": 0,
                    "image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/1_20170828.png",
                    "section_id": 1,
                    "type": "sku"
                },
                {
                    "sku_id": 2,
                    "spu_id": 2,
                    "name": "张君雅原味味10G",
                    "sku_original_price": "10.99",
                    "sku_price": "10.99",
                    "status": 0,
                    "image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/2_20170828.png",
                    "section_id": 1,
                    "type": "sku"
                },
                {
                    "type": "empty"
                },
                {
                    "type": "section_left",
                    "section_id": 2
                },
                {
                    "type": "section",
                    "section_id": 2,
                    "section_name": "好货热卖"
                },
                {
                    "type": "section_right",
                    "section_id": 2
                },
                {
                    "sku_id": 3,
                    "spu_id": 1,
                    "name": "浪味仙田园蔬菜10G",
                    "sku_original_price": "16.99",
                    "sku_price": "12.99",
                    "status": 0,
                    "image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/3_20170828.png",
                    "section_id": 2,
                    "type": "sku"
                },
                {
                    "sku_id": 4,
                    "spu_id": 1,
                    "name": "浪味仙烧烤味10G",
                    "sku_original_price": "16.99",
                    "sku_price": "12.99",
                    "status": 0,
                    "image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/4_20170828.png",
                    "section_id": 2,
                    "type": "sku"
                },
                {
                    "type": "empty"
                },
                {
                    "type": "section_left",
                    "section_id": 3
                },
                {
                    "type": "section",
                    "section_id": 3,
                    "section_name": "超值特价"
                },
                {
                    "type": "section_right",
                    "section_id": 3
                },
                {
                    "spu_id": 1,
                    "name": "浪味仙",
                    "spu_price": "10.99",
                    "status": 0,
                    "image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/zjy_big.png",
                    "section_id": 3,
                    "type": "spu"
                },
                {
                    "spu_id": 2,
                    "name": "张君雅",
                    "spu_price": "12.99",
                    "status": 0,
                    "image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/lwx_big.png",
                    "section_id": 3,
                    "type": "spu"
                },
                {
                    "type": "empty"
                }
            ]
        },
        {
            "tmid": 2,
            "name": "生活用品",
            "active_icon": "https://chanmao.us/storage/image/sb_app/theme_icon/2_active_20170828.png",
            "inactive_icon": "https://chanmao.us/storage/image/sb_app/theme_icon/2_inactive_20170828.png",
            "section_list": [],
            "prod_list": []
        },
        {
            "tmid": 3,
            "name": "Gift Card",
            "active_icon": "https://chanmao.us/storage/image/sb_app/theme_icon/3_active_20170828.png",
            "inactive_icon": "https://chanmao.us/storage/image/sb_app/theme_icon/3_inactive_20170828.png",
            "section_list": [],
            "prod_list": []
        }
    ]
}
```
