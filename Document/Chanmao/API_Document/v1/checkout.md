## API - 下单


|    Tables    |         说明         | 默认值 |
| :----------: | :------------------: | :----: |
|     URL      | /MobOrder10/checkout |        |
| HTTP请求方式 |         POST         |        |
| 是否需要登录 |          是          |        |
| 授权访问限制 |         暂无         |        |
|  授权范围()  |         暂无         |        |
|   支持格式   |         JSON         |        |

表头参数:

| Tables      | 类型及其范围 | 说明          | 默认值 |
| ----------- | ------------ | ------------- | ------ |
| Authortoken | string       | token验证信息 |        |
| uuid        | string       |               |        |


请求参数:

| Tables  | 类型及其范围 | 说明                               | 默认值 |
| ------- | ------------ | ---------------------------------- | ------ |
| dltype  | string       | 配送类型  0 自取 1 送餐 2 定制运费 |        |
| pretax  | string       | 税前总价                           |        |
| rid     | string       | 餐馆ID                             |        |
| uaid    | string       | 用户地址id                         |        |
| dlexp   | string       | 运费                               |        |
| items   | array        | 菜品列表                           |        |
| comment | string       | 备注                               |        |
| version | string       | 版本号                             |        |
| channel | string       | 渠道 1 iOS 2 android               |        |




| items   | 类型及其范围 | 说明               | 默认值 |
| ------- | ------------ | ------------------ | ------ |
| amount  | number       | 数量               |        |
| ds_id   | string       | 菜品id             |        |
| ds_name | string       | 菜品名字           |        |
| id      | string       | 原有参数，暂且保留 |        |
| int_no  | string       | 菜品内部编号       |        |
| price   | string       | 菜品单价           |        |
| qty     | null         | 原有参数，暂且保留 |        |
| status  | number       | 原有参数，暂且保留 |        |
| tps     | array        | topping列表        |        |

| tps         | 类型及其范围 | 说明         | 默认值 |
| ----------- | ------------ | ------------ | ------ |
| tp_id       | number       | topping id   |        |
| tp_quantity | number       | topping 数量 |        |
返回字段说明:

|        | 类型及其范围 | 说明          | 默认值 |
| ------ | ------------ | ------------- | ------ |
| result | number       | 0 成功 1 失败 |        |


请求参数(默认JSON):

```
{
    "channel":string,
    "comment":string,
    "dlexp":string,
    "dltype":string,
    "items":[
      {
        "amount":number,
        "ds_id":string,
        "ds_name":string,
        "id":string,
        "int_no":string,
        "price":string,
        "qty":null,
        "status":number,
        "tpgs":[
          {
            "tp_id":number,
            "tp_quantity":number
          },
        ]
      }
    ]
    "pretax":string,
    "rid":string,
    "uaid":string,
    "version":string,
}
```

返回结果(默认JSON):

```
{
    result: number,
}
```


Data Sample
```
{
        "channel":"1",
        "comment":undefined,
        "dlexp":"0",
        "dltype":"2",
        "items":[
          {
            "amount":9,
            "ds_id":"280",
            "ds_name":"酸菜白肉粉条(锅)",
            "id":"280",
            "int_no":"P01",
            "price":"8.99",
            "qty":null,
            "status":0,
            "tpgs":[
              {
                "tp_id":5,
                "tp_quantity":2
              },
              {
                "tp_id":65,
                "tp_quantity":1
              },
            ]
          }
        ]
        "pretax:""80.91",
        "rid":"5",
        "uaid":"98079",
        "version":"2.5.3",
}
```
