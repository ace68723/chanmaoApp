##菜单菜品 API - 获取


|  Tables  |           说明            | 默认值  |
| :------: | :---------------------: | :--: |
|   URL    | /api/manage/v1/get_dish |      |
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


| Tables | 类型及其范围 | 说明   | 默认值  |
| ------ | ------ | ---- | ---- |
| rid    | number | 餐馆ID |      |

返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| ev_result  | number | 请求是否成功 | 0为成功, 1为错误 |
| ev_message | string | 报错信息   | 空          |
| ea_dish    | array  | 菜品     |            |

| ea_dish | 类型及其范围 | 说明     | 默认值                |
| ------- | ------ | ------ | ------------------ |
| ds_id   | number | 菜品ID   |                    |
| int_no  | string | 菜品内部ID |                    |
| dt_id   | number | 菜品分类ID |                    |
| ds_name | string | 菜品名字   |                    |
| price   | number | 价格     |                    |
| status  | number | 状态     | 0为APP显示，1为不显示，9为下线 |
| tpgs    | array  | 菜品排序   |                    |

| tpgs     | 类型及其范围 | 说明          | 默认值  |
| -------- | ------ | ----------- | ---- |
| tpg_id   | number | Topping 组ID |      |
| tpg_name | string | Topping 组名字 |      |

返回结果(默认JSON):
```
{
    ev_result: number,
    ev_message: string,
    ea_dish: [
      {
        ds_id: number,
        int_no: string,
        dt_id: number,
        ds_name: string,
        price: number,
        status: number,
        tpgs:[
          {
            tpg_id: number,
            tpg_name: string
          }
        ]
      }
    ]
}
```