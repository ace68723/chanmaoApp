

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

