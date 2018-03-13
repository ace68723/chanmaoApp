### 2018-03-13 update	
- 新增 `cm_order_review` 表用于用户对订单的评价信息
- 新增 `like`字段在`cm_order_item`表中，用于用户对菜品的喜爱
- 新增 `OrderPayment` 表用于订单支付信息


#### cm_order_review

| oid  | driver_score                             | driver_comment | restaurant_score                         | restaurant_comment |
| ---- | ---------------------------------------- | -------------- | ---------------------------------------- | ------------------ |
| oid  | 用户对司机评分 <br />分值1-5 <br />默认0 | 用户对司机评价 | 用户对商家评分<br /> 分值1-5 <br />默认0 | 用户对商家评价     |



#### cm_order_item 新增字段

| otid   | oid    | did     | cb_id | amount | pretax | soldout            | like                                     |
| ------ | ------ | ------- | ----- | ------ | ------ | ------------------ | ---------------------------------------- |
| 流水id | 订单id | dish id |       | 数量   | 价格   | 0 正常<br />1 售完 | 1 喜欢<br /> 2 不喜欢<br /> 0 默认<br /> |



#### OrderPayment

| oid    | txn_id                             | charge_id | channel | payment_channel                                             | amount   | paid_at  | payment_status                                         |
| ------ | ---------------------------------- | --------- | ------- | ----------------------------------------------------------- | -------- | -------- | ------------------------------------------------------ |
| 订单号 | Stripe <br />Alipay<br />WeChatPay |           |         | 0 Cash<br />1 Credit Card<br />10 Alipay<br />20 WeChat Pay | 支付金额 | 支付时间 | 0 New<br />10 Authorized<br />20 Paid<br />30 Refunded |

#### OrderRefund 

| id   | txn_id | oid  | channel | requested_at | requested_by | approved_at | approved_by | notes |
| ---- | ------ | ---- | ------- | ------------ | ------------ | ----------- | ----------- | ----- |
|      |        |      |         |              |              |             |             |       |
