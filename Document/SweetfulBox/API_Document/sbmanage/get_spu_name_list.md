
## get spu name list API


|  Tables  |          说明          | 默认值  |
| :------: | :------------------: | :--: |
|   URL    | /api/sbmanage/v2/get_spu_name_list |      |
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


请求字段:


返回字段说明:

| Tables     | 类型及其范围 | 说明       | 默认值        |
| ---------- | ------ | -------- | ---------- |
| ev_error   | number | 请求是否成功   | 0为成功, 1为错误 |
| ev_message | string | 报错信息     | 空          |
| eo_spu  | array  |       |          |

| eo_spu     | 类型及其范围 | 说明       | 默认值        |
| ---------- | ------ | -------- | ---------- |
| name   | string | spu名字   ||
| spu_id | number | spu_id     |         |


返回结果(默认JSON): 
```
{
    "ev_error": 0,
    "ev_message": "",
    "eo_spu":[
    {
        "name":string,
        "spu_id": number
    }]
}
```

