##菜单Topping Group API - 获取 


|  Tables  |             说明              | 默认值  |
| :------: | :-------------------------: | :--: |
|   URL    | /api/manage/v1/get_toppings |      |
| HTTP请求方式 |            POST             |      |
|  是否需要登录  |              否              |      |
|  授权访问限制  |             暂无              |      |
|  授权范围()  |             暂无              |      |
|   支持格式   |            JSON             |      |


表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| Authortoken | string | token验证信息 |      |

返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_result  | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |
| ea_tpg     | array  | 菜品     |            |

| ea_tpg    | 类型及其范围 | 说明          | 默认值  |
| --------- | ------ | ----------- | ---- |
| tpg_id    | number | Topping 组ID |      |
| tpg_name  | string | Topping 组名字 |      |
| tpg_limit | number | Topping 组限制 |      |
| note      | string | Topping组 标签 |      |
| tps       | array  | Topping列表   |      |


| tps     | 类型及其范围 | 说明         | 默认值  |
| ------- | ------ | ---------- | ---- |
| tp_id   | number | Topping ID |      |
| tp_name | string | Topping 名字 |      |
| price | string | Topping 价钱 |      |


返回结果(默认JSON):
```
{
    ev_result: number,
    ev_message: string,
    ea_tpg:[
      {
        tpg_id: number,
        tpg_name: string,
        tpg_limit: number,
        note: string,
        tps: [
          {
            tp_id: number,
            tp_name: string,
            tp_price: number
          }
        ]
      }
    ]
}
```