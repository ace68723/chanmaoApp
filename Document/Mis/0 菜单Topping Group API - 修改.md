##菜单Topping Group API - 修改 


|  Tables  |              说明              | 默认值  |
| :------: | :--------------------------: | :--: |
|   URL    | /api/manage/v1/edit_toppings |      |
| HTTP请求方式 |             POST             |      |
|  是否需要登录  |              否               |      |
|  授权访问限制  |              暂无              |      |
|  授权范围()  |              暂无              |      |
|   支持格式   |             JSON             |      |


表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |

请求参数:
| Tables    | 类型及其范围 | 说明          | 默认值  |
| --------- | ------ | ----------- | ---- |
| tpg_id    | string | Topping 组名字 |      |
| tpg_name  | string | Topping 组名字 |      |
| tpg_limit | number | Topping 组限制 |      |
| note      | string | Topping组 标签 |      |
| tps       | array  | Topping列表   |      |

| tps     | 类型及其范围 | 说明         | 默认值      |
| ------- | ------ | ---------- | -------- |
| tp_id   | string | Topping ID | -1 为新加项目 |
| tp_name | string | Topping 名字 |          |
| price   | number | Topping 价钱 |          |



返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_result  | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |



返回结果(默认JSON):
```
{
    ev_result: number,
    ev_message: string
}
```