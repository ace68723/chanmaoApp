## History页面






返回字段说明:

| Tables         | 类型及其范围 | 说明      | 默认值  |
| -------------- | ------ | ------- | ---- |
| cash_num       | number | 现金单数量   |      |
| delivery Fee   | number | 现金单运费金额 |      |
| cash_total     | number | 现金单总金额  |      |
| online_num     | number | 在线支付总单数 |      |
| online_total   | number | 在线支付总金额 |      |
| online_tips    | number | 在线支付小费  |      |
| total_delivery | number | 运费总金额   |      |
| orders         | array  | 订单列表    |      |

|              | 类型及其范围 | 说明                | 默认值  |
| ------------ | ------ | ----------------- | ---- |
| order_number | string | 单号                |      |
| order_method | string | 支付方式（Online/Cash) |      |
| cash_total   | number | 现金单总金额            |      |

## OrderDetail页面

返回字段说明:

| Tables          | 类型及其范围 | 说明               | 默认值  |
| --------------- | ------ | ---------------- | ---- |
| order_number    | string | 订单编号             |      |
| delivery_option | string | pick-up/delivery |      |
| restaurant_name | string | 餐馆名              |      |
| order_items     | array  | 菜品列表             |      |
| order_total     | number | 订单总价             |      |
| delivery_fee    | number | 运费               |      |
| comment         | string | 订单备注             |      |
| carry_number    | number | 当前司机身上单数         |      |

| order_items  | 类型及其范围        | 说明           | 默认值  |
| ------------ | ------------- | ------------ | ---- |
| item_name    | string        | 菜品名称         |      |
| item_number  | number        | 菜品数量         |      |
| item_price   | number        | 菜品单价         |      |
| item_comment | array(string) | 二级选项（e.p:大碗） |      |

```

```