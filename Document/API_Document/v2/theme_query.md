## theme 产品列表获取新数据 API


|  Tables  |           说明           | 默认值  |
| :------: | :--------------------: | :--: |
|   URL    | /api/sb/v2/theme_query |      |
| HTTP请求方式 |          POST          |      |
|  是否需要登录  |           否            |      |
|  授权访问限制  |           暂无           |      |
|  授权范围()  |           暂无           |      |
|   支持格式   |          JSON          |      |


表头参数:

| Tables | 类型及其范围 | 说明    | 默认值  |
| ------ | ------ | ----- | ---- |
| uuid   | string | 接口验证用 |      |


请求字段：

| Tables    | 类型及其范围 | 说明        | 默认值  |
| --------- | ------ | --------- | ---- |
| iv_tmid   | number | Theme ID  |      |
| iv_lastid | number | 上一次显示的 ID |  目前数据array的长度，3的倍数   |
| iv_number | number | 申请的产品数量   |      |


返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_error   | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |
| ea_prod    | array  | 产品列表   |  参见        API [homeData](https://github.com/ace68723/sweetfulBox_1.1/blob/master/Document/API_Document/v2/home_data.md)的返回prod_list |


返回结果(默认JSON):
```
{
  ev_error: 0,
  ev_message: "",
  ea_prod: [
    {}
  ]
}
```
