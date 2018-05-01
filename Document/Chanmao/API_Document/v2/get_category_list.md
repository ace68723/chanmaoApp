## 获取口味列表 API (Norgta) 



|    Tables    |                       说明                       | 默认值 |
| :----------: | :----------------------------------------------: | :----: |
|     URL      |         /api/cmapp/v2/get_category_list          |        |
| HTTP请求方式 |                       GET                        |        |
| 是否需要登录 |                        否                        |        |
| 授权访问限制 |                       暂无                       |        |
|  授权范围()  |                       暂无                       |        |
|   支持格式   |                       JSON                       |        |
|   测试接口   | http://norgta.com/api/cmapp/v2/get_category_list |        |


表头参数:

| Tables      | 类型及其范围 | 说明          | 默认值 |
| ----------- | ------------ | ------------- | ------ |
| Authortoken | string       | token验证信息 |        |

返回:

| Tables           | 类型及其范围 | 说明         | 默认值           |
| ---------------- | ------------ | ------------ | ---------------- |
| ev_error         | number       | 请求是否成功 | 0为成功, 1为错误 |
| ev_message       | string       | 报错信息     | 空               |
| ea_category_list | array        | 口味列表     |                  |

| restaurantList | 类型及其范围 | 说明                 | 默认值 |
| -------------- | ------------ | -------------------- | ------ |
| cid            | number       | category id          |        |
| name           | string       | 口味名字             |        |
| rank           | number       | 排行(数值越大越靠前) |        |

Data Sample
```
{
    ev_error	
    ev_message	
    ea_category_list
}
```
```
[{
	"cid": 1,
	"name": "小吃",
	"rank": 2
}]
```
