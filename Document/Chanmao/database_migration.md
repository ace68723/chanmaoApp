### 2018-03-13 update	
- 新增 `cm_order_review` 表用于用户对订单的评价信息
- 新增 `like`字段在`cm_order_item`表中，用于用户对菜品的喜爱


#### cm_order_review
| oid  | driver_score  | driver_comment | restaurant_score | restaurant_comment |
| ---- | ------------- | -------------- | ---------------- | ------------------ |
| oid  | 用户对司机评分 1-5 默认0 | 用户对司机评价           | 用户对商家评分 1-5 默认0    | 用户对商家评价           



#### cm_order_item 新增字段
| otid   | oid    | did     | cb_id | amount | pretax | soldout       | like                   |
| ------ | ------ | ------- | ----- | ------ | ------ | ------------- | ---------------------- |
| 流水id | 订单id | dish id |       | 数量   | 价格   | 0/正常 1/售完 | 1/喜欢 2/不喜欢 0/默认 |




#### OrderBase 新增字段

| payment_channel                                             | payment_status                      |
| ----------------------------------------------------------- | ----------------------------------- |
| 0 Cash<br />1 Credit Card<br />10 Alipay<br />20 WeChat Pay | 0 New<br />10 Paid<br />20 Refunded |

#### OrderPayment 新增表

| id   | txn_id                             | oid  | channel | amount | paid_at |
| ---- | ---------------------------------- | ---- | ------- | ------ | ------- |
|      | Stripe <br />Alipay<br />WeChatPay |      |         |        |         |

#### OrderRefund 新增表

| id   | txn_id | oid  | channel | requested_at | requested_by | approved_at | approved_by | notes |
| ---- | ------ | ---- | ------- | ------------ | ------------ | ----------- | ----------- | ----- |
|      |        |      |         |              |              |             |             |       |

