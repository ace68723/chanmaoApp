
## 设置用户地址 API

|  Tables  |           说明           | 默认值  |
| :------: | :--------------------: | :--: |
|   URL    | /api/sb/v2/user_addr |      |
| HTTP请求方式 |          **PUT**          |      |
|  是否需要登录  |           否            |      |
|  授权访问限制  |           暂无           |      |
|  授权范围()  |           暂无           |      |
|   支持格式   |          JSON          |      |


表头参数:

| Tables | 类型及其范围 | 说明    | 默认值  |
| ------ | ------ | ----- | ---- |
| Authortoken  | string | 接口验证用含uid |      |


请求字段：

| Tables    | 类型及其范围 | 说明        | 默认值  |
| --------- | ------ | --------- | ---- |
| iv_addr  | string |   |      |
| iv_province  | string |   |      |
| iv_lat  | number |   |      |
| iv_lng  | number |   |      |
| iv_name  | string |   |      |
| iv_unit  | string |   |      |
| iv_tel  | string |   |      |


返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_error   | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |


返回结果(默认JSON):
```
{
  ev_error: 0,
  ev_message: ""
}
```
