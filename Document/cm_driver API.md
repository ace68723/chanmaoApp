## WebSocket返回值



| 参数       | 类型及其范围 | 说明     | 默认值          |
| -------- | ------ | ------ | ------------ |
| result   | number | 返回结果状态 | 0            |
| message  | string |        | 空            |
| scenario | string | 接口名称   | task_refresh |
| orders   | array  |        |              |

| orders  | 类型及其范围 | 说明   | 默认值           |
| ------- | ------ | ---- | ------------- |
| oid     | string | 订单编号 | 空             |
| rid     | string | 餐馆编号 | 空             |
| status  | string | 订单状态 | ‘20’（pick-up) |
| order   | Object | 订单详情 |               |
| rr      | Object | 商家详情 |               |
| address | Object | 客户地址 |               |



| order   | 类型及其范围 | 说明   | 默认值           |
| ------- | ------ | ---- | ------------- |
| oid     | string | 订单编号 | 空             |
| rid     | string | 餐馆编号 |               |
| status  | string | 订单状态 | ‘20’（pick-up) |
| created | string | 订单时间 |               |
| total   | string | 订单价格 |               |
| dlexp   | string | 运费   |               |
| comment | string | 备注   | 空             |

| address | 类型及其范围 | 说明        | 默认值  |
| ------- | ------ | --------- | ---- |
|         | string | 用户ID      |      |
| name    | string | 用户姓名      |      |
| tel     | string | 电话        |      |
| postal  | string | 邮编        |      |
| addr    | string | 详细地址      |      |
| unit    | string | 门牌号       | ''   |
| lat     | string | 经度        |      |
| lng     | string | 纬度        |      |
| buzz    | string | buzz code | ''   |

| rr     | 类型及其范围 | 说明   | 默认值  |
| ------ | ------ | ---- | ---- |
| rid    | string | 餐馆编号 |      |
| name   | string | 餐馆名称 |      |
| tel    | string | 餐馆电话 |      |
| postal | string | 邮编   |      |
| addr   | string | 详细地址 |      |
| unit   | string | 门牌号  |      |
| lat    | string | 经度   |      |
| lng    | string | 纬度   |      |

```

```
## API - 登陆

| Tables   | 说明                                       | 默认值  |
| -------- | ---------------------------------------- | ---- |
| URL      | https://www.chanmao.ca/index.php?r=MobDriver10/Login |      |
| HTTP请求方式 | POST                                     |      |
| 是否需要登录   | 否                                        |      |
| 授权访问限制   | 暂无                                       |      |
| 授权范围()   | 暂无                                       |      |
| 支持格式     | JSON                                     |      |

表头参数:

| Tables       | 类型及其范围 | 说明    | 默认值                |
| ------------ | ------ | ----- | ------------------ |
| Accept       | string |       | "application/json" |
| Cmos         | string | 系统版本  |                    |
| Cmuuid       | string | 设备识别码 |                    |
| Cmversion    | string | app版本 | 'v1.2.1'           |
| Content-Type | string |       | "application/json" |

请求参数:

| Tables      | 类型及其范围 | 说明                | 默认值  |
| ----------- | ------ | ----------------- | ---- |
| username    | string | 登录名               |      |
| password    | string | 密码                |      |
| devicetoken | string | 设备ID              |      |
| platform    | string | 设备平台(android/ios) |      |

返回值:

| Tables      | 类型及其范围 | 说明   | 默认值   |
| ----------- | ------ | ---- | ----- |
| bdate       | string | 日期   |       |
| driver_id   | string | 司机编号 |       |
| message     | string | 返回消息 | 空     |
| result      | number | 登陆状态 | 0（成功） |
| sns_error   | string | 错误编号 | 0     |
| sns_message | string | 错误信息 | 空     |
| token       | string | 识别码  |       |
| uid         | string |      |       |



## API - 订单状态变更

| Tables   | 说明                                       | 默认值  |
| -------- | ---------------------------------------- | ---- |
| URL      | https://www.chanmao.ca/index.php?r=MobDriver10/OrderChange |      |
| HTTP请求方式 | POST                                     |      |
| 是否需要登录   | 是                                        |      |
| 授权访问限制   | 暂无                                       |      |
| 授权范围()   | 暂无                                       |      |
| 支持格式     | JSON                                     |      |

表头参数:

| Tables       | 类型及其范围 | 说明        | 默认值                |
| ------------ | ------ | --------- | ------------------ |
| Accept       | string |           | "application/json" |
| authortoken  | string | 登陆授权token |                    |
| Content-Type | string |           | "application/json" |

请求参数:

| Tables | 类型及其范围 | 说明   | 默认值        |
| ------ | ------ | ---- | ---------- |
| oid    | string | 订单编号 |            |
| task   | string | 变更类型 | P（pick up) |

返回值:

| Tables  | 类型及其范围 | 说明     | 默认值   |
| ------- | ------ | ------ | ----- |
| result  | number | 操作是否成功 | 0（成功） |
| message | string | 附加信息   | ''    |





## API - 订单详情

| Tables   | 说明                                       | 默认值  |
| -------- | ---------------------------------------- | ---- |
| URL      | https://www.chanmao.ca/index.php?r=MobOrder10/OrderHistory |      |
| HTTP请求方式 | POST                                     |      |
| 是否需要登录   | 是                                        |      |
| 授权访问限制   | 暂无                                       |      |
| 授权范围()   | 暂无                                       |      |
| 支持格式     | JSON                                     |      |

表头参数:

| Tables       | 类型及其范围 | 说明        | 默认值                |
| ------------ | ------ | --------- | ------------------ |
| Accept       | string |           | "application/json" |
| authortoken  | string | 登陆获取token |                    |
| Content-Type | string |           | "application/json" |

请求参数:

| Tables | 类型及其范围 | 说明   | 默认值  |
| ------ | ------ | ---- | ---- |
| oid    | string | 订单编号 |      |

返回值:

| Tables    | 类型及其范围 | 说明     | 默认值  |
| --------- | ------ | ------ | ---- |
| result    | number | 返回结果状态 | 0    |
| oid       | string | 订单编号   |      |
| message   | string | 返回消息   | 空    |
| name      | string | 商家名    |      |
| total     | string | 总价格    |      |
| created   | string | 订单创建时间 |      |
| comment   | string | 备注     | ''   |
| user_addr | string | 客户地址   |      |
| user_tel  | string | 客户电话   |      |
| user_name | string | 用户姓名   |      |
| items     | array  | 菜品列表   |      |

| items | 类型及其范围 | 说明     | 默认值  |
| ----- | ------ | ------ | ---- |
| tps   | string |        | ''   |
| name  | string | 菜品名称   |      |
| qty   | string | 当前菜品数量 |      |
| price | string | 价格     |      |

