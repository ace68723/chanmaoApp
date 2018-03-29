
## Get SPU List API


|  Tables  |          说明          | 默认值  |
| :------: | :------------------: | :--: |
|   URL    | /api/sbmanage/v2/get_spu_list |      |
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
| iv_page_size | number | 否 |  20  |  |
| iv_page_num | number | 否 |  1  |  |


返回字段说明:

| Tables     | 类型及其范围 | 说明       | 默认值        |
| ---------- | ------ | -------- | ---------- |
| ev_error   | number | 请求是否成功   | 0为成功, 1为错误 |
| ev_message | string | 报错信息     | 空          |
| ev_total_count | number |      |           |
| ev_total_page | number |      |           |
| ev_page_num | number |      |           |
| ev_page_size | number |      |           |
| ea_spu_list  | array  |  |          |

| ea_spu_list | 类型及其范围 | 说明          |
| --------------- | ------ | --------------------------------------- |
| spu_id          | number | spu ID                                  |
| spu_name           | string  | 名称                                    _  |
| spu_image_id         | number | 图片ID                                    |
| spu_image         | string | 图片url                                    |
| spu_price    | string | 价钱（string格式返回）                       |
| spu_status     | array  | 0 = ok, 1 = sold out, 9 = 下线（这个后端直接不返回） |


返回结果(默认JSON): 
```
{
    "ev_error": 0,
    "ev_message": "",
    "ev_total_count": 10,
    "ev_total_page":3,
    "ev_page_num":1,
    "ev_page_size":4,
    "ea_spu_list":[
        {
            "spu_id":1,
            "spu_name":"浪味仙",
            "spu_image_id":101,
            "spu_image":"https://chanmao.us/pic/xxx.jpg",
            "spu_price": "20.99",
            "spu_status": 0
        }
    ]
}
```

