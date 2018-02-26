## Topping Group API - 添加/编辑

|  Tables  |           说明            | 默认值  |
| :------: | :---------------------: | :--: |
|   URL    | /api/manage/v1/set_tpg |      |
| HTTP请求方式 |          POST           |      |
|  是否需要登录  |            否            |      |
|  授权访问限制  |           暂无            |      |
|  授权范围()  |           暂无            |      |
|   支持格式   |          JSON           |      |

表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |

请求参数:

| Tables  | 类型及其范围 | 说明     | 默认值  |
| ------- | ------ | ------ | ---- |
| tpg_id     | number | topping group ID（不填为新增）   |    |
| tpg_name   | number | tpg名字 |      |
| tpg_note | string | tpg名字内部用   |      |
| tpg_limit   | int | 最多选几个     |      |
| tps   | array | toppings    |      |


| Tps  | 类型及其范围 | 说明     | 默认值  |
| ------- | ------ | ------ | ---- |
| tp_id     | number | topping ID（不填为新增）   |    |
| tp_name     | string |    |    |
| tp_price     | number |    |    |


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
