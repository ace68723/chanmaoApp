##菜单分类 API - 获取


|    Tables    |           说明            | 默认值 |
| :----------: | :-----------------------: | :----: |
|     URL      | /api/manage/v1/get_dishes |        |
| HTTP请求方式 |           POST            |        |
| 是否需要登录 |            否             |        |
| 授权访问限制 |           暂无            |        |
|  授权范围()  |           暂无            |        |
|   支持格式   |           JSON            |        |


表头参数:

| Tables      | 类型及其范围 | 说明                   | 默认值 |
| ----------- | ------------ | ---------------------- | ------ |
| Authortoken | string       | token验证信息(含有rid) |        |

返回字段说明:

| Tables       | 类型及其范围 | 说明         | 默认值           |
| ------------ | ------------ | ------------ | ---------------- |
| ev_error     | number       | 请求是否成功 | 0为成功, 1为错误 |
| ev_message   | string       | 报错信息     | 空               |
| ev_total_count     | number       | 菜品数量 |  |
| ev_total_page   | number       | 总菜品页数  |                |
| ev_page_num     | number       | 菜品页数 |  |
| ev_page_size   | number | 此页有多少菜品 |                |
| ea_dishes | array        | 菜品     |                  |

| ea_dishes | 类型及其范围 | 说明   | 默认值                               |
| ------------ | ------ | ---- | --------------------------------- |
| ds_id        | number | 菜品ID |                                   |
| int_no         | string | 内部菜品名字 |                                   |
| dt_id        | number | 菜品分类id |             |
| ds_name       | string | 菜品名字 |  |
| ds_price       | string | 菜品显示价钱 |  |
| status       | number | 状态   | 0为APP显示，1为不显示，9为下线，level应该同时等于255 |
| tpgs       | number | 菜品二级菜单 |  |


| tpgs | 类型及其范围 | 说明   | 默认值                               |
| ------------ | ------ | ---- | --------------------------------- |
| tpg_id        | number | 二级菜品ID |                                   |
| tpg_name         | string | 二级菜品名字 |                                   |

返回结果(默认JSON):
```
{
    "ev_error": number,
    "ev_message": string,
    "ev_total_count": number,
    "ev_total_page": number,
    "ev_page_num": number,
    "ev_page_size": number,
    "ea_dishes": [
        {
            "ds_id": number,
            "int_no": string,
            "dt_id": number,
            "ds_name": string,
            "ds_price": string,
            "status": number,
            "tpgs": [
                tgp_id: number,
                tgp_name: string
            ]
        }
     ]
}
```