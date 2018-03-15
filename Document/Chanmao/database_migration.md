### 2018-03-14 update	
- `cm_order_review`表中新增`created_at`字段，用户记录评价时间
- `cm_order_item`表中的`like`字段改名为rating
- `cm_order_trace` 表新增`adjust_complete`，用于用户调整后的完成时间

### 2018-03-13 update	
- 新增 `cm_order_review` 表用于用户对订单的评价信息
- 新增 `like`字段在`cm_order_item`表中，用于用户对菜品的喜爱
- 新增 `OrderPayment` 表用于订单支付信息


#### cm_order_trace

| oid    | driver_id | create   | initiate         | reaction          | assign       | pickup       | complete | adjust_complete                | status | csuid      | notes |
| ------ | --------- | -------- | ---------------- | ----------------- | ------------ | ------------ | -------- | ------------------------------ | ------ | ---------- | ----- |
| 订单id | 司机id    | 创建时间 | 成为可用订单时间 | 商家接单/拒单时间 | 客服分配时间 | 司机取餐时间 | 完成时间 | 客人调整后的完成时间<br >默认0 | 状态   | 分配客服id | 备注  |



#### cm_order_review

| oid  | driver_score                             | driver_comment | restaurant_score                         | restaurant_comment | created_at |
| ---- | ---------------------------------------- | -------------- | ---------------------------------------- | ------------------ | ------------------ |
| oid  | 用户对司机评分 <br />分值1-5 <br />默认0 | 用户对司机评价 | 用户对商家评分<br /> 分值1-5 <br />默认0 | 用户对商家评价     |  |



#### cm_order_item 新增字段

| otid   | oid    | did     | cb_id | amount | pretax | soldout            | rating                                     |
| ------ | ------ | ------- | ----- | ------ | ------ | ------------------ | ---------------------------------------- |
| 流水id | 订单id | dish id |       | 数量   | 价格   | 0 正常<br />1 售完 | 1 喜欢<br /> -1 不喜欢<br /> 0 默认<br /> |



#### cm_order_payment

| oid    | txn_id                             | charge_id | channel | payment_channel                                             | amount   | paid_at  | payment_status                                         |
| ------ | ---------------------------------- | --------- | ------- | ----------------------------------------------------------- | -------- | -------- | ------------------------------------------------------ |
| 订单号 | Stripe <br />Alipay<br />WeChatPay |    Stripe需要的id       |  1 iOS<br />2 Android       | 0 Cash<br />1 Credit Card<br />10 Alipay<br />20 WeChat Pay | 支付金额 | 支付时间 | 0 New<br />10 Authorized<br />20 Paid<br />30 Refunded<br />40 Cancelled |

#### cm_order_refund 

| id   | txn_id | oid  | channel | requested_at | requested_by | approved_at | approved_by | notes |
| ---- | ------ | ---- | ------- | ------------ | ------------ | ----------- | ----------- | ----- |
|      |        |      |         |              |              |             |             |       |
